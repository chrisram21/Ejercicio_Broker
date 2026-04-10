 import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
 }from 'typeorm'
  import {Status} from '../../common/enums/status.enum'
  import {Pedido} from './pedidos.models'

  @Entity('detalle_pedidos')
  export class DetallePedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pedido_id: number

    @Column()
    producto_id: number

    @Column()
    cantidad: number

    @Column()
    descripcion:string

     @Column({
        type: 'decimal',
        precision:2,
        default:0.0
    })
    precio:number

    @Column({
        type: 'decimal',
        precision:2,
        default:0.0
    })
    subtotal:number

      @CreateDateColumn()
    createdAt:Date
    @UpdateDateColumn()
    updatedAt:Date

    @ManyToOne(()=>Pedido,(pedido) => pedido.items, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'pedido_id'})
    pedido: Pedido;
  }