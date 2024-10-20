import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { apiResponse } from 'src/core/utils/auth.utils';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindOneParams } from 'src/shared/params/find-one.params';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Get()
  async getAll() {
    const res = await this.rolesService.getAll();
    return apiResponse(res, 'Roles retrieved successfully.')
  }

  @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the role' })
    async getById(@Param() { id }: FindOneParams) {
        const res = await this.rolesService.getById(+id);
        return apiResponse(res, 'Role retrieved successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() role: CreateRoleDto) {
      const res = await this.rolesService.create(role);
      return apiResponse(res, 'Role created successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the role' })
    @Put(':id')
    async update(@Param() { id }: FindOneParams, @Body() role: UpdateRoleDto) {
        const res = this.rolesService.update(+id, role);
        return apiResponse(res, 'Role updated successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the role' })
    @Delete(':id')
    async delete(@Param() { id }: FindOneParams) {
      await this.rolesService.delete(+id);
      return apiResponse(null, 'Role deleted successfully.');
    }
}
