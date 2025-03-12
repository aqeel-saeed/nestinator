import { FindOptionsWhere } from 'typeorm';
import { FilterStrategyRegistry } from './filter-strategy.registry';
import { Filtering } from './filtering.interface';

export class FilterBuilder<T> {
  private strategyRegistry: FilterStrategyRegistry<T>;

  constructor(strategyRegistry: FilterStrategyRegistry<T>) {
    this.strategyRegistry = strategyRegistry;
  }

  build(filters: Filtering[]): FindOptionsWhere<T> {
    const where: FindOptionsWhere<T> = {};

    filters.forEach((filter) => {
      const strategy = this.strategyRegistry.getStrategy(filter.rule);
      strategy.apply(filter, where);
    });

    return where;
  }
}
