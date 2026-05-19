import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  imports: [UsuarioModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
