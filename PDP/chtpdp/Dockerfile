    # 使用 Node.js 镜像作为基础
    FROM node:14.18-alpine3.15

    # 设置工作目录
    WORKDIR /chtpdp

    # 复制 package.json 和 package-lock.json 到工作目录
    COPY package*.json ./

    # 安装依赖
    RUN npm install

    # 将整个项目复制到工作目录
    COPY . .

    # 暴露端口（如果你的 React 应用程序运行在除默认端口外的端口上，请相应地更改）
    EXPOSE 3000

    # 启动 React 应用程序
    CMD ["npm", "start"]