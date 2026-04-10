import { Injectable, NotFoundException } from '@nestjs/common';
import { CancelacionesRepository } from '../repositories/cancelaciones.repository';
import { Cancelacion } from '../models/cancelacion.model';
import { RazonCancelacion } from '../../common/enums/razon-cancelacion.enum';
import { CrearCancelacionDto } from '../services/cancelacion.dto';

@Injectable()
export class CancelacionesService {
    constructor(
        private readonly cancelacionesRepository: CancelacionesRepository
    ) {}

    async crearCancelacion(dto: CrearCancelacionDto): Promise<Cancelacion> {
        return await this.cancelacionesRepository.crearCancelacion(dto);
    }

    async obtenerCancelaciones(): Promise<Cancelacion[]> {
        return await this.cancelacionesRepository.obtenerCancelaciones();
    }

    async obtenerCancelacionPorId(id: number): Promise<Cancelacion> {
        const cancelacion = await this.cancelacionesRepository.obtenerCancelacionPorId(id);

        if (!cancelacion) {
            throw new NotFoundException(`Cancelacion con id ${id} no encontrada`);
        }

        return cancelacion;
    }

    async obtenerCancelacionesPorPedido(numeroPedido: number): Promise<Cancelacion[]> {
        return await this.cancelacionesRepository.obtenerCancelacionesPorPedido(numeroPedido);
    }
}