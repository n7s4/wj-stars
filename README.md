# 项目简介

小新问卷项目是一个基于 ReactV18 + ts4 模仿问卷星的一个用户调研系统

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
