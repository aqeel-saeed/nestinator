import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from 'src/shared/params/find-one.params';
import { apiResponse } from 'src/core/utils/utils';
import { BaseController } from 'src/base/base.controller';
import { Permission } from './entities/permission.entity';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController extends BaseController<Permission, undefined, undefined> {
    constructor(
        private readonly permissionsService: PermissionsService,
    ) {
        super(permissionsService);
    }

    // TODO: should return a response for a failure not a success
    async create(data, req) {
        return apiResponse(null, 'Create method not supported in this controller.')
    }

    async update(id, data, req) {
        return apiResponse(null, 'Update method not supported in this controller.');
    }

    async delete(id) {
        return apiResponse(null, 'Delete method not supported in this controller.');
    }
}
