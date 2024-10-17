import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { privateDecrypt } from 'crypto';
import { In, Repository } from 'typeorm';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCateogryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) {}

    getAll() {
        return this.categoriesRepository.find();
    }

    getById(id: number) {
        const category = this.categoriesRepository.findOne({ 
            where: { id }, 
            relations: ['posts']
        });
        if (category) {
            return category;
        }
        throw new EntityNotFoundException('Category', id);
    }

    async getByIds(ids: number[]) {
        const categories = await this.categoriesRepository.findBy({ id: In(ids) });
        if (categories) {
            return categories;
        }
        throw new EntityNotFoundException('Category');
    }

    async update(id: number, category: UpdateCategoryDto) {
        await this.categoriesRepository.update(id, category);
        const updatedCategory = this.categoriesRepository.findOne({
            where: { id },
            relations: ['posts']
        });
        if (updatedCategory) {
            return updatedCategory;
        }
        throw new EntityNotFoundException('Category', id);
    }

    async create(category: CreateCateogryDto) {
        const newCategory = this.categoriesRepository.create(category);
        await this.categoriesRepository.save(newCategory);
        return newCategory;
    }

    async delete(id: number) {
        const deletedCategory = await this.categoriesRepository.delete(id);
        if (!deletedCategory.affected) {
            throw new EntityNotFoundException('Category', id);
        }
    }
}
