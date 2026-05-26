import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'auxorm',
    autoLoadEntities: true,
    synchronize: true,
    //dropSchema: true

  }), UsuarioModule, AuthModule, RolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
