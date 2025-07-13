import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly TodoService: TodoService) {}

  @Get('user/todo/fetch/:username')
  getTodo(@Req() req): Promise<string> {
    const username = req.params['username']
    return this.TodoService.getTodo(username)
  }

  @Post('user/todo')
  createTodo(@Body() dto):  Promise<any> {
    return this.TodoService.handleTodo(dto);
  }

  @Put('user/todo/update/:username')
  updateTodo(@Req() req) {
    console.log(req.body.title)
    return this.TodoService.updateTodo(req.params['username'], req.body.title)
  }
}
