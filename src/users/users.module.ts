import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { usersController } from "./users.controller";


@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UsersService],
    controllers: [usersController]
})
export class usersModule{}