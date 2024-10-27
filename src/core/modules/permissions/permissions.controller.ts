import { Controller, Get, Param } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/shared/params/find-one.params';
import { apiResponse } from 'src/core/utils/utils';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
    constructor(
        private readonly permissionsService: PermissionsService,
    ) {}

    @Get()
    async getAll() {
        const res = await this.permissionsService.findAll();
        return apiResponse(res, 'Permissions retrieved successfully.');
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the permission' })
    async getById(@Param() { id }: FindOneParams) {
        const res = await this.permissionsService.findById(+id);
        return apiResponse(res, 'Permission retrieved successfully.')
    }
}
