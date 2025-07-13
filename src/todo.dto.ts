import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'
export class TodoDto {
    
    @IsNotEmpty()
    readonly todo_title : string

    @IsString()
    readonly todo_description : string

    @IsBoolean()
    readonly todo_starred : boolean
    
    @IsBoolean()
    readonly todo_checked : boolean

    @IsString()
    readonly todo_author : string

    @IsNumber()
    readonly todo_index : number

}