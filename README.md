<p align="center">
  <br>
  <img src="https://github.com/ConsoleLZ/GrowthGO/blob/main/src/assets/images/logo.png?raw=true" width="90"/>
</p>

<h1 align="center">GrowthGO</h1>
<p>一个帮助你快速开发导航网站的项目，如果你需要记录自己在开发过程中或者学习的时候遇到的一些好的项目或者网站，那么可以尝试使用GrowthGO构建自己的个人导航网站</p>

![示例图片](https://github.com/ConsoleLZ/GrowthGO/blob/main/README/example.png?raw=true)

[在线示例](https://gogo-4gj.pages.dev/)

## 环境要求(以我的为参考)
1. node: v18.15.0
2. python: 3.11.0
3. [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

Visual Studio在安装的时候选择C++即可，确保包含以下组件：

1. MSVC C++ 编译器
2. Windows SDK
3. CMake 工具（可选）

> 注意：后面两个不装在npm i的时候会报错

## 项目启动
1. 安装依赖
```sh
npm i
```

2. 运行
```sh
npm run dev
```

在浏览器中访问：http://localhost:8080/


## 自定义内容
作为普通使用者，你只需要关注如下几个文件：
1. config.yaml（一些网站的配置内容，标题、副标题、头像等）

2. src/data.mjs（网站卡片的所有数据写在这里）
tags变量里面写分类的内容，会自动为你分配路由，mainData是数据，根据我给的示例进行修改即可，注意不要更改字段名

3. gridsome.config.js（网站的SEO，更多配置需要自己去查看gridsome的官网）


## 部署
目前一共支持的部署方式有：
1. Cloudflare（免费）
2. Vercel（免费）
3. Nginx（自己购买云服务器）

前面两种我已经做了适配，网上搜搜教程，直接部署即可

nginx需要增加一个重定向配置（主要解决动态路由问题），打包的时候执行：

```sh
npm run build-nginx
```

dist目录会生成一个nginx-dynamic-routes.conf的文件，内容如下：
```
location /category/ {
  try_files $uri $uri/ /category/_tag.html;
}

```


将此内容复制到nginx配置文件nginx.conf里面即可，配置示例如下：
```

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
        location /category/ {
            try_files $uri $uri/ /category/_tag.html;
        }

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```


## 感谢
1. [Gridsome](https://github.com/gridsome/gridsome)
2. [Element](https://element.eleme.cn/)
3. [IconPark](https://iconpark.oceanengine.com/)
4. [IconFont](https://www.iconfont.cn/)
5. [不蒜子](https://busuanzi.ibruce.info/)
6. [Echarts](https://echarts.apache.org/)
7. 感谢[Cloudflare](https://dash.cloudflare.com/)提供免费静态页面部署
8. [Vercel](https://vercel.com/)