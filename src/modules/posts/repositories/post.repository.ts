import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Post } from '../entities/post.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilteringService } from '../../../shared/utils/data-filtering/filtering.service';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    filteringService: FilteringService<Post>,
  ) {
    super(postRepository, filteringService);
  }

  // Add a custom method to search posts by title
  async findByTitle(title: string): Promise<Post[]> {
    const options: FindManyOptions<Post> = {
      where: { title: Like(`%${title}%`) },
    };

    return this.findAllRaw(options);
  }
}
