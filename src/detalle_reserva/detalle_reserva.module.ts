import { Module } from '@nestjs/common';
import { DetalleReservaController } from './detalle_reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleReservaEntity } from './detalle_reserva.entity';
import { DetalleReservaService } from './detalle_reserva.service';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { MesaEntity } from 'src/mesa/mesa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleReservaEntity, ReservaEntity, MesaEntity]),
  ],
  controllers: [DetalleReservaController],
  providers: [DetalleReservaService],
  exports: [DetalleReservaService],

})
export class DetalleReservaModule {}
