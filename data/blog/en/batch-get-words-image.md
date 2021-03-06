---
title: 'Using Python batch extraction of Word documents in the image'
date: '2021-01-12'
lastmod: '2021-08-08'
tags: ['python', 'word']
draft: false
image: '/static/images/blog-images/word-image.png'
images: ['/static/images/canada/mountains.jpg', '/static/images/canada/toronto.jpg']
authors: ['default']
---

Recently, I had to extract images from a Word document and save them due to work requirements.

Although the number of images is small, you can extract them manually, but if there are a lot of images in the word file, it will be very time-consuming, so here is a good way to share.

### 1.Importing the required packages

```python
import zipfile
import shutil
```

### 2.Set the document path and image path and use zipfile to read Word files

```python
doc_path = './text.docx' # Change you word file path
image_path = './images/' # Change you iamges path
doc = zipfile.ZipFile(doc_path)
```

### 3.Find the matching image file and copy the image file to the directory you specify, done!

```python
for info in doc.infolist():
    if info.filename.endswith((".png", ".jpeg", ".gif")):
        doc.extract(info.filename, image_path)
```

Full Code

```python
import zipfile
import shutil

doc_path = './text.docx' # Change you word file path
image_path = './images/' # Change you iamges path
doc = zipfile.ZipFile(doc_path)

for info in doc.infolist():
    if info.filename.endswith((".png", ".jpeg", ".gif")):
        doc.extract(info.filename, image_path)
```
