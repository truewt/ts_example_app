import { Service } from "typedi";
import { User } from "../entities";
import { UserRepository } from "../repositories";
import { BaseService } from "./base/base-service";

@Service()
export class UserService extends BaseService<UserRepository> {

  protected repository: any;

  create(item: User): Promise<User> {
    // item.password = ...; // make sure not to store plain password
    // return this.userRepository.save(item);

    return this.repository.save(item);
  }

}