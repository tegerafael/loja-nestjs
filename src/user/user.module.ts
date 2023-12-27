import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EmailIsUniqueValidator } from "./validacao/email-eh-unico.validator";

@Module({
    controllers: [UserController],
    providers: [UserRepository, EmailIsUniqueValidator]
})
export class UserModule {}