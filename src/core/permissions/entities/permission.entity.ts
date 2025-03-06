import { Column, Entity, ManyToMany } from 'typeorm';
import { PermissionsEnum } from '../../../shared/enums/permissions.enum';
import { Role } from '../../../modules/roles/entities/role.entity';
import { BaseEntity } from '../../../base/entities/base.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({
    type: 'enum',
    enum: PermissionsEnum,
  })
  public key: string;

  @Column()
  public name_en: string;

  @Column()
  public name_ar: string;

  @ManyToMany(() => Role, (role: Role) => role.permissions)
  public roles?: Role[];
}
