FROM node
ENV APPNAME=${APPNAME}
# 工作目录/home/admin/应用目录，不要改
WORKDIR $APPNAME
# 按此处参考的顺序放入需要的文件
COPY . ./$APPNAME
RUN npm install --registry=https://registry.npm.taobao.org
# admin目录权限 - 必须要写
RUN chown -R admin:admin /home/admin/$APPNAME
# 运行启动脚本
CMD ["/bin/bash", "-c" ,"sh /home/admin/$APPNAME/start.sh" ]
EXPOSE 3333