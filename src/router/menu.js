const menu = [
  {
    nameZh: "用户管理",
    nameEn: "User Management",
    name: "userManagement",
    index: "userManagement",
    children: [
      {
        urlPath: "/user",
        nameZh: "用户列表",
        nameEn: "User List",
        index: "userList",
        name: "userList"
      }
    ]
  }
];

export { menu as default };
