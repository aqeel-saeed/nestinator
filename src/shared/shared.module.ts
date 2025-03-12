// src/shared/shared.module.ts
import { Global, Module } from '@nestjs/common';
import { OwnershipCheckService } from 'src/shared/utils/ownership-check.util';
import { FilteringService } from './utils/data-filtering/filtering.service';

@Global()
@Module({
  providers: [OwnershipCheckService, FilteringService],
  exports: [OwnershipCheckService, FilteringService],
})
export class SharedModule {}
