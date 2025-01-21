import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostsService extends BaseService<Post> {
  constructor(
    @InjectRepository(Post)
    protected readonly postRepository: PostRepository,
  ) {
    super(postRepository);
  }
}
