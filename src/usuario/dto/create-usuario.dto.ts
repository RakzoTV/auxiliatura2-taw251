import { Rol } from "src/rol/entities/rol.entity";

export class CreateUsuarioDto {
    username: string;
    email: string;
    password: string;
    idRol: number;
}
