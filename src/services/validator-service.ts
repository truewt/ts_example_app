import { Service } from "typedi";
import { EntityManager } from "typeorm";
import { OrmEntityManager } from "typeorm-typedi-extensions";

@Service()
export class ValidatorService {

  constructor(
    @OrmEntityManager()
    private entityManager: EntityManager
  ) {}

  async isUnique(value: any, property: string, entity: Function): Promise<boolean> {
    const objCount = await this.entityManager.getRepository(entity)
      .createQueryBuilder("entity")
      .where(`entity.${property} = :value`, { value: value })
      .getCount();
    return Promise.resolve(objCount === 0);
  }

}