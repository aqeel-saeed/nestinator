import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Post } from '../entities/post.entity';
import { FindManyOptions, Like } from 'typeorm';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  // Add a custom method to search posts by title
  async findByTitle(title: string): Promise<Post[]> {
    const options: FindManyOptions<Post> = {
      where: { title: Like(`%${title}%`) },
    };

    return this.findAllRaw(options);
  }
}
