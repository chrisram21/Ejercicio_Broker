import { Status } from '../../common/enums/status.enum'

export class CreatePedidoDto {
    items: CreateDetalleItemDto[]
}

export class CreateDetalleItemDto {
    producto_id: number
    cantidad: number
    descripcion: string
    precio: number
}

export class UpdatePedidoDto {
    pedido_status?: Status
}

export class UpdateDetallePedidoDto {
    cantidad?: number
    descripcion?: string
    precio?: number
}
