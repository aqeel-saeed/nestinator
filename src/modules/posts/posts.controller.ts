import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { apiResponse } from 'src/shared/utils/utils';
import { Post as PostEntity } from './entities/post.entity';
import { ControllerPermissions } from '../permissions/decorators/controller-permissions.decorator';
import { baseControllerFactory } from 'src/base/base.controller';
import { UseAuthAndPermissionsIf } from 'src/shared/decorators/conditional-auth.decorator';
import { postsControllerPermissions } from './permissions/posts-controller-permissions';
import { postsControllerConfig } from './posts.config';
import { ControllerConfig } from '../../../base/decorators/controller-config.decorator';

const BaseController = baseControllerFactory<
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
    return apiResponse(
      res,
      `${postsControllerConfig.entitySingleName} created successfully.`,
    );
  }
}
