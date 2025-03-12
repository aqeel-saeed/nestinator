import { FilterRule } from '../../shared/enums/filter-type.enum';
import { FilterStrategy } from './filter-strategy.interface';

export class FilterStrategyRegistry<T> {
  private strategies: Map<FilterRule, FilterStrategy<T>>;

  constructor() {
    this.strategies = new Map();
  }

  register(rule: FilterRule, strategy: FilterStrategy<T>): void {
    this.strategies.set(rule, strategy);
  }

  getStrategy(rule: FilterRule): FilterStrategy<T> {
    const strategy = this.strategies.get(rule);
    if (!strategy) {
      throw new Error(`No strategy found for rule: ${rule}`);
    }
    return strategy;
  }
}
