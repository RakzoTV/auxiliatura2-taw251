import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum nombreRol {
    ADMIN = "admin",
    CLIENTE = "cliente"
}

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    idRol: number;

    @Column({type: "enum", enum: nombreRol})
    nombre: nombreRol;

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];

    @CreateDateColumn()
    asignadoEn: Date;

    @UpdateDateColumn()
    actualizadoEn: Date;
}
