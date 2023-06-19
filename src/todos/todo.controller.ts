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
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
import { Response } from 'express';

@Controller('todos')
export class TodoController {
  constructor(private readonly appService: TodoService) {}

  @Get()
  getTodos(): Promise<TodoDto[]> {
    return this.appService.getAllTodos();
  }

  @Get(':id')
  async getTodo(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const todo = await this.appService.getATodo(parseInt(id));

    if (todo == undefined) {
      res.status(404).json({ message: 'No Todo found' });
      return;
    }

    res.status(200).json({ message: 'Todo found', data: todo });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTodo(@Param('id') id: string): Promise<void> {
    await this.appService.deleteATodo(parseInt(id));
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() update,
    @Res() res: Response,
  ): Promise<void> {
    if (typeof update !== 'object' || Object.keys(update).length === 0) {
      res.status(400).json({ message: 'Update failed, empty request' });
    }

    const updatedTodo = await this.appService.updateTodo(parseInt(id), update);

    if (updatedTodo == undefined) {
      res.status(404).json({ message: 'No todo found' });
      return;
    }

    res.status(200).json({ message: 'Updated', body: updatedTodo });
  }

  @Post()
  async addTodo(@Body() todo: TodoDto): Promise<void> {
    await this.appService.addTodo(todo);
  }
}
