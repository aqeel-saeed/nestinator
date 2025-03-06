import { Column, Entity, ManyToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { BaseEntity } from '../../../base/entities/base.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];
}
