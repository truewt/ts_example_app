import {
  JsonController,
  Post,
  Body,
  BadRequestError
} from "routing-controllers";
import { User } from "../entities";
import { UserService } from "../services";

@JsonController("/user")
export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  @Post()
  async post(
    @Body({ validate: { groups: ["registration"] } }) user: User
  ) {
    try {
      let res = await this.userService.create(user);
      return { user_id: res.user_id };
    } catch (e) {
      throw new BadRequestError();
    }
  }
  
}