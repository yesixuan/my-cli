# @vicli/cli 脚手架

## 修改自动注入的核心插件 `@vicli/cli-service`

cli/lib/Creator.js

## 修改选择 babel 时，注入的插件 `@vicli/cli-plugin-babel`

cli/lib/promptModules/babel.js



# @vicli/cli-server 核心插件

## 替换工具包

全局搜索 `@vue/cli-shared-utils` 为 `@vicli/cli-shared-utils` （package.json 中的也要改）

## 修改 scripts 命令

cli-service/generator/index.js

## 添加核心依赖 react、 react-dom



# @vicli/cli-plugin-babel babel 插件

## 修改 presets 为 `react-app`

cli-plugin-babel/generator.js

## 添加 react 的 babel 依赖

package.json 中 babel-plugin-named-asset-import、babel-preset-react-app



# @vicli/cli-shared-utils 工具包

## 一些正则验证以 `@vue` 开头的，改为或者 `@vicli` 开头
