# u-fund-server
  
UFund-Me API Services

## 开发环境

使用 docker-compose 启动 postgres:

````bash
docker-compose -p u-fund-server -f docker/docker-compose.dev.yml up  -d
```` 

在根目录下创建 .env 文件，并填写数据库连接信息:

```bash
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=[Your Database URL]

# Direct connection to the database. Used for migrations.
DIRECT_URL=[Your Database URL]
```

启动开发环境

````bash
pnpm install && pnpm run start
```` 

## 生产环境

TODO
