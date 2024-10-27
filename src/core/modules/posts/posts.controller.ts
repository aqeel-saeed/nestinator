import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/shared/params/find-one.params';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { apiResponse } from 'src/core/utils/utils';
 
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  async getAll() {
    const res = await this.postsService.findAll();
    return apiResponse(res, 'Posts retrieved successfully.');
  }
 
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  async getById(@Param() { id }: FindOneParams) {
    const res = await this.postsService.findById(+id);
    return apiResponse(res, 'Post retrieved successfully.');
  }
  
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() post: CreatePostDto, @Req() req) {
    post['authorId'] = req.user.userId;
    const res = await this.postsService.create(post);
    return apiResponse(res, 'Post created successfully.');
  }
 
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  @Put(':id')
  async update(@Param() { id }: FindOneParams, @Body() post: UpdatePostDto, @Req() req) {
    const res = await this.postsService.update(+id, post);
    return apiResponse(res, 'Post updated successfully.');
  }
 
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  @Delete(':id')
  async delete(@Param() { id }: FindOneParams) {
    await this.postsService.delete(+id);
    return apiResponse(null, 'Post deleted successfully.');
  }
}