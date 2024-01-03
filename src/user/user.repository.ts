import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users : UserEntity[] = [];

    async save(user: UserEntity) {
        this.users.push(user);
    }

    async list() {
        return this.users;
    }

    async existsWithEmail(email: string) {
        const userPossible = this.users.find(
            user => user.email === email
        );

        return userPossible !== undefined;
    }

    private findById(id: string) {
        const user = this.users.find(
            saveUser => saveUser.id === id
        );

        if(!user) {
            throw new Error('Usuário não existe');
        }

        return user;
    }

    async update(id: string, updateData: Partial<UserEntity>) {
        const user = this.findById(id);

        Object.entries(updateData).forEach(([key, value]) => {
            if(key === 'id') {
                return;
            }

            user[key] = value;
        });

        return user;
    }

    async delete(id: string) {
        const user = this.findById(id);
        this.users = this.users.filter(
            saveUser => saveUser.id !== id
        );

        return user;
    }
}