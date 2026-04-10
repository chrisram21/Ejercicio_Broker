// src/pedidos/repositories/pedidos.repository.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Pedido } from '../models/pedidos.models'

@Injectable()
export class PedidosRepository {
    constructor(
        @InjectRepository(Pedido)
        private readonly repo: Repository<Pedido>
    ) {}

    async findAll(): Promise<Pedido[]> {
        return this.repo.find()
    }

    async findById(id: number): Promise<Pedido | null> {
        return this.repo.findOne({ where: { id } })
    }

    async create(data: Partial<Pedido>): Promise<Pedido> {
        const pedido = this.repo.create(data)
        return this.repo.save(pedido)
    }

    async update(id: number, data: Partial<Pedido>): Promise<Pedido | null> {
        await this.repo.update(id, data)
        return this.findById(id)
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.delete(id)
        return (result.affected ?? 0) > 0
    }

    async findByStatus(status: number): Promise<Pedido[]> {
        return this.repo.find({ where: { pedido_status: status } })
    }
}