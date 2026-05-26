import { Rol } from "src/rol/entities/rol.entity";

export class RegisterDto {
    username: string;
    email: string;
    password: string;
    idRol: number;
}