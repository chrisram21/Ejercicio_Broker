import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Pedido } from './models/pedidos.model'
import { DetallePedido } from './models/detalle-pedido.model'
import { Cancelacion } from './models/cancelacion.model'

import { PedidosRepository } from './repositories/pedidos.repository'
import { DetallePedidoRepository } from './repositories/detalle-pedido.repository'
import { CancelacionesRepository } from './repositories/cancelaciones.repository'

import { PedidosService } from './services/pedidos.service'
import { DetallePedidoService } from './services/detalle-pedido.service'
import { CancelacionesService } from './services/cancelaciones.service'

import { PedidosController } from './controllers/pedidos.controller'
import { DetallePedidoController } from './controllers/detalle-pedido.controller'
import { CancelacionesController } from './controllers/cancelaciones.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([Pedido, DetallePedido, Cancelacion])
    ],
    controllers: [
        PedidosController,
        DetallePedidoController,
        CancelacionesController,
    ],
    providers: [
        PedidosRepository,
        DetallePedidoRepository,
        CancelacionesRepository,
        PedidosService,
        DetallePedidoService,
        CancelacionesService,
    ],
    exports: [
        PedidosService,
        DetallePedidoService,
        CancelacionesService,
    ],
})
export class PedidosModule {}
