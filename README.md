# vicli-cli

> Vicli is the Standard Tooling for React.js Development.

基于 @vue/cli 改造的脚手架工具，用于提供可选的 react 生态特性，生成可扩展的 react 项目  
感谢 [尤雨溪](https://github.com/yyx990803)以及其他 [@vue/cli](https://github.com/vuejs/vue-cli) 的开发者。

## Documentation

因为是基于 @vue/cli 的项目，所以相关命令和用法可以参考 [@vue/cli 官网](https://cli.vuejs.org/)  
相关 `vue` 命令变为 `vicli` 命令即可

## Usage

全局安装 **vicli** 脚手架工具
```bash
npm i @vicli/cli -g
```

创建 react 项目
```bash
vicli create <projectName>
```

通过方向键（调整）以及空格键（选中/取消）选择你想在项目中加入的特性

开发模式运行
```bash
npm run serve
```

正式环境打包
```bash
npm run build
```

