import { MesaEntity } from 'src/mesa/mesa.entity';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity({ name: 'detalle_reserva' })
export class DetalleReservaEntity {
  @PrimaryGeneratedColumn()
  id_d_reserva: number;

  @Column({ type: 'double precision', nullable: false })
  costo_total: number;


}