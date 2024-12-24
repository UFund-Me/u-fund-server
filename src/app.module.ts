import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { UserModule } from "@modules/users/user.module";
import { AuthModule } from "@modules/auth/auth.module";
import { PrismaService } from "@core/database/prisma.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ScheduleModule.forRoot(), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
