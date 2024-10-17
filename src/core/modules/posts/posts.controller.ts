import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/shared/params/find-one.params';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { apiResponse } from 'src/core/utils/auth.utils';
 
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}
 
  @Get()
  async getAllPosts() {
    const res = await this.postsService.getAllPosts();
    return apiResponse(res, 'Posts retrieved successfully.');
  }
 
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  async getPostById(@Param() { id }: FindOneParams) {
    const res = await this.postsService.getPostById(+id);
    return apiResponse(res, 'Post retrieved successfully.');
  }
  
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() post: CreatePostDto, @Req() req) {
    const res = await this.postsService.createPost(post, req.user);
    return apiResponse(res, 'Post created successfully.');
  }
 
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  @Put(':id')
  async updatePost(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto, @Req() req) {
    const res = await this.postsService.updatePost(+id, post, req.user);
    return apiResponse(res, 'Post updated successfully.');
  }
 
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    await this.postsService.deletePost(+id);
    return apiResponse(null, 'Post deleted successfully.');
  }
}