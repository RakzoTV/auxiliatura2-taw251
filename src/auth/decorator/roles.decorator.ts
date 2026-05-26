import { SetMetadata } from "@nestjs/common";
import { nombreRol } from "src/rol/entities/rol.entity";

export const ROLES_KEY = "roles"
export const Roles = (rol: nombreRol) => SetMetadata(ROLES_KEY, rol);