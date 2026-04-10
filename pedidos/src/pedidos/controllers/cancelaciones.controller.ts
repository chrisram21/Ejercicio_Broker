import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CancelacionesService } from '../services/cancelaciones.service';
import { CrearCancelacionDto } from '../services/cancelacion.dto';
import { Cancelacion } from '../models/cancelacion.model';

@Controller('cancelaciones')
export class CancelacionesController {
    constructor(
        private readonly cancelacionesService: CancelacionesService
    ) {}

    @Post()
    async crearCancelacion(@Body() dto: CrearCancelacionDto): Promise<Cancelacion> {
        return await this.cancelacionesService.crearCancelacion(dto);
    }

    @Get()
    async obtenerCancelaciones(): Promise<Cancelacion[]> {
        return await this.cancelacionesService.obtenerCancelaciones();
    }

    @Get(':id')
    async obtenerCancelacionPorId(@Param('id') id: string): Promise<Cancelacion> {
        return await this.cancelacionesService.obtenerCancelacionPorId(+id);
    }

    @Get('pedido/:numeroPedido')
    async obtenerCancelacionesPorPedido(@Param('numeroPedido') numeroPedido: string): Promise<Cancelacion[]> {
        return await this.cancelacionesService.obtenerCancelacionesPorPedido(+numeroPedido);
    }
}