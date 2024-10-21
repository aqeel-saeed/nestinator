import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';
import { UsersService } from '../users/users.service';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private categoriesService: CategoriesService,
    private usersService: UsersService
  ) {}

  async getAll() {
    return this.postsRepository.find({ relations: ['author', 'categories'] });
  }

  async getById(id: number) {
    const post = this.postsRepository.findOne({ 
      where : { id }, 
      relations: ['author', 'categories']
    });
    if (post) {
      return post;
    }
    throw new EntityNotFoundException('Post', id);
  }

  async update(id: number, post: UpdatePostDto, user: User) {
    // TODO: check if this user has the permission to update the post
    const existingPost = await this.postsRepository.findOne({ where: { id }, relations: ['author', 'categories'] });
    if (!existingPost) {
      throw new EntityNotFoundException('Post', id);
    }

    const { categoryIds, ...postWithoutCategioryIds } = post;

    if (categoryIds && categoryIds.length > 0) {
      const categories = await this.categoriesService.getByIds(categoryIds);
      existingPost.categories = categories;
      await this.postsRepository.save(existingPost);
    }
    
    await this.postsRepository.update(id, postWithoutCategioryIds);
    const updatedPost = await this.postsRepository.findOne({ 
      where: { id },
      relations: ['author', 'categories']
    });

    return updatedPost; 
  }

  async create(post: CreatePostDto, user: User) {
    // get user who create the post for attaching it
    const userFromDB = await this.usersService.getOne(user.id);

    // find categories
    const categories = await this.categoriesService.getByIds(post.categoryIds);

    const newPost = this.postsRepository.create({
      ...post,
      author: userFromDB,
      categories: categories
    });
    await this.postsRepository.save(newPost);
    
    return newPost;
  }

  async delete(id: number) {
    const deletedPost = await this.postsRepository.delete(id);
    if (!deletedPost.affected) {
      throw new EntityNotFoundException('Post', id);
    }
  }
}