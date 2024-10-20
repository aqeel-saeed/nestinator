import { PermissionsEnum, permissionType } from "../../../../shared/enums/permissions.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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

    // TODO: here we should have an M2M relation between permissions and roles
}