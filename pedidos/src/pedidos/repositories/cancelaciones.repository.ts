import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancelacion } from '../models/cancelacion.model';

@Injectable()
export class CancelacionesRepository {
    constructor(
        @InjectRepository(Cancelacion)
        private readonly cancelacionRepository: Repository<Cancelacion>
    ) {}

    async crearCancelacion(cancelacion: Partial<Cancelacion>): Promise<Cancelacion> {
        const nuevaCancelacion = this.cancelacionRepository.create(cancelacion);
        return await this.cancelacionRepository.save(nuevaCancelacion);
    }

    async obtenerCancelaciones(): Promise<Cancelacion[]> {
        return await this.cancelacionRepository.find();
    }

    async obtenerCancelacionPorId(id: number): Promise<Cancelacion | null> {
        return await this.cancelacionRepository.findOne({ where: { id } });
    }

    async obtenerCancelacionesPorPedido(numeroPedido: number): Promise<Cancelacion[]> {
        return await this.cancelacionRepository.find({ where: { numeroPedido } });
    }
}