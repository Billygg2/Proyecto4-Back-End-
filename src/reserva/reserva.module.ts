/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './reserva.entity';
import { ReservaController } from './reserva.controller';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { MesaEntity } from 'src/mesa/mesa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservaEntity,
      UsuarioEntity,
      MesaEntity
    ]),
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
