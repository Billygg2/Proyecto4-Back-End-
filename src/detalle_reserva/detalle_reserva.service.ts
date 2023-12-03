import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleReservaEntity } from './detalle_reserva.entity';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { MesaEntity } from 'src/mesa/mesa.entity';

import { Repository } from 'typeorm';
import { CreateDetalleReserva } from './dto/create-detalle_reserva.dto';
import { UpdateDetalleReserva } from './dto/update-detalle_reserva.dto';
import { ReservaService } from 'src/reserva/reserva.service';
import { MesaService } from 'src/mesa/mesa.service';

@Injectable()
export class DetalleReservaService {

    constructor(
        @InjectRepository(DetalleReservaEntity)
        private detalleReservaRepository: Repository<DetalleReservaEntity>,

      ) {}
    
    async createDetalleReserva(detalleReserva: CreateDetalleReserva) {
        const reserva = detalleReserva.reserva;
        detalleReserva.reserva = reserva;
    
        const mesa = detalleReserva.mesa;
        detalleReserva.mesa = mesa;
    
        return await this.detalleReservaRepository.save(detalleReserva);
      }



    async getDetalleReservaList() {
        return await this.detalleReservaRepository.find({ relations: ['reserva, mesa'] })
    }

    async getDetalleReservaById(id_d_reserva: number) {
        return await this.detalleReservaRepository.findOne({
            where: {
                id_d_reserva
            }
        })
    }

    async deleteDetalleReserva(id_d_reserva: number) {
        return this.detalleReservaRepository.delete({ id_d_reserva })
    }

    async updateDetalleReserva(id_d_reserva: number, detalleReserva: UpdateDetalleReserva) {
        this.detalleReservaRepository.update({ id_d_reserva }, detalleReserva)
    }
}
