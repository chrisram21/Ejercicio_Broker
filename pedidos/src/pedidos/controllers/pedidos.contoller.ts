import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Param,
    Body,
    ParseIntPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common'
import { PedidosService } from '../services/pedido.service'
import { Pedido } from '../models/pedidos.models'
import { CancelacionRazonEnum } from '../../common/enums/cancelacion-razon.enum'

@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Pedido[]> {
        return this.pedidosService.findAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
        return this.pedidosService.findById(id)
    }

    @Get('status/:status')
    @HttpCode(HttpStatus.OK)
    async findByStatus(@Param('status', ParseIntPipe) status: number): Promise<Pedido[]> {
        return this.pedidosService.findByStatus(status)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: Partial<Pedido>): Promise<Pedido> {
        return this.pedidosService.create(data)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Pedido>
    ): Promise<Pedido> {
        return this.pedidosService.update(id, data)
    }

    @Put(':id/status')
    @HttpCode(HttpStatus.OK)
    async updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('pedido_status', ParseIntPipe) nuevoStatus: number
    ): Promise<Pedido> {
        return this.pedidosService.updateStatus(id, nuevoStatus)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.pedidosService.delete(id)
    }

    @Patch(':id/cancelar')
    @HttpCode(HttpStatus.OK)
    async cancelarPedido(
        @Param('id', ParseIntPipe) id: number,
        @Body('razon') razon: CancelacionRazonEnum
    ): Promise<Pedido> {
        return this.pedidosService.cancelarPedido(id, razon)
    }
}