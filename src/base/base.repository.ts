import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BaseRepository<T> extends Repository<T> {}
