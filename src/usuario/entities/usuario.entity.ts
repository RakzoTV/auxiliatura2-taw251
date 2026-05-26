import { Rol } from "src/rol/entities/rol.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column({nullable: false, length: 16})
    username: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column()
    idRol: number;

    @ManyToOne(() => Rol, (rol) => rol.usuarios)
    @JoinColumn({name: "idRol"})
    rol: Rol;

    @DeleteDateColumn()
    eliminadoEn: Date;
}
