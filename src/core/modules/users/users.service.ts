import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityNotFoundException } from 'src/shared/exceptions/not-found.exception';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            return user;
        }
        throw new EntityNotFoundException('User');
    }
    
    async getOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            return user;
        }
        throw new EntityNotFoundException('User', id);
    }

    async create(userData: CreateUserDto) {
        // TODO: encrypt the password before save it (this function should be accessable only from register method, which encrypt the password before call it)
        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }
}
