import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { register } from 'module';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles/roles.guard';
import { nombreRol } from 'src/rol/entities/rol.entity';
import { Auth } from './decorator/auth.decorator';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post("login")
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Post("register")
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }

    @Get("/profile")
    @Auth(nombreRol.CLIENTE)
    profile(){
        return "profile";
    }
}
