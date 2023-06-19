import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

// The class now basically stands in for your mongoose schema, this is nice
// Dto stands for data transfer object it is the representation of the values/object as they are transfered across the app
export class TodoDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['done', 'ongoing', 'open'], {
    message: 'Status must be one of: $constraint1',
  })
  @IsNotEmpty()
  status: 'done' | 'ongoing' | 'open';
}
