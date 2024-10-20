import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../../permissions/entities/permission.entity";
import { permission } from "process";
import { User } from "../../users/entities/user.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name_en: string;

    @Column()
    public name_ar: string;

    @Column()
    public description_en: string;
    
    @Column()
    public description_ar: string;
    
    @ManyToMany(() => Permission, (permission: Permission) => permission.roles)
    @JoinTable({
        name: 'permission_roles',
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permissionId',
            referencedColumnName: 'id'
        }
    })
    public permissions?: Permission[]

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({
        name: 'role_users',
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
    })
    public users?: User[];
}