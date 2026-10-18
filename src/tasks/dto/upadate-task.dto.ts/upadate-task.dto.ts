import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsString()
    description?: string | null;
}
