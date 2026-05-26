import { applyDecorators, UseGuards } from "@nestjs/common";
import { nombreRol } from "src/rol/entities/rol.entity";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles/roles.guard";

export function Auth(rol: nombreRol){
    return applyDecorators(
        Roles(rol),
        UseGuards(AuthGuard, RolesGuard)

    );
}