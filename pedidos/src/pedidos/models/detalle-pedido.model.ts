import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import {Status} from '../../common/enums/status.enum'
import {Pedido} from './pedidos.model'

@Entity('detalle_pedidos')
export class DetallePedido{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pedido_id: number

    @Column()
    producto_id: number

    @Column()
    cantidad: number

    @Column()
    description: string

    @Column({
        type: 'decimal',
        precision: 2,
        scale:2,
        default: 0.00
    })
    precio: number

    @Column({
        type: 'decimal',
        precision: 2,
        scale:2,
        default: 0.00
    })
    subtotal: number

    @ManyToOne( () => Pedido, (pedido) => pedido.Items, { onDelete: 'CASCADE'})

    @JoinColumn({name: 'pedido_id'})

    pedido:Pedido;
}