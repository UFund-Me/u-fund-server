import { Module } from "@nestjs/common";
import { UserModule } from "@modules/users/user.module";
import { AuthModule } from "@modules/auth/auth.module";
import { PrismaService } from "@core/database/prisma.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
