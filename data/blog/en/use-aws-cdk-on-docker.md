---
title: 'Running AWS CDK on Docker'
date: '2022-04-01'
lastmod: '2022-04-01'
tags: ['python', 'CDK', 'Docker', 'AWS']
draft: false
image: ''
images: []
authors: ['default']
---

AWS CDK is an open source software development framework that allows you to use familiar programming languages to define AWS cloud resources.

But one of the pain points of using AWS CDK is that the environment is very troublesome to build, such as Python, you have to specify both the Python version, and Node, AWS CLI, AWS CDK, etc..
CDK version updates are very fast, and it is a disaster to have everyone synchronize their environments when working in a team.

In this case, you need to use Docker to unify everyone's development environment.
In this article, we will introduce how to use Docker to run AWS CDK.

### 1. Install Docker, AWS CLI locally
The initialization of the CDK project can be done inside the container, so there is no need to install Node and AWS CDK related packages locally, just a minimum of Docker and AWS CLI.

```bash
brew install docker awscli
```

### 2. Configure AWS environment using aws configure command
Docker needs to share the local AWS authentication information when running, so you need to configure AWS authentication first.

```bash
aws configure

----

AWS Access Key ID [********************]: Fill in your AWS Access Key ID
AWS Secret Access Key [********************]: fill in your AWS Secret Access Key
Default region []: Fill in the AWS Region where your AWS account is located
Default output format []: fill in json
```

### 3. Write Dockerfile
At first I used the Ubuntu base image and then installed the specified versions of Node and Python separately, then suddenly I realized that someone had already done it... Dockerfile
Dockerfile.
```dockerfile
FROM nikolaik/python-nodejs:python3.9-nodejs14

RUN apt-get update && apt-get install -y curl unzip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && . /aws/install

RUN npm install -g aws-cdk@2.20
```

### 4. Package the image and run Docker

When running Docker, you can share the local AWS authentication information, so you don't need to enter AWS authentication information manually again.

4.1 Package the image
```bash
docker build -t aws-cdk-python-docker .
```

4.2 Run Docker
```bash
docker run --rm -itd -v `pwd`:/app -v ${HOME}/.aws/credentials:/root/.aws/credentials:ro aws-cdk-python-docker
```

4.3 Checking the Docker container ID
```bash
docker ps
```

4.4 Using the Docker exec command to get inside the Docker container
```bash
docker exec -it <container-id> bash
```

### 5. Initialize the AWS CDK project after entering the Docker container
Be careful not to have any files in the local directory where you enter the container, otherwise the CDK initialization will report an error.
```bash
cdk init app --language=python
```

After running successfully, your local directory will also have the initialized CDK file, so let's exit the Docker container and modify the Dockerfile a little.

### 6. Modify Dockerfile

In order to make Docker automatically install the required packages when it makes the image, we modify the Dockerfile a little bit
```bash

FROM nikolaik/python-nodejs:python3.9-nodejs14

RUN apt-get update && apt-get install -y curl unzip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && . /aws/install

RUN npm install -g aws-cdk@2.20

# Add the following two lines of command
COPY requirements.txt . /RUN
RUN pip3 install -r requirements.txt

```

### 7. Package the image again, done

When you run the docker build command in step 4 again, you will be able to package a Docker image with complete dependencies

