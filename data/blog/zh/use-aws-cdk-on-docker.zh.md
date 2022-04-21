---
title: '在Docker上运行AWS CDK'
date: '2022-04-01'
lastmod: '2022-04-01'
tags: ['python', 'CDK', 'Docker', 'AWS']
draft: false
image: ''
images: []
authors: ['default']
---

AWS CDK是一种开源软件开发框架，可以使用熟悉的编程语言来定义AWS云资源。

但是使用AWS CDK有一个痛点就是环境搭建很麻烦，比如Python，既要指定Python版本，又要指定Node，AWS CLI，AWS CDK等等。
CDK版本更新又特别快，团队合作时让所有人同步环境简直就是灾难。

这种情况就需要用到Docker来统一大家的开发环境。
本文将介绍如何使用Docker来运行AWS CDK。

### 1.在本地安装Docker, AWS CLI
CDK项目的初始化可以在容器内完成，所以本地无需安装Node和AWS CDK相关的包，只需要最低限度的Docker和AWS CLI即可。

```bash
brew install docker awscli
```

### 2.使用aws configure命令配置AWS环境
Docker运行时需要共享本地的AWS认证信息，所以需要先配置AWS认证。

```bash
aws configure

----

AWS Access Key ID [********************]: 填写你的AWS Access Key ID
AWS Secret Access Key [********************]: 填写你的AWS Secret Access Key
Default region []: 填写你AWS账号所在的AWS Region
Default output format []: 填写json
```

### 3.编写Dockerfile
一开始我是使用Ubuntu的基础镜像然后再分别安装指定版本的Node和Python，然后突然发现有人已经做好了...、
Dockerfile：
```dockerfile
FROM nikolaik/python-nodejs:python3.9-nodejs14

RUN apt-get update && apt-get install -y curl unzip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && ./aws/install

RUN npm install -g aws-cdk@2.20
```

### 4. 打包镜像，运行Docker

运行Docker时，可以共享本地的AWS认证信息，这样就无需再次手动输入AWS认证信息了。

4.1 打包镜像
```bash
docker build -t aws-cdk-python-docker .
```

4.2 运行Docker
```bash
docker run --rm -itd -v `pwd`:/app -v ${HOME}/.aws/credentials:/root/.aws/credentials:ro aws-cdk-python-docker
```

4.3 查看Docker容器ID
```bash
docker ps
```

4.4 使用Docker exec命令进入Docker容器内部
```bash
docker exec -it <container-id> bash
```

### 5. 进入Docker容器内部后初始化AWS CDK项目
要注意进入容器时所在的本地目录里不要有文件，否则CDK初始化会报错。
```bash
cdk init app --language=python
```

运行成功后，你所在的本地目录也会有初始化好的CDK文件，这时我们先退出Docker容器，稍微修改一下Dockerfile。

### 6. 修改Dockerfile

为了让Docker制作竟像时自动安装所需要的包，我们稍微修改一下Dockerfile
```bash

FROM nikolaik/python-nodejs:python3.9-nodejs14

RUN apt-get update && apt-get install -y curl unzip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && ./aws/install

RUN npm install -g aws-cdk@2.20

# 添加以下两行命令
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

```

### 7. 再次打包镜像，完成

再次运行第四步的docker build命令时就能打包一个有完整依赖的Docker镜像了

    