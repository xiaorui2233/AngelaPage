# 视频嵌入说明

本项目的视频嵌入是“显式标记”模式：只有打了标记的链接才会自动嵌入播放器。

## 一、本地视频
使用图片语法即可（页面会自动将视频图片渲染成播放器）：

```md
![视频](/AngelaPage/videos/demo.mp4)
```

支持格式：`mp4`、`webm`、`ogg`

## 二、YouTube / B 站（显式标记）
请用单独一行的 Markdown 链接，并把链接文字写成 `embed` 或 `video`。

```md
[embed](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
```

```md
[embed](https://www.bilibili.com/video/BV1xx411c7mD)
```

也支持带说明的标记：

```md
[embed: 教程视频](https://www.youtube.com/watch?v=xxxx)
[video: B站演示](https://www.bilibili.com/video/BVxxxx)
```

## 三、不会自动嵌入的情况
- 仅仅贴出 URL（不带标记）
- 同一段落里有多条链接
- 链接文字不是 `embed` / `video`

如需嵌入，按上面的标记写法即可。