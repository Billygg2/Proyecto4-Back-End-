import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {  
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,} from './config/constans'


import { UsuarioModule } from './usuario/usuario.module';
import { MesaModule } from './mesa/mesa.module';
import { ReservaModule } from './reserva/reserva.module';
import { DetalleReservaModule } from './detalle_reserva/detalle_reserva.module';
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
        autoLoadEntities: false,
        synchronize: true,
        dropSchema: false,
        retryDelay: 3000,
        retryAttempts: 10,
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
    TipoUsuarioModule,
    MesaModule,
    ReservaModule,
    DetalleReservaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
