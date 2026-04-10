import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CancelacionPedido } from './models/cancelacion-pedido.models'
import { CancelacionPedidoController } from './controllers/cancelacion-pedido.controller'
import { CancelacionPedidoService } from './services/cancelacion-pedido.service'
import { CancelacionPedidoRepository } from './repositories/cancelacion-pedido.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CancelacionPedido])],
  controllers: [CancelacionPedidoController],
  providers: [CancelacionPedidoService, CancelacionPedidoRepository],
  exports: [CancelacionPedidoService, CancelacionPedidoRepository]
})
export class CancelacionesModule {}