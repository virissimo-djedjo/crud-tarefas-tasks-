import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

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
