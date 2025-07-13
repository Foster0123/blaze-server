import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/database/mongo.service';
import { TodoDto } from 'src/todo.dto';

@Injectable()
export class TodoService {
    async getTodo(username: string): Promise<any> {
		const mongo = new MongoService();

		const todo = await mongo.todo.findMany({ where: { author: username }})
			.then((response) => { return response })
			.catch((err) => console.error(err))
	}
	async handleTodo(dto: TodoDto) {
		const mongo = new MongoService();
		console.log(dto.todo_title)
		await mongo.todo.create(
			{
				data:
				{
					title: dto.todo_title,
					description: dto.todo_description,
					index: Number(dto.todo_index),
					author: dto.todo_author,
					starred: Boolean(dto.todo_starred),
					checked: Boolean(dto.todo_checked)
				}
			})
			.then((response) => console.log(response))
			.catch((err) => console.error(err));
		return dto
	}
	async updateTodo(username: string, title: string) {
		const mongo = new MongoService()
		await mongo.todo.findMany({
			distinct: 'author', where: {
				author: username
			}
		})
			.then(async (response) => {
				await mongo.todo.update(
					{
						where: { id: response[0].id },
						data: { title: title }
					})
					.then((response) => console.log(response))
					.catch((err) => console.error(err))
			})
			.catch((err) => console.error(err))

		return 'Updated Sucessfully!'
	}
}
