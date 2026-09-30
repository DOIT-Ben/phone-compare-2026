# 2026 旗舰手机对比页

单文件前端项目：双击 `index.html` 即可运行（需联网加载 GSAP / Chart.js / Fuse.js CDN，离线时自动降级为基础交互）。

- 数据：内嵌 20 款机型全量数据（2026 新旗舰 + 各品牌上一代精品 + iPhone 17 全系列/Air/16e），同步存于 `2026旗舰手机完整对比.csv`；右上角「导入 CSV」可替换（存 localStorage）。抽屉标题行展示官方发布日期 + 首销日期（厂商不公布生产日期）。
- 功能：三槽机型对比（搜索下拉、差异高亮、仅看差异、列排序、FLIP 动画）、机型卡片栅格（3D 倾斜）、详情抽屉（五视图图库、核心参数、六维雷达、关键数据条形图、充电环形图、优缺点提取）、灯箱（键盘/触摸/惯性滑动）。
- 图片：优先使用 `img/` 下的真实官网原图（5 款已接入，来源见下表），无真图的机型显示品牌风格 CSS 示意稿并标注「暂无真实图片」；详情页右上角可粘贴图片链接替换（按视图存 localStorage，加载失败自动回退 CSS 稿）。
- 主题：深色 / 浅色双主题，头部按钮切换，localStorage 记忆；Chart.js 配色跟随主题重建；`?theme=light|dark` URL 参数优先级最高；首屏内联脚本防闪白。
- 降级：CDN 脚本异步加载且不阻塞交互（jsdelivr 失败自动切 unpkg，全部失败时仍可正常使用，仅无动画/图表/模糊搜索）；动画回调均有超时兜底，窗口后台化导致 rAF 冻结时交互不卡死。
- 技术栈：原生 ES6 + Web Components + GSAP + Chart.js + Fuse.js，响应式（桌面三列 / 平板两列 / 手机单列）。
- 深链：`index.html#d=m4` 直接打开指定机型详情（id 为 CSV 序号 m1…m10）。

## 图片：共 45 张真图 / 20 款机型，全部 base64 内联进 index.html（单文件自包含，路径问题根治）

| 机型 | 真图视图 | 来源 |
|---|---|---|
| iPhone 18 Pro Max | 主图/正面/背面/细节 | apple.com.cn 官网资产 |
| iPhone 17 Pro Max | 主图/背面/侧面/细节 | apple.com.cn 版本化 CDN（星宇橙/底部侧面/超瓷晶） |
| iPhone 17 Pro | 主图(深蓝)/正面/侧面/细节 | apple.com.cn CDN（页面已下架，资源路径仍有效） |
| iPhone 17 | 主图/正面/背面/细节 | apple.com.cn 官网产品页（薰衣草紫等 product-viewer 帧） |
| iPhone Air | 主图/侧面(手持薄边)/细节(顶边) | apple.com.cn 官网产品页 |
| iPhone 16e | 主图(白)/正面(裁剪) | apple.com.cn CDN（经 Wayback 提取路径） |
| 荣耀 Magic9 Pro Max | 正面/背面/侧面/细节 | honor.com 产品页 CDN |
| 荣耀 Magic8 Pro | 背面/细节(圆环相机特写) | GSMArena 图库 + honor.com CDN |
| 小米 18 Pro Max | 背面/细节(徕卡手持) | GSMArena 图库 + 百度百科 |
| 小米 17 Pro Max | 主图(官方绿)/正面/背面(紫) | 百度百科（官方风格渲染图裁剪） |
| iQOO 16 | 背面/正面 | vivo.com.cn 官网 |
| iQOO 15 | 背面(传奇红) | GSMArena 图库 |
| 红米 K100 Pro Max | 背面(赤霞珠红) | GSMArena 图库 |
| 红米 K90 Pro Max | 背面 | GSMArena 图库 |
| 华为 Mate 80 Pro Max | 五视图全 | huawei.com DAM 图库 |
| 华为 Mate 70 Pro+ | 背面/细节 | GSMArena 图库 + huawei.com |
| 一加 15 | 背面(沙丘金) | GSMArena 图库 |
| 一加 16 | 背面(雾光紫) | GSMArena 图库（官方预热渲染） |
| 一加 13 | 背面(蓝调时刻) | GSMArena 图库 |
| 华为 Mate 90 | 无官方图（2026-10-01 发布） | 保留 CSS 示意稿 |

小尺寸源图经 Lanczos 3x 放大 + 锐化（非 AI 超分）。GIF/宣传场景图未采用。
