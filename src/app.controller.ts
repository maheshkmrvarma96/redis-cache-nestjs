import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30) // override TTL to 30 seconds
  @Get('/getData')
  async getData(@Query('key') key: string) {
    return this.appService.getData(key);
  }

  @Post('/postData')
  async postData(@Body() createDataDto: any, @Query('key') key: string) {
    return this.appService.postData(createDataDto, key);
  }

  @Delete('/deleteData')
  async deleteData(@Query('key') key: string) {
    return this.appService.deleteData(key);
  }
}
