import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getData(key: string): Promise<string> {
    return this.cacheManager.get(key); // ? Retrieve data from the cache
  }

  async postData(createDataDto: any, key: string) {
    const TTL = 1000; // ? You can manually specify a TTL (expiration time in seconds)
    await this.cacheManager.set(key, createDataDto, TTL); //  ? Set data in the cache
    return this.getData(key);
  }

  async deleteData(key: string) {
    await this.cacheManager.del(key); // ? Delete data from the cache
    return { message: 'Success' };
  }
}
