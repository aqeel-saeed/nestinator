import { FilterRule, FilterType } from '../../shared/enums/filter-type.enum';

export interface Filtering {
  property: string;
  rule: FilterRule;
  value:
    | string
    | number
    | boolean
    | Date
    | Array<string | number | boolean | Date>;
  type: FilterType;
}
