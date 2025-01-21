// src/shared/shared.module.ts
import { Global, Module } from '@nestjs/common';
import { OwnershipCheckService } from 'src/shared/utils/ownership-check.util';

@Global()
@Module({
  providers: [OwnershipCheckService],
  exports: [OwnershipCheckService],
})
export class SharedModule {}
