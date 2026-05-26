import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsuarioService,
        private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto){
        const usuario = await this.userService.findByEmailLogin(loginDto.email);
        if(!usuario) throw new UnauthorizedException("Email Invalido");

        const isPassValido = await bcrypt.compare(loginDto.password, usuario.password);
        if(!isPassValido) throw new UnauthorizedException("Contraseña Incorrecta");

        const payload = {
            idUsuario: usuario.idUsuario,
            email: usuario.email,
            rol: usuario.rol.nombre
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            token: token,
            email: usuario.email,
            rol: usuario.rol.nombre
        }
    }

    async register(registerDto: RegisterDto){
        const usuario = await this.userService.findByEmailLogin(registerDto.email);
        if(usuario) throw new BadRequestException("El email ya está registrado");

        const hashPass = await bcrypt.hash(registerDto.password, 10);

        await this.userService.create({
            ...registerDto,
            password: hashPass
        });

        return usuario;
    }
}
