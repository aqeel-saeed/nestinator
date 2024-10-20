import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @Column()
    authorId: number;
    
    @ManyToOne(() => User, (author: User) => author.posts)
    public author: User;

    @ManyToMany(() => Category, (category: Category) => category.posts)
    @JoinTable({
        name: 'category_posts',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        }
    })
    public categories: Category[];
}