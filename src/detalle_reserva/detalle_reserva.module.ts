import { Module } from '@nestjs/common';
import { DetalleReservaController } from './detalle_reserva.controller';

@Module({
  controllers: [DetalleReservaController]
})
export class DetalleReservaModule {}
