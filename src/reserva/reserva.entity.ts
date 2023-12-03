import { DetalleReservaEntity } from 'src/detalle_reserva/detalle_reserva.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, JoinColumn, ManyToMany, OneToMany,ManyToOne } from 'typeorm';

@Entity({ name: 'reserva' })
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id_reserva: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_reserva: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_registro_reserva: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  estado: boolean;

  @ManyToOne(() => UsuarioEntity, { nullable: false})
  @JoinColumn({name: 'id_usuario'})
  usuario: UsuarioEntity;

  @OneToMany(() => DetalleReservaEntity, detalleVenta => detalleVenta.reserva)
  reserva_detalle: DetalleReservaEntity[]

}
