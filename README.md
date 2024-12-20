# u-fund-server

UFund-Me API Services

## 开发环境

使用 docker-compose 启动 postgres:

````bash
docker-compose -p u-fund-server -f docker/docker-compose.dev.yml up  -d
```` 

在根目录下创建 .env 文件，并填写数据库连接信息:

```bash
DATABASE_URL="postgresql://<your username>:<your password>@localhost:5432/<your database name>?schema=public"

WX_APPID=<your wx appid>
WX_SECRET=<your wx secret>

JWT_SECRET=<your jwt secret>
```

安装依赖

````bash
npm install
```` 

生成 prisma 客户端

````bash
npx prisma generate
```` 

首次运行时，同步数据库结构

````bash
npx prisma db push
```` 

启动开发环境

````bash
npm run start:dev
```` 

## 生产环境

TODO
