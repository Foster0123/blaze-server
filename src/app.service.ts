import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {

	getHelp(): string {
		return "Stop It! Get Some Help!"
	}
}
