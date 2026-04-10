import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PedidosRepository } from '../repositories/pedidos.repository'
import { Pedido } from '../models/pedidos.models'
import { Status } from '../../common/enums/status.enum'
import { CancelacionPedidoService } from '../../cancelaciones/services/cancelacion-pedido.service'
import { CancelacionRazonEnum } from '../../common/enums/cancelacion-razon.enum'

@Injectable()
export class PedidosService {
    constructor(
        private readonly pedidosRepository: PedidosRepository,
        private readonly cancelacionPedidoService: CancelacionPedidoService
    ) {}

    async findAll(): Promise<Pedido[]> {
        const pedidos = await this.pedidosRepository.findAll()

        if (!pedidos.length) {
            throw new NotFoundException('No se encontraron pedidos registrados')
        }

        return pedidos
    }

    async findById(id: number): Promise<Pedido> {
        if (!id || id <= 0) {
            throw new BadRequestException('El ID del pedido no es válido')
        }

        const pedido = await this.pedidosRepository.findById(id)

        if (!pedido) {
            throw new NotFoundException(`No se encontró el pedido con ID ${id}`)
        }

        return pedido
    }

    async findByStatus(status: number): Promise<Pedido[]> {
        const statusValidos = Object.values(Status).filter(v => typeof v === 'number')

        if (!statusValidos.includes(status)) {
            throw new BadRequestException(`El status "${status}" no es válido`)
        }

        const pedidos = await this.pedidosRepository.findByStatus(status)

        if (!pedidos.length) {
            throw new NotFoundException(`No se encontraron pedidos con status ${Status[status]}`)
        }

        return pedidos
    }

    async create(data: Partial<Pedido>): Promise<Pedido> {
        if (data.pedido_total !== undefined && data.pedido_total < 0) {
            throw new BadRequestException('El total del pedido no puede ser negativo')
        }

        data.pedido_status = Status.PENDIENTE_PAGO

        return this.pedidosRepository.create(data)
    }

    async update(id: number, data: Partial<Pedido>): Promise<Pedido> {
        await this.findById(id)

        if (data.pedido_status !== undefined) {
            const statusValidos = Object.values(Status).filter(v => typeof v === 'number')

            if (!statusValidos.includes(data.pedido_status)) {
                throw new BadRequestException(`El status "${data.pedido_status}" no es válido`)
            }
        }

        if (data.pedido_total !== undefined && data.pedido_total < 0) {
            throw new BadRequestException('El total del pedido no puede ser negativo')
        }

        const pedidoActualizado = await this.pedidosRepository.update(id, data)
        return pedidoActualizado!
    }

    async updateStatus(id: number, nuevoStatus: number): Promise<Pedido> {
        const pedido = await this.findById(id)

        const transicionesValidas: Record<number, number[]> = {
            [Status.PENDIENTE_PAGO]:            [Status.PAGADO, Status.CANCELADO],
            [Status.PAGADO]:                    [Status.ENVIADO, Status.CANCELADO],
            [Status.ENVIADO]:                   [Status.ENTREGADO, Status.PERDIDO],
            [Status.ENTREGADO]:                 [],
            [Status.CANCELADO]:                 [],
            [Status.PERDIDO]:                   [],
            [Status.NO_EXISTENCIA_DISPONIBLE]:  [Status.CANCELADO]
        }

        const permitidos = transicionesValidas[pedido.pedido_status] ?? []

        if (!permitidos.includes(nuevoStatus)) {
            throw new BadRequestException(
                `No se puede cambiar el status de "${Status[pedido.pedido_status]}" a "${Status[nuevoStatus]}"`
            )
        }

        const pedidoActualizado = await this.pedidosRepository.update(id, { pedido_status: nuevoStatus })
        return pedidoActualizado!
    }

    async delete(id: number): Promise<{ message: string }> {
        const pedido = await this.findById(id)

        const statusNoBorrables = [Status.ENVIADO, Status.ENTREGADO, Status.PAGADO]

        if (statusNoBorrables.includes(pedido.pedido_status)) {
            throw new BadRequestException(
                `No se puede eliminar un pedido con status "${Status[pedido.pedido_status]}"`
            )
        }

        await this.pedidosRepository.delete(id)
        return { message: `Pedido con ID ${id} eliminado correctamente` }
    }

    
    async cancelarPedido(id: number, razon: CancelacionRazonEnum): Promise<Pedido> {
        const pedido = await this.findById(id)

        await this.updateStatus(id, Status.CANCELADO)

        await this.cancelacionPedidoService.registrarCancelacion({
            pedidoId: pedido.id,
            numeroPedido: pedido.id.toString(),
            razon,
            montoTotal: Number(pedido.pedido_total)
        })

        return await this.findById(id)
    }
}