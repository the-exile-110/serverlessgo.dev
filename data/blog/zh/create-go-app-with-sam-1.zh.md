---
title: '使用SAM, Go Fiber创建基于AWS Lambda的高性能应用 (一) -- 搭建基本框架'
date: '2021-01-12'
lastmod: '2021-08-08'
tags: ['Golang', 'SAM', 'Serverless', 'Lambda']
draft: true
image: '/static/images/blog-images/create-go-app-with-sam/title.svg'
images: ['/static/images/canada/mountains.jpg', '/static/images/canada/toronto.jpg']
authors: ['default']
---

本篇文章介绍了如何使用 SAM, Go Fiber 创建基于 AWS Lambda 的高性能应用

## 1. 什么是 SAM, 为什么要使用 SAM

[AWS SAM](https://aws.amazon.com/cn/serverless/sam 'SAM') (Serverless Application Model), 是一个用于构建无服务器应用的开源框架，供速记语法来表达函数、API、数据库和事件源映射。只需几行代码即可快速创建资源。

在部署过程中 SAM 会把定义文件转化为 AWS CloudFormation 语法，可以快速地构建 Serverless 应用，也是功能最为全面的框架。

使用 SAM CLI 还可以方便的在本地测试应用和构建持续集成和部署（CI/CD）管道。

类似的快速构建 Serverless 应用框架有 [Chalice](https://aws.github.io/chalice)，不过目前还不支持 Lambda 的镜像部署。

## 2. 为什么选择 Go 语言构建 Serverless 应用

在 Serverless 的世界里，性能和冷启动是很重要的指标之一，因为程序的运行时间=费用，

消耗更少的内存，更短的冷启动和运行时间不仅能够提升用户体验，还能节省大量成本。

AWS Lambda 目前支持多种语言，其中 Go 语言对比其他语言在性能，冷启动，稳定性，开发效率(web)上都有非常不错的水准。

具体数据可以参考这位博主的性能测试 [AWS Lambda battle 2021: performance comparison for all languages (cold and warm start) | by Aleksandr Filichkin | Medium](https://filia-aleks.medium.com/aws-lambda-battle-2021-performance-comparison-for-all-languages-c1b441005fd1)

而 Fiber 是性能最好的 Go Web 框架之一，所以本篇文章采用 Fiber 来构建后端应用。

## 3. 搭建环境(MacOS/Linux)

创建 SAM 应用的环境需要满足以下条件：

- SAM CLI
- AWS CLI
- 配置 AWS 认证信息
- Docker (推荐)

1. 安装 Homebrew

   ```shell
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   验证安装

   ```shell
   brew --version
   ```

2. 安装 AWS CLI

   ```shell
   brew install awscli
   ```

   验证安装

   ```shell
   aws --version
   ```

3. 安装 SAM CLI

   ```shell
   brew tap aws/tap
   brew install aws-sam-cli
   ```

   验证安装

   ```shell
   sam --version
   ```

4. 设置 AWS CLI 的默认环境

   ```shell
   aws configure
   ```

5. 安装 Go

   ```shell
   brew install go
   ```

   验证安装

   ```shell
   go version
   ```
