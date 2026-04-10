import {
    Injectable,
    NotFoundException,
    BadRequestException
} from '@nestjs/common'
import { PedidosRepository } from '../repositories/pedidos.repository'
import { DetallePedidoRepository } from '../repositories/detalle-pedido.repository'
import { Pedido } from '../models/pedidos.model'
import { Status } from '../../common/enums/status.enum'
import { CreatePedidoDto, UpdatePedidoDto } from '../services/pedido.dto'

@Injectable()
export class PedidosService {
    constructor(
        private readonly pedidosRepository: PedidosRepository,
        private readonly detallePedidoRepository: DetallePedidoRepository
    ) {}

    // ─── Consultas ────────────────────────────────────────────────────────────

    async findAll(): Promise<Pedido[]> {
        return await this.pedidosRepository.findAll()
    }

    async findById(id: number): Promise<Pedido> {
        const pedido = await this.pedidosRepository.findById(id)

        if (!pedido) {
            throw new NotFoundException(`Pedido con id ${id} no encontrado`)
        }

        return pedido
    }

    async findByStatus(status: Status): Promise<Pedido[]> {
        const statusValido = Object.values(Status).includes(status)

        if (!statusValido) {
            throw new BadRequestException(`El status "${status}" no es válido`)
        }

        return await this.pedidosRepository.findByStatus(status)
    }

    // ─── Creación ─────────────────────────────────────────────────────────────

    async create(dto: CreatePedidoDto): Promise<Pedido> {
        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException('El pedido debe contener al menos un item')
        }

        // 1. Crear el pedido base con total en 0, se recalcula después
        const nuevoPedido = await this.pedidosRepository.create({
            pedido_status: Status.PENDIENTE_PAGO,
            pedido_total: 0
        })

        // 2. Preparar los detalles calculando el subtotal por item
        const detalles = dto.items.map((item) => ({
            pedido_id: nuevoPedido.id,
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            descripcion: item.descripcion,
            precio: item.precio,
            subtotal: item.cantidad * item.precio
        }))

        // 3. Insertar todos los detalles en una sola operación
        await this.detallePedidoRepository.createMany(detalles)

        // 4. Recalcular y persistir el total real del pedido
        const totalReal = await this.detallePedidoRepository.sumSubtotalByPedidoId(nuevoPedido.id)
        await this.pedidosRepository.updateTotal(nuevoPedido.id, totalReal)

        // 5. Retornar el pedido completo con sus items
        return await this.findById(nuevoPedido.id)
    }

    // ─── Actualización ────────────────────────────────────────────────────────

    async updateStatus(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
        await this.findById(id) // valida existencia

        const statusValido = Object.values(Status).includes(dto.pedido_status!)

        if (!statusValido) {
            throw new BadRequestException(`El status "${dto.pedido_status}" no es válido`)
        }

        const pedidoActualizado = await this.pedidosRepository.updateStatus(id, dto.pedido_status!)

        return pedidoActualizado!
    }

    // ─── Eliminación ──────────────────────────────────────────────────────────

    async delete(id: number): Promise<{ message: string }> {
        await this.findById(id) // valida existencia

        const eliminado = await this.pedidosRepository.delete(id)

        if (!eliminado) {
            throw new BadRequestException(`No se pudo eliminar el pedido con id ${id}`)
        }

        return { message: `Pedido ${id} eliminado correctamente` }
    }
}
