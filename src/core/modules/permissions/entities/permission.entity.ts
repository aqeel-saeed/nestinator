import { PermissionsEnum, permissionType } from "../../../../shared/enums/permissions.enum";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({
        type: "enum",
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