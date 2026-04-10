import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { RazonCancelacion } from '../../common/enums/razon-cancelacion.enum';

@Entity('cancelaciones')
export class Cancelacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numeroPedido: number;

    @Column('decimal', { precision: 10, scale: 2 })
    montoTotal: number;

    @Column({
        type: 'enum',
        enum: RazonCancelacion
    })
    razon: RazonCancelacion;

    @CreateDateColumn()
    fechaCancelacion: Date;
}