import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from "class-validator";
import { Service } from "typedi";
import { ValidatorService } from "../services";

@Service()
@ValidatorConstraint({ name: "isUnique", async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {

  constructor(
    private validatorService: ValidatorService
  ) {}

  validate(value: any, args: ValidationArguments): Promise<boolean> {
    return this.validatorService.isUnique(
      value,
      args.property,
      args.object.constructor
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be unique`;
  }

}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueConstraint
    });
  };
}