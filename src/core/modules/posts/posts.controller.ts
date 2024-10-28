import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { apiResponse } from 'src/core/utils/utils';
import { BaseController } from 'src/base/base.controller';
import { Post as PostEntity } from './entities/post.entity';
import { ControllerPermissions } from '../permissions/decorators/controller-permissions.decorator';
import { PostPermissionsEnum } from './permissions/posts-permissions.enum';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';
 
@ApiTags('Posts')
@Controller('posts')
@ControllerPermissions({
  'create': [PostPermissionsEnum.POST_CREATE],
})
export class PostsController extends BaseController<PostEntity, CreatePostDto, UpdatePostDto> {
  constructor(
    private readonly postsService: PostsService,
  ) {
    super(postsService);
  }
  
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  async create(@Body() post: CreatePostDto, @Req() req) {
    post['authorId'] = req.user.userId;
    const res = await this.service.create(post);
    // const res = await this.postsService.create(post);
    return apiResponse(res, 'Item created successfully.');
  }
}