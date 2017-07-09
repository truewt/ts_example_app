import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index
} from "typeorm";
import { IsEmail, IsEmpty, Length, MinLength } from "class-validator";
import { IsUnique } from "../validators";

@Entity("u1")
export class User {

  @PrimaryGeneratedColumn()
  @IsEmpty()
  user_id: number;

  @Column({
    length: 255
  })
  @Length(1, 255, {
    groups: ["registration"]
  })
  name: string;

  @Column({
    length: 20,
    unique: true
  })
  @Index()
  @Length(3, 20, {
    groups: ["registration", "login"]
  })
  @IsUnique()
  username: string;

  @Column({
    length: 128
  })
  @MinLength(8, {
    groups: ["registration", "login"]
  })
  password: string;

  @Column({
    length: 255,
    unique: true
  })
  @Index()
  @IsEmail(undefined, {
    groups: ["registration"]
  })
  @IsUnique()
  email: string;

}