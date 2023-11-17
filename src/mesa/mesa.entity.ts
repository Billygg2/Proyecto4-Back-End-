import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { DetalleReservaEntity } from 'src/detalle_reserva/detalle_reserva.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';


@Entity({ name: 'mesa' })
export class MesaEntity {
  @PrimaryGeneratedColumn()
  id_mesa: number;

  @Column({ type: 'integer', nullable: false })
  cantidad_personas: number;

  @Column({ type: 'boolean', default: true, nullable: false })
  estado: boolean;

  @Column({ type: 'enum', enum: [1, 2, 3], nullable: false })
  planta: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  esVip: boolean;
  
  @ManyToMany(() => ReservaEntity, reserva => reserva.id_reserva)
  @JoinTable({
    name: 'detalle_reserva',
    joinColumn: { name: 'id_mesa', referencedColumnName: 'id_mesa' },
    inverseJoinColumn: { name: 'id_reserva', referencedColumnName: 'id_reserva' }
  })
  reservas: ReservaEntity[];
}