import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor (
    @InjectModel('todo') private todoModel: Model<TodoDto>
  ) {}

  getAllTodos(): Promise<TodoDto[]> {
    return this.todoModel.find();
  }

  getATodo(_id: number): Promise<TodoDto | null> {
    return this.todoModel.findOne({ _id });
  }

  async deleteATodo(_id: number): Promise<void> {
    await this.todoModel.deleteOne({ _id });
  }

  async updateTodo(_id: number, update: object): Promise<TodoDto> {
    await this.todoModel.updateOne(
      { _id },
      { $set: { ...update } }
    );

    return this.getATodo(_id);
  }

  async addTodo(todo: TodoDto): Promise<void> {
    await this.todoModel.create(todo);
  }
}
