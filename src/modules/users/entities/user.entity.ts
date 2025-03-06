import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Address } from './address.entity';
import { Post } from '../../posts/entities/post.entity';
import { Role } from '../../roles/entities/role.entity';
import { BaseEntity } from '../../../base/entities/base.entity';
import { EnableSoftDelete } from '../../../shared/decorators/soft-delete.decorator';

@EnableSoftDelete()
@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  public verificationCode?: string;

  @Column({ default: false })
  public isVerified: boolean;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address?: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @ManyToMany(() => Role, (role: Role) => role.users, { eager: true })
  public roles?: Role[];
}
