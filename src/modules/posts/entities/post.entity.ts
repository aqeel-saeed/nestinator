import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { BaseEntity } from '../../../base/entities/base.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts, {
    cascade: true,
  })
  @JoinTable({
    name: 'category_posts',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  public categories: Category[];
}
