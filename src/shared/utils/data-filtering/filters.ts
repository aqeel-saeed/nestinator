import {
  FindOptionsWhere,
  Like,
  MoreThan,
  LessThan,
  In,
  IsNull,
  Not,
  LessThanOrEqual,
  Between,
} from 'typeorm';
import { FilterStrategy } from './filter-strategy.interface';
import { Filtering } from './filtering.interface';

export class EqualsFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = filter.value;
  }
}

export class NotEqualsFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = Not(filter.value);
  }
}

export class GreaterThanFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = MoreThan(filter.value);
  }
}

export class LessThanFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = LessThan(filter.value);
  }
}

export class LikeFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = Like(`%${filter.value}%`);
  }
}

export class InFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = In(
      filter.value as Array<string | number | boolean | Date>,
    );
  }
}

export class IsNullFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = IsNull();
  }
}

export class LessThanOrEqualsFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = LessThanOrEqual(filter.value);
  }
}

export class NotLikeFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = Not(Like(`%${filter.value}%`));
  }
}

export class NotInFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = Not(
      In(filter.value as Array<string | number | boolean | Date>),
    );
  }
}

export class IsNotNullFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    where[filter.property] = Not(IsNull());
  }
}

export class BetweenFilter<T> implements FilterStrategy<T> {
  apply(filter: Filtering, where: FindOptionsWhere<T>): void {
    const [start, end] = filter.value as [number | Date, number | Date];
    where[filter.property] = Between(start, end);
  }
}
