import { DetalleReservaEntity } from 'src/detalle_reserva/detalle_reserva.entity';
import { MesaEntity } from 'src/mesa/mesa.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, JoinColumn, ManyToMany, OneToMany,ManyToOne } from 'typeorm';

@Entity({ name: 'reserva' })
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id_reserva: number;

  @Column({ type: 'date', nullable: false })
  fecha_reserva: Date;

  @Column({ type: 'date', nullable: false })
  fecha_registro_reserva: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  estado: boolean;

  @ManyToOne(() => UsuarioEntity, { nullable: false})
  @JoinColumn({name: 'id_usuario'})
  usuarioId: UsuarioEntity;

}
