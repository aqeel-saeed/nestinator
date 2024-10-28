import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { apiResponse } from 'src/core/utils/utils';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseController<User, CreateUserDto, UpdateUserDto> {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super(usersService);
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
