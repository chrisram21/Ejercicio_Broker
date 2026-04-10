// src/pedidos/services/detalle-pedido.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { DetallePedidoRepository } from '../repositories/detalle-pedido.repository'
import { PedidosRepository } from '../repositories/pedidos.repository'
import { DetallePedido } from '../models/detalle-pedido.models'

@Injectable()
export class DetallePedidoService {
    constructor(
        private readonly detallePedidoRepository: DetallePedidoRepository,
        private readonly pedidosRepository: PedidosRepository
    ) {}

    async findAll(): Promise<DetallePedido[]> {
        const detalles = await this.detallePedidoRepository.findAll()

        if (!detalles.length) {
            throw new NotFoundException('No se encontraron detalles de pedidos registrados')
        }

        return detalles
    }

    async findById(id: number): Promise<DetallePedido> {
        if (!id || id <= 0) {
            throw new BadRequestException('El ID del detalle no es válido')
        }

        const detalle = await this.detallePedidoRepository.findById(id)

        if (!detalle) {
            throw new NotFoundException(`No se encontró el detalle con ID ${id}`)
        }

        return detalle
    }

    async findByPedidoId(pedidoId: number): Promise<DetallePedido[]> {
        if (!pedidoId || pedidoId <= 0) {
            throw new BadRequestException('El ID del pedido no es válido')
        }

        const pedido = await this.pedidosRepository.findById(pedidoId)

        if (!pedido) {
            throw new NotFoundException(`No existe el pedido con ID ${pedidoId}`)
        }

        const detalles = await this.detallePedidoRepository.findByPedidoId(pedidoId)

        if (!detalles.length) {
            throw new NotFoundException(`No se encontraron items para el pedido con ID ${pedidoId}`)
        }

        return detalles
    }

    async findByProductoId(productoId: number): Promise<DetallePedido[]> {
        if (!productoId || productoId <= 0) {
            throw new BadRequestException('El ID del producto no es válido')
        }

        const detalles = await this.detallePedidoRepository.findByProductoId(productoId)

        if (!detalles.length) {
            throw new NotFoundException(`No se encontraron pedidos que contengan el producto con ID ${productoId}`)
        }

        return detalles
    }

    async create(data: Partial<DetallePedido>): Promise<DetallePedido> {
        await this.validarDetalle(data)

        data.subtotal = this.calcularSubtotal(data.cantidad!, data.precio!)

        return this.detallePedidoRepository.create(data)
    }

    async createMany(pedidoId: number, items: Partial<DetallePedido>[]): Promise<DetallePedido[]> {
        if (!pedidoId || pedidoId <= 0) {
            throw new BadRequestException('El ID del pedido no es válido')
        }

        const pedido = await this.pedidosRepository.findById(pedidoId)

        if (!pedido) {
            throw new NotFoundException(`No existe el pedido con ID ${pedidoId}`)
        }

        if (!items || !items.length) {
            throw new BadRequestException('Debe enviar al menos un item para el pedido')
        }

        const itemsPreparados: Partial<DetallePedido>[] = []

        for (const item of items) {
            await this.validarDetalle(item)
            itemsPreparados.push({
                ...item,
                pedido_id: pedidoId,
                subtotal: this.calcularSubtotal(item.cantidad!, item.precio!)
            })
        }

        return this.detallePedidoRepository.createMany(itemsPreparados)
    }

    async update(id: number, data: Partial<DetallePedido>): Promise<DetallePedido> {
        await this.findById(id)

        if (data.cantidad !== undefined && data.cantidad <= 0) {
            throw new BadRequestException('La cantidad debe ser mayor a 0')
        }

        if (data.precio !== undefined && data.precio < 0) {
            throw new BadRequestException('El precio no puede ser negativo')
        }

        // Recalcular subtotal si cambia cantidad o precio
        if (data.cantidad !== undefined || data.precio !== undefined) {
            const detalleActual = await this.findById(id)
            const cantidad = data.cantidad ?? detalleActual.cantidad
            const precio = data.precio ?? detalleActual.precio
            data.subtotal = this.calcularSubtotal(cantidad, precio)
        }

        const detalleActualizado = await this.detallePedidoRepository.update(id, data)
        return detalleActualizado!
    }

    async delete(id: number): Promise<{ message: string }> {
        await this.findById(id)
        await this.detallePedidoRepository.delete(id)
        return { message: `Detalle con ID ${id} eliminado correctamente` }
    }

    async deleteByPedidoId(pedidoId: number): Promise<{ message: string }> {
        if (!pedidoId || pedidoId <= 0) {
            throw new BadRequestException('El ID del pedido no es válido')
        }

        const pedido = await this.pedidosRepository.findById(pedidoId)

        if (!pedido) {
            throw new NotFoundException(`No existe el pedido con ID ${pedidoId}`)
        }

        await this.detallePedidoRepository.deleteByPedidoId(pedidoId)
        return { message: `Items del pedido con ID ${pedidoId} eliminados correctamente` }
    }

    // ─── Métodos privados ──────────────────────────────────────────────────────

    private async validarDetalle(data: Partial<DetallePedido>): Promise<void> {
        if (!data.producto_id || data.producto_id <= 0) {
            throw new BadRequestException('El producto_id no es válido')
        }

        if (!data.cantidad || data.cantidad <= 0) {
            throw new BadRequestException('La cantidad debe ser mayor a 0')
        }

        if (data.precio === undefined || data.precio < 0) {
            throw new BadRequestException('El precio no puede ser negativo')
        }

        if (!data.descripcion || !data.descripcion.trim().length) {
            throw new BadRequestException('La descripción del producto es requerida')
        }
    }

    private calcularSubtotal(cantidad: number, precio: number): number {
        return parseFloat((cantidad * precio).toFixed(2))
    }
}