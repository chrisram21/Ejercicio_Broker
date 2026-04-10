// src/pedidos/controllers/detalle-pedido.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common'
import { DetallePedidoService } from '../services/detalle-pedido.service'
import { DetallePedido } from '../models/detalle-pedido.models'

@Controller('pedidos')
export class DetallePedidoController {
    constructor(private readonly detallePedidoService: DetallePedidoService) {}

    @Get('detalles')
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<DetallePedido[]> {
        return this.detallePedidoService.findAll()
    }

    @Get('detalles/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<DetallePedido> {
        return this.detallePedidoService.findById(id)
    }

    @Get(':pedidoId/items')
    @HttpCode(HttpStatus.OK)
    async findByPedidoId(
        @Param('pedidoId', ParseIntPipe) pedidoId: number
    ): Promise<DetallePedido[]> {
        return this.detallePedidoService.findByPedidoId(pedidoId)
    }

    @Get('producto/:productoId/pedidos')
    @HttpCode(HttpStatus.OK)
    async findByProductoId(
        @Param('productoId', ParseIntPipe) productoId: number
    ): Promise<DetallePedido[]> {
        return this.detallePedidoService.findByProductoId(productoId)
    }

    @Post('detalles')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: Partial<DetallePedido>): Promise<DetallePedido> {
        return this.detallePedidoService.create(data)
    }

    @Post(':pedidoId/items')
    @HttpCode(HttpStatus.CREATED)
    async createMany(
        @Param('pedidoId', ParseIntPipe) pedidoId: number,
        @Body() items: Partial<DetallePedido>[]
    ): Promise<DetallePedido[]> {
        return this.detallePedidoService.createMany(pedidoId, items)
    }

    @Put('detalles/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<DetallePedido>
    ): Promise<DetallePedido> {
        return this.detallePedidoService.update(id, data)
    }

    @Delete('detalles/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.detallePedidoService.delete(id)
    }

    @Delete(':pedidoId/items')
    @HttpCode(HttpStatus.OK)
    async deleteByPedidoId(
        @Param('pedidoId', ParseIntPipe) pedidoId: number
    ): Promise<{ message: string }> {
        return this.detallePedidoService.deleteByPedidoId(pedidoId)
    }
}