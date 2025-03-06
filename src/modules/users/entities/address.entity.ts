import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../../../base/entities/base.entity';

@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  public user: User;
}
