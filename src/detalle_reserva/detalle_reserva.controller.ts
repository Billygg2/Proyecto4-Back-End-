import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DetalleReservaService } from './detalle_reserva.service';
import { DetalleReservaEntity } from './detalle_reserva.entity';
import { CreateDetalleReserva } from './dto/create-detalle_reserva.dto';
import { UpdateDetalleReserva } from './dto/update-detalle_reserva.dto';


@Controller('detalle-reserva')
export class DetalleReservaController {
    constructor(private detalleReservaService: DetalleReservaService) { }

    @Get(':id_d_reserva')
    getDetalleReservaById(@Param('id_d_reserva') id: number): Promise<DetalleReservaEntity> {
        return this.detalleReservaService.getDetalleReservaById(id)
    }

    @Get()
    getDetalleReservaList(): Promise<DetalleReservaEntity[]> {
        return this.detalleReservaService.getDetalleReservaList()
    }

    @Post()
    createDetalleReserva(@Body() nuevaReserva: CreateDetalleReserva) {
        return this.detalleReservaService.createDetalleReserva(nuevaReserva)
    }

    @Delete(':id_d_reserva')
    deleteDetalleReserva(@Param('id_d_reserva') id: number){
        return this.detalleReservaService.deleteDetalleReserva(id)
    }

    @Patch(':id_d_reserva')
    updateDetalleReserva(@Param('id_d_reserva') id: number, @Body() reserva: UpdateDetalleReserva){
        return this.detalleReservaService.updateDetalleReserva(id, reserva)
    }
}
