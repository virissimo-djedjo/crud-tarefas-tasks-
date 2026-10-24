import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class usersController{
    constructor(private readonly userService: UsersService,){}

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id);
    }
}