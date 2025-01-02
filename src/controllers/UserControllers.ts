import { IUserService } from "@src/services/user/UserService";
import { Request, Response } from "express";

export interface IUserController {
  getAllUsers(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async getAllUsers(_: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json({
        success: true,
        message: "Users fetched successfully.",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching users.",
        error,
      });
    }
  }
}
