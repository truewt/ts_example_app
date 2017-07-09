import { Service } from "typedi";
import { OrmCustomRepository } from "typeorm-typedi-extensions";
import { User } from "../entities";
import { UserRepository } from "../repositories";

@Service()
export class UserService {

  constructor(
    @OrmCustomRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  create(item: User): Promise<User> {
    // item.password = ...; // make sure not to store plain password
    return this.userRepository.save(item);
  }

}