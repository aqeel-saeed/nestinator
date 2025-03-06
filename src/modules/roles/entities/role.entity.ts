import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../../core/permissions/entities/permission.entity';
import { BaseEntity } from '../../../base/entities/base.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column()
  public name_en: string;

  @Column()
  public name_ar: string;

  @Column()
  public description_en: string;

  @Column()
  public description_ar: string;

  @ManyToMany(() => Permission, (permission: Permission) => permission.roles, {
    eager: true,
  })
  @JoinTable({
    name: 'permission_roles',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id',
    },
  })
  public permissions?: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: 'role_users',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  public users?: User[];
}
