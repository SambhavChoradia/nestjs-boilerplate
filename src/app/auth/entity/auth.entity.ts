import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    Generated,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('login')
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    luid: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
    })
    username: string;

    @Column('text')
    password: string;

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive: boolean;

    @CreateDateColumn({
        name: 'createdAt',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt',
        nullable: true,
    })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 15);
    }

    @BeforeUpdate()
    async hashChangedPassword() {
        this.password = await bcrypt.hash(this.password, 15);
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }
}
