import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/create.user.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { ListUserDTO } from "./dto/list.user.dto";
import { UpdateUserDTO } from "./dto/update.user.dto";

@Controller("/users")
export class UserController {

    constructor(private userRepository: UserRepository) {}

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {
        const userEntity = new UserEntity();
        userEntity.id = uuid();
        userEntity.name = userData.name;
        userEntity.email = userData.email;
        userEntity.password = userData.password;

        this.userRepository.save(userEntity);

        return {
            user: new ListUserDTO(userEntity.id, userEntity.name),
            message: 'Usuário criado com sucesso'
        };
    }

    @Get()
    async listUsers() {
        const saveUsers = await this.userRepository.list();
        const listUsers = saveUsers.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        );

        return listUsers;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() newUser: UpdateUserDTO) {
        const userUpdated = await this.userRepository.update(id, newUser);

        return {
            user: userUpdated,
            message: 'Usuário atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        const userDeleted = await this.userRepository.delete(id);

        return {
            user: userDeleted,
            message: 'Usuário removido com sucesso'
        }
    }
}