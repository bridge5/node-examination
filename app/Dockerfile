# 拉取node镜像
FROM node:12-alpine

# 设置镜像作者
LABEL MAINTAINER="302804389@qq.com"

# 设置环境变量
ENV NODE_ENV production

# 创建目录,保存代码
RUN mkdir -p /opt/workspace/node-example \
  && mkdir -p /data/node-example/logs \
  && mkdir -p /opt/conf/node-example

# 指定RUN、CMD与ENTRYPOINT命令的工作目录
WORKDIR /opt/workspace/node-example

# 复制所有文件到工作目录
COPY . /opt/workspace/node-example

# 清除npm缓存文件
RUN npm cache clean --force && npm cache verify


# 安装pm2
RUN npm i pm2 -g

# 安装依赖
RUN npm install --production

# 暴露端口
EXPOSE 3030

# 运行命令
ENTRYPOINT pm2-runtime start docker_pm2.json
