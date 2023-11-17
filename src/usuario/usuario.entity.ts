import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcryptjs';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { MesaEntity } from 'src/mesa/mesa.entity';


@Entity({ name: 'usuario' })
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({ type: 'character varying', length: 100, nullable: false })
    nombres: string;

    @Column({ type: 'character varying', length: 100, nullable: false })
    apellidos: string;

    @Column({ type: 'character varying', nullable: false })
    contrasenia: string

    @Column({ type: 'character varying', nullable: false })
    correo: string

    @Column({ type: 'character varying', nullable: false, unique: true })
    identificacion: string

    @Column({ type: 'boolean', default: true, nullable: false })
    estado: boolean

    @ManyToMany(() => TipoUsuarioEntity, (rol) => rol.tipo_usuario, { eager: true })
    @JoinTable({
        name: 'usuario_tipo',
        joinColumn: { name: 'usuario_id' },
        inverseJoinColumn: { name: 'rol_id' },
    })
    tipo_usuarioId: TipoUsuarioEntity[];

    @OneToMany(() => ReservaEntity, reserva => reserva.usuarioId)
    reserva: ReservaEntity[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if (!this.contrasenia) return;
        this.contrasenia = await hash(this.contrasenia, 12);
    }
}