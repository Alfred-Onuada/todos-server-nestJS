import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TodoDto } from './todo';
import { Response } from 'express';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTodos(): TodoDto[] {
    return this.appService.getAllTodos();
  }

  @Get(':id')
  getTodo(@Param('id') id: string, @Res() res: Response): void {
    const todo = this.appService.getATodo(parseInt(id));

    if (todo == undefined) {
      res.status(404).json({ message: 'No Todo found' });
    }

    res.status(200).json({ message: 'Todo found', data: todo });
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id') id: string): void {
    this.appService.deleteATodo(parseInt(id));
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() update,
    @Res() res: Response,
  ): void {
    if (typeof update !== 'object' || Object.keys(update).length === 0) {
      res.status(400).json({ message: 'Update failed, empty request' });
    }

    const updatedTodo = this.appService.updateTodo(parseInt(id), update);

    if (updatedTodo == undefined) {
      res.status(404).json({ message: 'No todo found' });
    }

    res.status(200).json({ message: 'Updated', body: updatedTodo });
  }

  @Post()
  addTodo(@Body() todo: TodoDto): void {
    this.appService.addTodo(todo);
  }
}
