#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
#npm run build

npm run zip


# cd 到构建输出的目录下
#cd dist
#cd C:\\Users\\zhouxianfu\\Desktop\\git\\zmio


#npm -v
#git st
#git add .
#git commit -m "deploy"
#git push

# 部署到自定义域域名
# echo 'www.example.com' > CNAME


# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

#cd E:\\dev\\wk-bi

node -v

cd -