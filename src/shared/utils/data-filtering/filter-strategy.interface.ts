import { FindOptionsWhere } from 'typeorm';
import { Filtering } from './filtering.interface';

export interface FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void;
}
