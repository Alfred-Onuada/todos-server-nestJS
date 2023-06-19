import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo';

@Injectable()
export class AppService {
  private todos: TodoDto[] = [
    {
      id: 1,
      title: 'Lorem Ipsum',
      status: 'done',
    },
    {
      id: 2,
      title: 'Buy Milk',
      status: 'ongoing',
    },
    {
      id: 3,
      title: 'Do Home work',
      status: 'open',
    },
    {
      id: 4,
      title: 'Go to the gym',
      status: 'ongoing',
    },
  ];

  getAllTodos(): TodoDto[] {
    return this.todos;
  }

  getATodo(id: number): TodoDto | null {
    return this.todos.filter((todo) => todo.id === id)[0];
  }

  deleteATodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  updateTodo(id: number, update: object): TodoDto {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo = {
          ...todo,
          ...update,
        };
      }

      return todo;
    });

    return this.getATodo(id);
  }

  addTodo(todo: TodoDto): void {
    this.todos.push(todo);
  }
}
