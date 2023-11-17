import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';

@Module({
  providers: [ReservaService]
})
export class ReservaModule {}
