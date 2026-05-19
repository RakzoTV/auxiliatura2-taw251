import { Column, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
    rol: string;

    @DeleteDateColumn()
    eliminadoEn: Date;
}
