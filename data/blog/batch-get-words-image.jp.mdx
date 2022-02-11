---
title: "Pythonを使ってWordの画像を一括抽出する"
date: "2021-01-12"
lastmod: "2021-08-08"
tags: ["python", "word"]
draft: false
image: "/static/images/blog-images/word-image.png"
images:
  ["/static/images/canada/mountains.jpg", "/static/images/canada/toronto.jpg"]
authors: ["default"]
---

最近、仕事の関係で Word から画像を抽出して保存するというニーズがありました。

画像の数が少ない場合は手動でエクスポートしても大丈夫ですが、
大量の画像がある場合、手動で抽出するにはとても時間がかかるため Python でやろうと思いました。

### 1.まず必要なパッケージをインポートする

```python
import zipfile
import shutil
```

### 2.Word の場所及び画像の出力場所を設定し、zipfile で Word ファイルを読み取る

```python
doc_path = './text.docx' #ここで自分のWordファイル場所に切り替える
image_path = './images/' #ここで画像の出力場所に切り替える
doc = zipfile.ZipFile(doc_path)
```

### 3.拡張子に一致する画像を探し、その画像を指定した場所にエクスポートする

```python
for info in doc.infolist():
    if info.filename.endswith((".png", ".jpeg", ".gif")):
        doc.extract(info.filename, image_path)
```

全体はこんな感じです、10 行程度なのでとても便利ですね！

```python
import zipfile
import shutil

doc_path = './text.docx'
image_path = './images/'
doc = zipfile.ZipFile(doc_path)

for info in doc.infolist():
    if info.filename.endswith((".png", ".jpeg", ".gif")):
        doc.extract(info.filename, image_path)
```
