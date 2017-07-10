import { EntityManager } from "typeorm";
import { OrmEntityManager } from "typeorm-typedi-extensions";
import { Service } from "typedi";

@Service()
export class BaseService<T> {

  protected repository: any; // TODO: change type when resolved

  constructor(
    @OrmEntityManager()
    protected entityManager: EntityManager
  ) {
    this.repository = entityManager.getCustomRepository<T>(() => {});
  }

}