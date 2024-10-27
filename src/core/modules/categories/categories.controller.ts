import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { apiResponse } from 'src/core/utils/utils';
import { FindOneParams } from 'src/shared/params/find-one.params';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    @Get()
    async getAll() {
        const res = await this.categoriesService.findAll();
        return apiResponse(res, 'Categories retrieved successfully.');
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the category' })
    async getById(@Param() { id }: FindOneParams) {
        const res = await this.categoriesService.findById(+id);
        return apiResponse(res, 'Category retrieved successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() category: CreateCategoryDto) {
      const res = await this.categoriesService.create(category);
      return apiResponse(res, 'Category created successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the category' })
    @Put(':id')
    async update(@Param() { id }: FindOneParams, @Body() category: UpdateCategoryDto) {
        const res = await this.categoriesService.update(+id, category);
        return apiResponse(res, 'Category updated successfully.');
    }

    @ApiBearerAuth('Authorization')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', type: Number, description: 'ID of the category' })
    @Delete(':id')
    async delete(@Param() { id }: FindOneParams) {
      await this.categoriesService.delete(+id);
      return apiResponse(null, 'Category deleted successfully.');
    }
}
