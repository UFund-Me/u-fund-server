import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { UserService } from "../users/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async wxLogin(data: { code: string; userInfo?: any }) {
    const wxLoginResult = await firstValueFrom(
      this.httpService.get("https://api.weixin.qq.com/sns/jscode2session", {
        params: {
          appid: process.env.WX_APPID,
          secret: process.env.WX_SECRET,
          js_code: data.code,
          grant_type: "authorization_code",
        },
      }),
    );

    const { openid } = wxLoginResult.data;

    let user = await this.userService.user({ openid });
    if (!user) {
      user = await this.userService.createUser({
        openid,
        ...data.userInfo,
      });
    }

    const token = this.jwtService.sign({
      sub: user.id,
      openid: user.openid,
    });

    return {
      user,
      token,
    };
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async getProfile(id: string) {
    return this.userService.user({ id });
  }
}
