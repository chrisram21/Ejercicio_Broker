import { Injectable } from '@nestjs/common'
import { CancelacionPedidoRepository } from '../repositories/cancelacion-pedido.repository'
import { CancelacionRazonEnum } from '../../common/enums/cancelacion-razon.enum'

@Injectable()
export class CancelacionPedidoService {
  constructor(
    private readonly cancelacionPedidoRepository: CancelacionPedidoRepository
  ) {}

  async registrarCancelacion(data: {
    pedidoId: number
    numeroPedido: string
    razon: CancelacionRazonEnum
    montoTotal: number
  }) {
    return await this.cancelacionPedidoRepository.crear(data)
  }

  async obtenerTodas() {
    return await this.cancelacionPedidoRepository.obtenerTodas()
  }

  async obtenerPorId(id: number) {
    return await this.cancelacionPedidoRepository.obtenerPorId(id)
  }
}