import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ){}
  async canActivate(
    context: ExecutionContext):Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);

      if(!requiredRoles){
        return true;
      }

      const { user } = context.switchToHttp().getRequest();
      return requiredRoles.includes(user.rol);
  }
}
