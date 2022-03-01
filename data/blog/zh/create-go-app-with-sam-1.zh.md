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

## 什么是 SAM, 为什么要使用 SAM

[AWS SAM](https://aws.amazon.com/cn/serverless/sam "SAM") (Serverless Application Model),  是一个用于构建无服务器应用的开源框架，供速记语法来表达函数、API、数据库和事件源映射。只需几行代码即可快速创建资源。

在部署过程中SAM会把定义文件转化为AWS CloudFormation语法，可以快速地构建Serverless应用，也是功能最为全面的框架。

类似的快速构建Serverless应用框架有 [Chalice](https://aws.github.io/chalice)，不过目前还不支持Lambda的镜像部署。$ $

## 为什么选择Go语言构建Serverless应用

AWS Lambda目前支持多种语言，其中Go语言对比其他语言在性能，冷启动，稳定性，开发效率(web)上都有非常不错的水准。

具体数据可以参考这位博主的性能测试 [AWS Lambda battle 2021: performance comparison for all languages (cold and warm start) | by Aleksandr Filichkin | Medium](https://filia-aleks.medium.com/aws-lambda-battle-2021-performance-comparison-for-all-languages-c1b441005fd1)

在Serverless世界

而Fiber是性能最好的Go Web框架之一，所以本篇文章采用

AWS无服务器应用模型（SAM）是一个用于构建无服务器应用的开源框架。它提供速记语法来表达函数、API、数据库和事件源映射。每个资源只需几行，你就可以定义你想要的应用，并使用YAML建模。在部署过程中，SAM将SAM语法转化并扩展为AWS CloudFormation语法，使您能够更快地构建无服务器应用程序。

要开始构建基于SAM的应用程序，请使用AWS SAM CLI。SAM CLI提供了一个类似Lambda的执行环境，使您能够在本地构建、测试和调试由SAM模板或通过AWS云开发工具包（CDK）定义的应用程序。您还可以使用SAM CLI将您的应用程序部署到AWS，或创建安全的持续集成和部署（CI/CD）管道，遵循最佳实践并与AWS的本地和第三方CI/CD系统集成。
SAM和SAM CLI是在Apache 2.0许可下开源的。你可以在GitHub上为SAM或SAM CLI贡献新的功能和改进。
