import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    @IsNumber()
    @IsPositive()
    price: number;
    @IsInt()
    @Min(0)
    stock: number;
    @IsString()
    @IsNotEmpty()
    category: string;
    @IsBoolean()
    isActive: boolean;
}
