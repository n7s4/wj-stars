# 项目简介

调查君项目是一个基于 ReactV18 + ts4 的一个用户调研系统

# 项目工具搭建

## eslint 的配置

安装插件
`npm install @typescript-eslint/eslint-plugin@8.6.0 @typescript-eslint/parser eslint `

初始化配置文件 `.eslint.js`
`npx eslint --init    ## 然后根据引导一步一步走`

解释：eslint `plugin` 与 `extend` 的区别：

- `extend` 提供的是 eslint 现有规则的一系列预设
- `plugin` 则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候就可以借用插件来实现了

安装 vscode 插件 `eslint` ，此时就可以看到代码 `App.txs` 中的错误提示（如定义一个未使用的变量）

在 `package.json` 中增加 scripts `"lint": " eslint 'src/**/*.+(js|ts|jsx|tsx)' "`
控制台运行 `npm run lint` 也可以看到错误提示。如果要自动修复，可以加 `--fix` 参数

#路由设计

## 页面对应的路由

- 首页 `/`
- 登录 `/login`
- 注册 `/register`
- 问卷管理
  - 我的问卷 `/manage/list`
  - 星标问卷 `/manage/star`
  - 回收站 `/manage/trash`
- 问卷详情
  - 编辑问卷 `/question/edit/:id`
  - 问卷统计 `/question/stat/:id`
- 404

## Layout 模板

- MainLayout
- ManageLayout
- QuestionLayout

# API 设计

## 用户功能

### 获取用户信息

- method `get`
- path `/api/user/info`
- response `{ errno: 0, data: {...} }` 或 `{ errno: 10001, msg: 'xxx' }`

### 注册

- method `post`
- path `/api/user/register`
- request body `{ username, password, nickname }`
- response `{ errno: 0 }`

### 登录

- method `post`
- path `/api/user/login`
- request body `{ username, password }`
- response `{ errno: 0, data: { token } }` —— **JWT** 使用 token

## 问卷功能

### 创建问卷

- method `post`
- path `/api/question`
- request body - 无 （点击一个按钮即可创建，title 自动生成）
- response `{ errno: 0, data: { id } }`

### 获取单个问卷

- method `get`
- path `/api/question/:id`
- response `{ errno: 0, data: { id, title ... } }`

### 获取问卷列表

- method `get`
- path `/api/question`
- response: `{ errno: 0, data: { list: [ ... ], total } }`

### 更新问卷信息

- method `patch`
- path `/api/question/:id`
- request body `{ title, isStar ... }` （之前忘记了，现补上）
- response: `{ errno: 0 }`

PS：删除是`假删除`，实际是更新 `isDeleted` 属性

### 批量彻底删除问卷

- method `delete`
- path `/api/question`
- request body `{ ids: [ ... ] }`
- response: `{ errno: 0 }`

### 复制问卷

- method `post`
- path `/api/question/duplicate/:id`
- response: `{ errno: 0, data: { id } }`

## 小结

- 使用 Restful API
- 用户验证使用 JWT （后面再讲）
- 统一返回格式 `{ errno, data, msg }`

# 需求分析

## 界面的模块

- 顶部栏
- 左侧 - 组件库
- 左侧 - 图层
- 中间 - 画布
- 右侧 - 属性
- 右侧 - 页面设置

## 功能列表

顶部栏

- 返回
- 显示标题，修改标题
- 工具栏
  - 删除
  - 隐藏
  - 锁定
  - 复制，粘贴
  - 上移，下移
  - 撤销，重做
- 保存，自动保存，ctrl + s 快捷键
- 发布

左侧 组件库

- 显示组件列表
  - （各个组件，看系统）
- 点击添加组件到画布

左侧 图层

- 显示图层列表
- 拖拽排序
- 单击，选中
- 双击，修改标题
- 隐藏
- 锁定

中间 画布

- 展示组件列表
- Y 滚动条
- 拖拽排序
- 单击，选中
- 快捷键
  - delete backspace
  - up
  - down
  - ctrl + c , v
  - ctrl + z , ctrl + shift + z
  - ctrl + s ，保存

右侧 属性

- 修改属性

右侧 页面设置

- 标题，描述
- JS CSS 代码
- tab 自动切换

# 设计 UI

拆分组件，拼出界面。画图表示

- flex 布局
- 居中对齐
- antd Tabs 组件

代码演示，重点注意：

- 高度 100%
- 画布的尺寸、定位
- 画布的 Y 滚动
