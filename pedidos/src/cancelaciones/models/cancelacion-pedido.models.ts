import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { Pedido } from '../../pedidos/models/pedidos.models'
import { CancelacionRazonEnum } from '../../common/enums/cancelacion-razon.enum'

@Entity('cancelaciones_pedido')
export class CancelacionPedido {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pedidoId: number

  @Column({
    type: 'varchar',
    length: 100
  })
  numeroPedido: string

  @Column({
    type: 'enum',
    enum: CancelacionRazonEnum
  })
  razon: CancelacionRazonEnum

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.00
  })
  montoTotal: number

  @CreateDateColumn()
  fechaCancelacion: Date

  @ManyToOne(() => Pedido, {
    nullable: false
  })
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido
}