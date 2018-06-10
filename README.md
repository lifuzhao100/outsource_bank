# 环境要求
## Nodejs 8.0以上版本
# 开发
#### 注意点
- src是项目的源代码
- build是项目构建后的代码(部署到服务器上的代码)
- build文件夹下的代码不能通过file://访问，请使用http(s)协议访问
- 不可以直接在build文件夹下修改代码(因为在执行npm run build之后，会删掉build文件夹重新生成)
- 需要修改代码的话，请在src文件夹中修改，再执行npm run build，然后把代码部署到服务器上
- npm安装依赖包的速度可能较慢，可安装yarn(https://yarn.bootcss.com/)，或者选择科学上网
## 开始开发
1.首次进行开发，请先安装项目依赖的包。打开控制台，(切换到项目根目录 !important)，在控制台执行
```markdown
  npm install
```
2.在安装完成后，执行npm run dev 开始开发
```markdown
  npm run dev
```
当控制台提示compile successful时，在浏览器打开
* localhost:7000/build/index.html(移动端页面)
* localhost:7000/build/cms/index.html(pc端页面)
> 
如果不喜欢这个端口，或者端口被占用，可以在项目根目录下config/dev.js中修改
# 部署
### Node服务器端要求
在启动Node服务前，请先在服务器中的项目根目录中执行
```markdown
  npm install koa koa-static-cache --save
```
>
项目采用前后端分离的开发方式，后端使用PHP提供数据服务，前端使用Node提供静态文件
>
这里主要介绍Node服务部署，Node服务端口默认7500,如需修改，请在server.js中修改。生效请参考下方说明
>
推荐使用pm2来管理Node服务进程(https://github.com/Unitech/pm2)
```markdown
  npm install --global pm2
```
在项目根目录下执行
```markdown
  //这里可以自定义app_name,在后面会用到
  pm2 start server.js --name='app_name' 
```
可使用查看进程信息
```markdown
  //app_name跟上面定义的一致

  //Display logs for a specific app
  pm2 list app_name
  //Show all information about application
  pm2 show app_name
```
当修改Node服务的代码时(目前只有项目根目录下的server.js)，且需要其生效时，可执行
```markdown
  pm2 reload app_name
```
停止Node服务，可执行
```markdown
  pm2 stop app_name
```
删除Node服务
```markdown
  pm2 delete app_name
```
# 其他相关
如果需要把某些文件复制到build文件夹中，请不要手动复制到build中，请先复制到copy-to-build,再执行
```markdown
  npm run build
```
### 公众号配置appid
copy-to-build文件下的wx_config.js可以修改公众号的appId。修改后请执行npm run build才能生效
```markdown
  npm run build
```