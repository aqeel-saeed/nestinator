import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];
}
