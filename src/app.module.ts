import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'), //config.get('DB_HOST)
        port: config.get<number>('DB_PORT'), //config.get<number>('DB_PORT')
        username: config.get('DB_USERNAME'), //config.get('DB_USERNAME')
        password: config.get('DB_PASSWORD'), //config.get('DB_PASSWORD')
        database: config.get('DB_DATABASE'), //config.get('DB_DATABASE')
        autoLoadEntities: true,
        synchronize: true,
        //dropSchema: true
      }),
      inject: [ConfigService]
    }),
    UsuarioModule,
    AuthModule,
    RolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
