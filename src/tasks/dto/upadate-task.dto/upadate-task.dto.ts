import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

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

    @IsOptional()
    @IsInt()
    @Min(1)
    userId?: number | null;
}
