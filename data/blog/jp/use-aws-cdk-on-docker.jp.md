---
title: 'Docker上でAWS CDKを実行する方法'
date: '2022-04-01'
lastmod: '2022-04-01'
tags: ['python', 'CDK', 'Docker', 'AWS']
draft: false
image: ''
images: []
authors: ['default']
---

AWS CDKは、使い慣れたプログラミング言語を使ってAWSのクラウドリソースを定義できる、オープンソースのソフトウェア開発フレームワークです。

しかし、AWS CDKを利用する上で、Pythonなどの環境設定が面倒で、Pythonのバージョン、Node、AWS CLI、AWS CDKなど、両方を指定しなければならないのがややこしいところです。
CDKのバージョンアップが早いし、チームで作業する場合、全員が環境を同期させるのは大変なことなんです。

その際、全員の開発環境を統一するためにDockerを使用することをおすすめです。
Dockerを使用してAWS CDKを実行する方法について説明します。

### 1.Docker、AWS CLIをインストールする
CDKプロジェクトの初期化はコンテナ内で行えるので、NodeやAWS CDK関連のパッケージをローカルにインストールする必要はなく、最低限のDockerとAWS CLIがあればOKです。

```bash
brew install docker awscli
```

### 2.aws configureコマンドでAWS認証情報を設定する。
Dockerは実行時にローカルのAWS認証情報を共有する必要があるため、まずAWS認証を設定する必要があります。

```bash
aws configure

----

AWS Access Key ID [********************]: AWS Access Key IDを入力します。
AWS Secret Access Key [********************]: Secret Access Keyを入力します。
Default region []: AWSリージョンを記入します。
Default output format []: jsonを記入します。
```

### 3.Dockerfileを書く
最初はUbuntuのベースイメージを使って、NodeとPythonのバージョンを分けてインストールしていたのですが、調べてみたら誰かがすでにやっていた...

Dockerfile：
```dockerfile
FROM nikolaik/python-nodejs:python3.9-nodejs14

RUN apt-get update && apt-get install -y curl unzip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && ./aws/install

RUN npm install -g aws-cdk@2.20
```

### 4. Dockerイメージを作る

Dockerを実行する際に、ローカルのAWS認証情報を共有することで、AWS認証情報を再度手動で入力する必要がありません。

4.1 Build image
```bash
docker build -t aws-cdk-python-docker .
```

4.2 Docker run
```bash
docker run --rm -itd -v `pwd`:/app -v ${HOME}/.aws/credentials:/root/.aws/credentials:ro aws-cdk-python-docker
```

4.3 DockerコンテナIDを確認する
```bash
docker ps
```

4.4 Docker execコマンドでDockerコンテナの中に入る
```bash
docker exec -it <container-id> bash
```

### 5. Dockerコンテナ内でAWS CDKプロジェクトを初期化する
コンテナを入力するローカルディレクトリにファイルがない場合、CDKの初期化でエラーが発生しますのでご注意ください。
```bash
cdk init app --language=python
```

正常に実行されると、ローカルディレクトリにも初期化されたCDKファイルがあると思います。
この時点で、Dockerコンテナを一旦終了し、Dockerfileを少し修正します。

### 6. 修改Dockerfile

Docker がイメージを作成する際に、必要なパッケージを自動的にインストールするように、Dockerfile を少し修正します。
```bash

FROM nikolaik/python-nodejs:python3.9-nodejs14

RUN apt-get update && apt-get install -y curl unzip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && ./aws/install

RUN npm install -g aws-cdk@2.20

# 下記のコマンドを追加します。
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

```

### 7. 再度イメージをビルドして、終わり

手順4のdocker buildコマンドを再度実行すると、依存関係が完全なDockerイメージをパッケージ化することができます。

以上

    