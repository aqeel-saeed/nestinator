import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindOneParams } from 'src/shared/params/find-one.params';
import { apiResponse } from 'src/core/utils/utils';
import { BaseController } from 'src/base/base.controller';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController extends BaseController<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(
    private readonly rolesService: RolesService
  ) {
    super(rolesService);
  }
}
