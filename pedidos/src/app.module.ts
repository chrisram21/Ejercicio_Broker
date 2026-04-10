import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pedido } from './pedidos/models/pedidos.models'
import { DetallePedido } from './pedidos/models/detalle-pedido.models'
import { CancelacionPedido } from './cancelaciones/models/cancelacion-pedido.models'
import { PedidosRepository } from './pedidos/repositories/pedidos.repository'
import { DetallePedidoRepository } from './pedidos/repositories/detalle-pedido.repository'
import { PedidosService } from './pedidos/services/pedido.service'
import { DetallePedidoService } from './pedidos/services/detalle-pedido.service'
import { PedidosController } from './pedidos/controllers/pedidos.contoller'
import { DetallePedidoController } from './pedidos/controllers/detalle-pedido.controller'
import { CancelacionesModule } from './cancelaciones/cancelaciones.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASS ?? 'Andrea123',
      database: process.env.DB_NAME ?? 'pedidos_db',
      entities: [Pedido, DetallePedido, CancelacionPedido],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Pedido, DetallePedido]),
    CancelacionesModule
  ],
  controllers: [
    PedidosController,
    DetallePedidoController
  ],
  providers: [
    PedidosRepository,
    DetallePedidoRepository,
    PedidosService,
    DetallePedidoService
  ]
})
export class AppModule {}