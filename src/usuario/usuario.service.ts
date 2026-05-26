import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario> 
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepo.create(createUsuarioDto);
    const hashPass = await bcrypt.hash(createUsuarioDto.password, 10);
    usuario.password = hashPass;
    return await this.usuarioRepo.save(usuario);
  }

  async findAll() {
    return await this.usuarioRepo.find({
      relations: {rol: true}
    });
    //select * from usuario
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOneBy({idUsuario: id});
    //select * from usuario where idUsuario = id
    if(!usuario) throw new NotFoundException("usuario no encontrado");

    return usuario;
  }

  async findByEmail(email: string) {
    const usuario = await this.usuarioRepo.findOneBy({email: email});
    //select * from usuario where email = email
    if(!usuario) throw new NotFoundException("usuario no encontrado");

    return usuario;
  }

  async findByEmailLogin(email: string) {
    return await this.usuarioRepo.findOne({
      where: { email },
      relations: { rol: true }
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepo.findOneBy({idUsuario: id});
    //select * from usuario where idUsuario = id
    if(!usuario) throw new NotFoundException("usuario no encontrado");

    return await this.usuarioRepo.update(id, updateUsuarioDto);
    //update usuario set ... where idUsuario = id
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepo.findOneBy({idUsuario: id});
    //select * from usuario where idUsuario = id
    if(!usuario) throw new NotFoundException("usuario no encontrado");
 
    return await this.usuarioRepo.delete(id);
    //delete from usuario where idUsuario = id
  }
}
