// src/pedidos/repositories/detalle-pedido.repository.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DetallePedido } from '../models/detalle-pedido.models'

@Injectable()
export class DetallePedidoRepository {
    constructor(
        @InjectRepository(DetallePedido)
        private readonly repo: Repository<DetallePedido>
    ) {}

    async findAll(): Promise<DetallePedido[]> {
        return this.repo.find()
    }

    async findById(id: number): Promise<DetallePedido | null> {
        return this.repo.findOne({ where: { id } })
    }

    async findByPedidoId(pedidoId: number): Promise<DetallePedido[]> {
        return this.repo.find({ where: { pedido_id: pedidoId } })
    }

    async findByProductoId(productoId: number): Promise<DetallePedido[]> {
        return this.repo.find({ where: { producto_id: productoId } })
    }

    async create(data: Partial<DetallePedido>): Promise<DetallePedido> {
        const detalle = this.repo.create(data)
        return this.repo.save(detalle)
    }

    async createMany(data: Partial<DetallePedido>[]): Promise<DetallePedido[]> {
        const detalles = this.repo.create(data)
        return this.repo.save(detalles)
    }

    async update(id: number, data: Partial<DetallePedido>): Promise<DetallePedido | null> {
        await this.repo.update(id, data)
        return this.findById(id)
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete(id)
        return (result.affected ?? 0) > 0
    }

    async deleteByPedidoId(pedidoId: number): Promise<boolean> {
        const result = await this.repo.delete({ pedido_id: pedidoId })
        return (result.affected ?? 0) > 0
    }
}