import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHelp(): string {
    return "Stop It! Get Some Help!"
  }
}
