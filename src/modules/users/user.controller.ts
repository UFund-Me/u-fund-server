import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { Prisma } from "@prisma/client";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return this.userService.user({ id });
  }

  @Get()
  async getUsers() {
    return this.userService.users({});
  }

  @Post()
  async createUser(@Body() data: Prisma.UserUncheckedCreateInput) {
    return this.userService.createUser(data);
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() data: Prisma.UserUncheckedUpdateInput,
  ) {
    return this.userService.updateUser({ where: { id }, data });
  }

  @Put(":id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.updateUser({
      where: { id },
      data: { isActive: false },
    });
  }
}
