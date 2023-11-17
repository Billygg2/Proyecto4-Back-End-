import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {  
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,} from './config/constans'


import { from } from 'rxjs';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { MesaController } from './mesa/mesa.controller';
import { MesaService } from './mesa/mesa.service';
import { MesaModule } from './mesa/mesa.module';
import { ReservaController } from './reserva/reserva.controller';
import { ReservaModule } from './reserva/reserva.module';
import { DetalleReservaService } from './detalle_reserva/detalle_reserva.service';
import { DetalleReservaModule } from './detalle_reserva/detalle_reserva.module';
import { TipoUsuarioService } from './tipo_usuario/tipo_usuario.service';
import { TipoUsuarioModule } from './tipo_usuario/tipo_usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(DB_HOST),
        port: configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        retryDelay: 3000,
        retryAttempts: 10,
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
    TipoUsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
