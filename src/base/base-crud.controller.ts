import { Body, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { BaseService } from './base.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/shared/params/find-one.params';
import { DeepPartial } from 'typeorm';
import { UseAuthAndPermissionsIf } from 'src/shared/decorators/conditional-auth.decorator';
import { BaseCrudControllerConfig } from './interfaces/base-controller-config.interface';
import { BaseController } from './base.controller';

export function BaseCrudController<T, CreateDto, UpdateDto>(
  moduleConfig: BaseCrudControllerConfig,
  CreateDtoClass: new () => CreateDto,
  UpdateDtoClass: new () => UpdateDto,
) {
  const authConditions = moduleConfig.authOptions.getUsingAuthBoolean();

  abstract class AbstractBaseCrudController extends BaseController {
    service: BaseService<T>;

    protected constructor(service: BaseService<T>) {
      super();
      this.service = service;
    }

    @UseAuthAndPermissionsIf(authConditions.index)
    @Get()
    async findAll() {
      const res = await this.service.findAll();
      return this.successResponse(
        res,
        `${moduleConfig.entityPluralName} retrieved successfully.`,
      );
    }

    @UseAuthAndPermissionsIf(authConditions.show)
    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'Id of the item' })
    async findById(@Param() { id }: FindOneParams) {
      const res = await this.service.findById(+id);
      return this.successResponse(
        res,
        `${moduleConfig.entitySingleName} retrieved successfully.`,
      );
    }

    @ApiBody({ type: CreateDtoClass })
    @UseAuthAndPermissionsIf(authConditions.create)
    @Post()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async create(@Body() data: CreateDto, @Req() _req) {
      const res = await this.service.create(data as DeepPartial<T>);
      return this.successResponse(
        res,
        `${moduleConfig.entitySingleName} created successfully.`,
      );
    }

    @ApiBody({ type: UpdateDtoClass })
    @UseAuthAndPermissionsIf(authConditions.update)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the item' })
    @Put(':id')
    async update(
      @Param() { id }: FindOneParams,
      @Body() data: UpdateDto,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      @Req() _req,
    ) {
      const res = await this.service.update(+id, data as DeepPartial<T>);
      return this.successResponse(
        res,
        `${moduleConfig.entitySingleName} updated successfully.`,
      );
    }

    @UseAuthAndPermissionsIf(authConditions.delete)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the item' })
    @Delete(':id')
    async delete(@Param() { id }: FindOneParams) {
      await this.service.delete(+id);
      return this.successResponse(
        null,
        `${moduleConfig.entitySingleName} deleted successfully.`,
      );
    }
  }

  // apply the ApiTags decorator to the generated class
  const BaseCrudController = AbstractBaseCrudController;
  ApiTags(moduleConfig.entityPluralName)(BaseCrudController);

  return BaseCrudController;
}
