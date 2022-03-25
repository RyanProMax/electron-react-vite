# Electron-React-Vite

一个基于 Vite + React 构建的 Electron MPA 模板 🚀

## Overview

核心逻辑及实现思路主要借鉴：https://github.com/caoxiemeihao/electron-vite-react

- [x] 整合 Vite, React, Electron，打包采用 electron-builder

- [x] 新增 MPA 支持

## Usage

```sh
# clone the project
git clone https://github.com/RyanProMax/electron-react-vite.git

# open the project directory
cd electron-react-vite

# install dependencies
npm install

# start the application
npm run dev

# make a production build and pack
# default arch: x64
npm run pack
```

## Directory structure

一旦启动或打包脚本执行过，会在根目录产生 **`build` 文件夹，里面的文件夹同 `packages` 一模一样**；在使用一些路径计算时，尤其是相对路径计算；`build` 与 `packages` 里面保持相同的目录结构能避开好多问题

Once `dev` or `build` npm-script is executed, the `build` folder will be generated. It has the same structure as the `packages` folder, the purpose of this design is to ensure the correct path calculation.

```tree
├
├── resources                 Resources for the production build
├   ├── logo.ico              Icon for the application & installer & uninstaller
├
├── build                     Generated after build according to the "packages" directory
├   ├── global
├   ├── main
├   ├── preload
├   ├── renderer
├
├── release                   Generated after production build, contains executables
├   ├── {version}
├       ├── win-unpacked      Contains unpacked application executable
├       ├── Setup.exe         Installer for the application
├
├── scripts
├   ├── build.mjs             Develop script -> npm run build
├   ├── watch.mjs             Develop script -> npm run dev
├
├── packages
├   ├── main                  Main-process source code
├       ├── vite.config.ts
├   ├── preload               Preload-script source code
├       ├── vite.config.ts
├   ├── renderer              Renderer-process source code
├       ├── vite.config.ts
├
```

