import { Body, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { BaseService } from "./base.service";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { FindOneParams } from "src/shared/params/find-one.params";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { DeepPartial } from "typeorm";
import { apiResponse } from "src/core/utils/utils";
import { EnumType } from "typescript";
import { RequirePermissions } from "src/core/modules/permissions/decorators/permissions.decorator";

export class BaseController<
    T,
    CreateDto extends DeepPartial<T>,
    UpdateDto extends DeepPartial<T>
> {
    constructor(
        protected readonly service: BaseService<T>,
    ) {}

    @Get()
    async findAll() {
        const res = await this.service.findAll();
        return apiResponse(res, 'Items retrieved successfully.');
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'Id of the item' })
    async findById(@Param() { id }: FindOneParams) {
        const res = await this.service.findById(+id);
        return apiResponse(res, 'Item retrieved successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: CreateDto, @Req() req) {
        const res = await this.service.create(data);
        return apiResponse(res, 'Item created successfully.')
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the item' })
    @Put(':id')
    async update(@Param() { id }: FindOneParams, @Body() data: UpdateDto, @Req() req) {
        const res = await this.service.update(+id, data);
        return apiResponse(res, 'Item updated successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the item' })
    @Delete(':id')
    async delete(@Param() { id }: FindOneParams) {
        await this.service.delete(+id);
        return apiResponse(null, 'Item deleted successfully.');
    }
}