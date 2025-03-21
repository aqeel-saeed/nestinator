import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { BaseCrudController } from 'src/base/base-crud.controller';
import { UseAuthAndPermissionsIf } from 'src/shared/decorators/conditional-auth.decorator';
import { postsControllerPermissions } from './permissions/posts-controller-permissions';
import { postsControllerConfig } from './posts.config';
import { ControllerPermissions } from '../../core/permissions/decorators/controller-permissions.decorator';
import { ControllerConfig } from '../../base/decorators/controller-config.decorator';

const BaseController = BaseCrudController<
  PostEntity,
  CreatePostDto,
  UpdatePostDto
>(postsControllerConfig, CreatePostDto, UpdatePostDto);

@Controller(postsControllerConfig.endpointName)
@ControllerPermissions(postsControllerPermissions)
@ControllerConfig(postsControllerConfig)
export class PostsController extends BaseController {
  constructor(readonly postsService: PostsService) {
    super(postsService);
  }

  @UseAuthAndPermissionsIf(
    postsControllerConfig.authOptions.getUsingAuthBoolean().create,
  )
  @Post()
  async create(@Body() post: CreatePostDto, @Req() req) {
    post['authorId'] = req.user.userId;
    const res = await this.service.create(post);
    return this.successResponse(
      `${postsControllerConfig.entitySingleName} created successfully.`,
      res,
    );
  }
}
