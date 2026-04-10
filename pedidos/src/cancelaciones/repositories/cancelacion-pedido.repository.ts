import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CancelacionPedido } from '../models/cancelacion-pedido.models'
import { CancelacionRazonEnum } from '../../common/enums/cancelacion-razon.enum'

@Injectable()
export class CancelacionPedidoRepository {
  constructor(
    @InjectRepository(CancelacionPedido)
    private readonly cancelacionPedidoRepository: Repository<CancelacionPedido>
  ) {}

  async crear(data: {
    pedidoId: number
    numeroPedido: string
    razon: CancelacionRazonEnum
    montoTotal: number
  }) {
    const cancelacion = this.cancelacionPedidoRepository.create({
      pedidoId: data.pedidoId,
      numeroPedido: data.numeroPedido,
      razon: data.razon,
      montoTotal: data.montoTotal
    })

    return await this.cancelacionPedidoRepository.save(cancelacion)
  }

  async obtenerTodas() {
    return await this.cancelacionPedidoRepository.find({
      relations: ['pedido']
    })
  }

  async obtenerPorId(id: number) {
    return await this.cancelacionPedidoRepository.findOne({
      where: { id },
      relations: ['pedido']
    })
  }
}