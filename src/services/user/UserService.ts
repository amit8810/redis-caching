import axios from "axios";
import { redisCachingService } from "../redis/RedisCachingService";

export interface IUserService {
  getUsers(): Promise<any[]>;
}

export class UserService implements IUserService {
  public async getUsers(): Promise<any[]> {
    let redisKey = "121-users-121";
    const cachedData = await redisCachingService.get(redisKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      try {
        const response = await axios.get("https://dummyjson.com/users?limit=10&select=firstName,age");
        //cache data
        await redisCachingService.set(redisKey, JSON.stringify(response.data.users));
        return response.data.users;
      } catch (error) {
        throw error;
      }
    }
  }
}
