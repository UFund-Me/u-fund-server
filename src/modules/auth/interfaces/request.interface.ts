export interface RequestWithUser extends Request {
  user: {
    id: string;
    // 其他用户属性...
  };
}
