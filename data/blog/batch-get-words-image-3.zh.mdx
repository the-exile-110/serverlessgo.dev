---
title: '使用Python批量提取Word文档中的图片'
date: '2021-01-12'
lastmod: '2021-08-08'
tags: ['python', 'word']
draft: false
image: '/static/images/blog-images/word-image.png'
images: ['/static/images/canada/mountains.jpg', '/static/images/canada/toronto.jpg']
authors: ['default']
---

最近由于工作需要，要把在 Word 文档中的图片提取出来后保存。

如果是几张图片的话还好，但是面对文档中含有大量图片 + 页数的时候手动提取就很费时间。

所以在这里分享一个不错的方法，

### 1.导入需要的包

```python
import zipfile
import shutil
```

### 2.设置文档路径和图片路径 ，并用 zipfile 读取 Word 文件

```python
doc_path = './text.docx' # 在这里更换你想要的路径
image_path = './images/' # 在这里更换你想要的路径
doc = zipfile.ZipFile(doc_path)
```

### 3.查找匹配图片文件，并将图片文件复制到你指定的目录，完事儿！

```python
for info in doc.infolist():
    if info.filename.endswith((".png", ".jpeg", ".gif")):
        doc.extract(info.filename, image_path)
```

完整代码：

```python
import zipfile
import shutil

doc_path = './text.docx' #在这里更换你想要的路径
image_path = './images/' #在这里更换你想要的路径
doc = zipfile.ZipFile(doc_path)

for info in doc.infolist():
    if info.filename.endswith((".png", ".jpeg", ".gif")):
        doc.extract(info.filename, image_path)
```
