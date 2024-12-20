import { Controller, Post, Body, UseGuards, Req, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RequestWithUser } from "./interfaces/request.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("wx-login")
  async wxLogin(@Body() data: { code: string; userInfo?: any }) {
    return this.authService.wxLogin(data);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: RequestWithUser) {
    return this.authService.getProfile(req.user.id);
  }
}
