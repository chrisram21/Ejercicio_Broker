import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { CancelacionPedidoService } from '../services/cancelacion-pedido.service'
import { CancelacionRazonEnum } from '../../common/enums/cancelacion-razon.enum'

@Controller('cancelaciones')
export class CancelacionPedidoController {
  constructor(
    private readonly cancelacionPedidoService: CancelacionPedidoService
  ) {}

  @Get()
  obtenerTodas() {
    return this.cancelacionPedidoService.obtenerTodas()
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.cancelacionPedidoService.obtenerPorId(Number(id))
  }

  @Post()
  crearCancelacion(
    @Body('pedidoId') pedidoId: number,
    @Body('numeroPedido') numeroPedido: string,
    @Body('razon') razon: CancelacionRazonEnum,
    @Body('montoTotal') montoTotal: number
  ) {
    return this.cancelacionPedidoService.registrarCancelacion({
      pedidoId,
      numeroPedido,
      razon,
      montoTotal
    })
  }
}