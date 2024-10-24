import { EntityManager, Repository } from "typeorm";

export abstract class BaseSeeder<T> {
    constructor(
        protected readonly repository: Repository<T>
    ) {}

    async seed(entityManager: EntityManager) {
        const seedData = await this.getSeedData();
        for (const data of seedData) {
            await this.checkAndInsert(data, entityManager);
        }
    }

    protected abstract getSeedData(): T[] | Promise<T[]>;

    private async checkAndInsert(data: T, entityManager: EntityManager): Promise<void> {
        const exists = await entityManager.findOne(
            this.repository.target,
            { where: data as any }
        );

        if (!exists) {
            const newRecord = entityManager.create(this.repository.target, data);
            console.log('newRecord:', newRecord);
            await entityManager.save(this.repository.target, newRecord);
        }
    }
}
