import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MesaEntity } from './mesa.entity';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class MesaService {
    constructor(
        @InjectRepository(MesaEntity)
        private readonly mesaRepository: Repository<MesaEntity>,
    ) { }

    async getUsuariosList(): Promise<MesaEntity[]> {
        const usuarios = await this.mesaRepository.find();
        if (!usuarios.length)
          throw new NotFoundException(
            new MessageDto('No existe un listado de mesa'),
          );
        return usuarios;
      }
      
    async createMesa(createMesaDto: CreateMesaDto): Promise<MesaEntity> {
        const mesa = this.mesaRepository.create(createMesaDto);
        return this.mesaRepository.save(mesa);
    }

    async getMesaById(id_mesa: number) {
        return await this.mesaRepository.findOne({
            where: {
                id_mesa
            }
        })
    }
    async updateMesa(id_mesa: number, usuario: UpdateMesaDto) {
        this.mesaRepository.update({ id_mesa }, usuario)
    }

    async deleteUsuario(id_mesa: number) {
        return this.mesaRepository.delete({ id_mesa })
    }
}