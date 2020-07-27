import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    Generated,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { AuthEntity } from '../../auth/entity/auth.entity';
import { RoleEntity } from '../../auth/entity/role.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    firstname: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    lastname: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    phone: string;

    @Column({
        type: 'text',
        nullable: true
    })
    profilePic: string;

    @Column({
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    @CreateDateColumn({
        name: 'createdAt',
        nullable: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt',
        nullable: true
    })
    updatedAt: Date;

    @OneToOne(() => AuthEntity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'loginId' })
    loginId: AuthEntity;

    @ManyToOne(() => RoleEntity, {
        cascade: true,
        onDelete: 'RESTRICT'
    })
    @JoinColumn({ name: 'roleId' })
    roleId: RoleEntity;
}
