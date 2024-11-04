import { Body, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { BaseService } from "./base.service";
import { apiResponse } from "src/shared/utils/utils";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { FindOneParams } from "src/shared/params/find-one.params";
import { DeepPartial } from "typeorm";
import { UseAuthAndPermissionsIf } from "src/shared/decorators/conditional-auth.decorator";
import { BaseControllerConfig } from "./interfaces/base-controller-config.interface";

export function baseControllerFactory<
    T,
    CreateDto,
    UpdateDto
    >(
        moduleConfig: BaseControllerConfig,
        CreateDtoClass: new () => CreateDto,
        UpdateDtoClass: new () => UpdateDto,
) {
    const authConditions = moduleConfig.authOptions.getUsingAuthBoolean();

    abstract class AbstractBaseController {
        service: BaseService<T>;

        protected constructor(
            service: BaseService<T>,
        ) {
            this.service = service;
        }

        @UseAuthAndPermissionsIf(authConditions.index)
        @Get()
        async findAll() {
            const res = await this.service.findAll();
            return apiResponse(res, `${moduleConfig.entityPluralName} retrieved successfully.`);
        }
    
        @UseAuthAndPermissionsIf(authConditions.show)
        @Get(':id')
        @ApiParam({ name: 'id', type: Number, description: 'Id of the item' })
        async findById(@Param() { id }: FindOneParams) {
            const res = await this.service.findById(+id);
            return apiResponse(res, `${moduleConfig.entitySingleName} retrieved successfully.`);
        }
    
        @ApiBody({ type: CreateDtoClass })
        @UseAuthAndPermissionsIf(authConditions.create)
        @Post()
        async create(@Body() data: CreateDto, @Req() req) {
            const res = await this.service.create(data as DeepPartial<T>);
            return apiResponse(res, `${moduleConfig.entitySingleName} created successfully.`);
        }
    
        @ApiBody({ type: UpdateDtoClass })
        @UseAuthAndPermissionsIf(authConditions.update)
        @ApiParam({ name: 'id', type: Number, description: 'ID of the item' })
        @Put(':id')
        async update(@Param() { id }: FindOneParams, @Body() data: UpdateDto, @Req() req) {
            const res = await this.service.update(+id, data as DeepPartial<T>);
            return apiResponse(res, `${moduleConfig.entitySingleName} updated successfully.`);
        }
    
        @UseAuthAndPermissionsIf(authConditions.delete)
        @ApiParam({ name: 'id', type: Number, description: 'ID of the item' })
        @Delete(':id')
        async delete(@Param() { id }: FindOneParams) {
            await this.service.delete(+id);
            return apiResponse(null, `${moduleConfig.entitySingleName} deleted successfully.`);
        }
    }

    // apply the ApiTags decorator to the generated class
    const BaseController = AbstractBaseController;
    ApiTags(moduleConfig.entityPluralName)(BaseController);

    return BaseController;
}