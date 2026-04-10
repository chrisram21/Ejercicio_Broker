 import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
 } from 'typeorm'

 import {Status} from '../../common/enums/status.enum'
 import {DetallePedido} from './detalle-pedido.models'

 @Entity('pedidos')//como se va a llamar la tabla
 export class Pedido {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        type: 'int',
        default: Status.PENDIENTE_PAGO
    })
    pedido_status:number

    @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.00
    })
    pedido_total: number

    @CreateDateColumn()
    createdAt:Date
    @UpdateDateColumn()
    updatedAt:Date

    @OneToMany(()=>DetallePedido,(item)=>item.pedido,{
        cascade:true,
        eager:true
    })
    items:DetallePedido[]
}
 