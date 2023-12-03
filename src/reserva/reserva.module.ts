import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './reserva.entity';
import { ReservaController } from './reserva.controller';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { DetalleReservaEntity } from 'src/detalle_reserva/detalle_reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservaEntity, UsuarioEntity, DetalleReservaEntity]),
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],

})
export class ReservaModule {}
