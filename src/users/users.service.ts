import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor( @InjectModel(User) private readonly userModel : typeof User,){}

    async create(createUserDto: CreateUserDto){
        return await this.userModel.create({
            name: createUserDto.name,
            email: createUserDto.email,
        });
    }

    async findAll(){
        return await this.userModel.findAll()
    }

    async findOne(id: number){
        const user = await this.userModel.findByPk(id);

        if(!user){
            throw new NotFoundException("Usuário não encontrado!");
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto){
        const user = await this.findOne(id);

        if(updateUserDto.name !== undefined){
            user.name = updateUserDto.name;
        }

        if(updateUserDto.email !== undefined){
            user.email = updateUserDto.email
        }

        await user.save();
        return user;
    }

    async delete(id: number){
        const user = await this.findOne(id);

        await user.destroy();

        return user;
    }
}