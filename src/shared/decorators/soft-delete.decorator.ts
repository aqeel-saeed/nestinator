import { DeleteDateColumn } from 'typeorm';

const SOFT_DELETE_METADATA_KEY = 'softDeleteEnabled';

export function EnableSoftDelete() {
  return function <T extends new (...args: any[]) => object>(constructor: T) {
    Reflect.defineMetadata(SOFT_DELETE_METADATA_KEY, true, constructor);

    // dynamically add DeletedDateColumn if not already present
    if (!('deletedAt' in constructor.prototype)) {
      Object.defineProperty(constructor.prototype, 'deletedAt', {
        value: undefined,
        writable: true,
        enumerable: true,
      });

      // Apply DeleteDateColumn decorator dynamically
      DeleteDateColumn({ type: 'timestamp', nullable: true })(
        constructor.prototype,
        'deletedAt',
      );
    }
  };
}

export function isSoftDeleteEnabled(target: object): boolean {
  return Reflect.getMetadata(SOFT_DELETE_METADATA_KEY, target) || false;
}
