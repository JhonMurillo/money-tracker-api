import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStatus(): Record<string, any> {
    return {
      name: 'money-tracker-api'
    };
  }
}
