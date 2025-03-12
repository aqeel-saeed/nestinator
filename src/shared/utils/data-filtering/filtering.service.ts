import { Injectable } from '@nestjs/common';
import { FilterStrategyRegistry } from './filter-strategy.registry';
import {
  BetweenFilter,
  EqualsFilter,
  GreaterThanFilter,
  InFilter,
  IsNotNullFilter,
  IsNullFilter,
  LessThanFilter,
  LessThanOrEqualsFilter,
  LikeFilter,
  NotEqualsFilter,
  NotInFilter,
  NotLikeFilter,
} from './filters';
import { FilterRule } from '../../enums/filter-type.enum';

@Injectable()
export class FilteringService<T> {
  private strategyRegistry: FilterStrategyRegistry<T>;

  constructor() {
    this.strategyRegistry = new FilterStrategyRegistry<T>();
    this.registerStrategies();
  }

  private registerStrategies(): void {
    this.strategyRegistry.register(FilterRule.EQUALS, new EqualsFilter<T>());
    this.strategyRegistry.register(
      FilterRule.NOT_EQUALS,
      new NotEqualsFilter<T>(),
    );
    this.strategyRegistry.register(
      FilterRule.GREATER_THAN,
      new GreaterThanFilter<T>(),
    );
    this.strategyRegistry.register(
      FilterRule.GREATER_THAN_OR_EQUALS,
      new GreaterThanFilter<T>(),
    );
    this.strategyRegistry.register(
      FilterRule.LESS_THAN,
      new LessThanFilter<T>(),
    );
    this.strategyRegistry.register(
      FilterRule.LESS_THAN_OR_EQUALS,
      new LessThanOrEqualsFilter<T>(),
    );
    this.strategyRegistry.register(FilterRule.LIKE, new LikeFilter<T>());
    this.strategyRegistry.register(FilterRule.NOT_LIKE, new NotLikeFilter<T>());
    this.strategyRegistry.register(FilterRule.IN, new InFilter<T>());
    this.strategyRegistry.register(FilterRule.NOT_IN, new NotInFilter<T>());
    this.strategyRegistry.register(FilterRule.IS_NULL, new IsNullFilter<T>());
    this.strategyRegistry.register(
      FilterRule.IS_NOT_NULL,
      new IsNotNullFilter<T>(),
    );
    this.strategyRegistry.register(FilterRule.BETWEEN, new BetweenFilter<T>());
  }

  getStrategyRegistry(): FilterStrategyRegistry<T> {
    return this.strategyRegistry;
  }
}
