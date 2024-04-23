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
  },
  {
    nameZh: "文件管理",
    nameEn: "Files Management",
    name: "filesManagement",
    index: "filesManagement",
    children: [
      {
        urlPath: "/files",
        nameZh: "文件列表",
        nameEn: "Files List",
        index: "filesList",
        name: "filesList"
      }
    ]
  }
];

export { menu as default };
