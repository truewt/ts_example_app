import { Repository, EntityRepository } from "typeorm";
import { Service } from "typedi";
import { User } from "../entities";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

}