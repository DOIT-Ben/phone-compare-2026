# 2026 旗舰手机对比

纯静态前端项目：`index.html`（144KB）+ `img/`（59 张 WebP，约 1.6MB）+ `sw.js`（离线缓存）。双击 `index.html` 即可运行（需联网加载 GSAP / Chart.js / Fuse.js CDN，离线时自动降级为基础交互）；GitHub Pages 部署后由 Service Worker 提供二次访问秒开与离线可用。

- 数据：内嵌 23 款机型全量数据（2026 新旗舰 + 各品牌上一代精品 + iPhone 18 全系列/Duo/17e/17/Air/16e），同步存于 `2026旗舰手机完整对比.csv`；右上角「导入 CSV」可替换（存 localStorage）。抽屉标题行展示官方发布日期 + 首销日期（厂商不公布生产日期）。
- 功能：三槽机型对比（搜索下拉、差异高亮、仅看差异、列排序、FLIP 动画）、机型卡片栅格（3D 倾斜）、详情抽屉（五视图图库、核心参数、六维雷达、关键数据条形图、充电环形图、优缺点提取）、灯箱（键盘/触摸/惯性滑动）。
- 图片：59 张官方真实产品图（WebP，≤1600px）按需加载，来源见下表；img 内全部声明 width/height（IMG_DIMS 表），加载零布局跳动；图库打开即预加载该机全部视图，卡片悬停预热全图；无真图的机型显示品牌风格 CSS 示意稿并标注「暂无真实图片」；详情页右上角可粘贴图片链接替换（按视图存 localStorage，加载失败自动回退 CSS 稿）。
- 性能：首屏 HTML 144KB（图片拆分为独立 WebP 文件懒加载）；CLS 0.00（Lighthouse/Tracing 实测）；`html.boot` 首帧渐显替代内容突现；滚动条常驻 + `scrollbar-gutter:stable`，任何交互布局零挤压；全屏遮罩/灯箱/弹层不用 backdrop-filter，面板滑动为纯 transform 合成层动画，图表动画 480ms。
- Service Worker（`sw.js`，仅 https 生效）：页面 network-first（始终拿最新版），图片 cache-first（内容不可变，改名即换新）；离线可完整浏览。
- 主题：深色 / 浅色双主题，点击切换按钮以圆形揭示转场扩散（View Transitions API，不支持的浏览器自动退回直切）；Chart.js 配色跟随主题重建；`?theme=light|dark` URL 参数优先级最高；首屏内联脚本防闪白。
- 交互细节：下拉选机即时落槽（状态同步生效，仅按钮高亮渐变作反馈，不做飞行/克隆动画——叠层动画历史上三次出现重影与割裂感，已移除）；抽屉支持向右拖拽手势关闭（跟手，超阈值/高速度甩出）；抽屉内 `↑`/`↓` 切换上一台/下一台机型（内容淡入刷新，不重播面板滑入），`←`/`→` 切换视图；选机、排序、开关均有超时兜底，窗口后台化导致 rAF 冻结时交互不卡死。
- 降级：CDN 脚本异步加载且不阻塞交互（jsdelivr 失败自动切 unpkg，全部失败时仍可正常使用，仅无动画/图表/模糊搜索）。
- 技术栈：原生 ES6 + Web Components + GSAP + Chart.js + Fuse.js + View Transitions + Service Worker，响应式（桌面三列 / 平板两列 / 手机单列）。
- 深链：`index.html#d=m4` 直接打开指定机型详情（id 为 CSV 序号 m1…m23）。

## 图片：59 张真图 / 23 款机型（WebP，按需加载）

| 机型 | 真图视图 | 来源 |
|---|---|---|
| iPhone 18 Pro Max | 主图/正面/背面/细节 | apple.com.cn 官网资产 |
| iPhone 18 Pro | 主图/正面/背面/侧面/细节 | apple.com.cn 对比页 `_large_2x` 渲染图（酒红背+正面配对，左右机裁剪）+ 产品页相机控制帧 + 产品页 3D 背面 |
| iPhone Duo | 主图/正面/背面/侧面/细节 | apple.com.cn 对比页官方渲染图（星光白/夜空色展开内屏）+ 产品页铰链/折叠态/内外屏尺寸帧 |
| iPhone 17e | 主图/正面/背面/细节 | apple.com.cn 对比页渲染图（浅粉背+正面裁剪）+ 产品页三色背面与屏幕帧 |
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

小尺寸源图经 Lanczos 3x 放大 + 锐化（非 AI 超分）；全部统一降采样至 ≤1600px，仓库内为 WebP q80（约 1580KB，较原 JPG 再省约 55%）。`img/*.jpg` 为处理源图，仅保留在本地不入库。视图与文件的对应关系以 `index.html` 内 `DEFAULT_IMGS`（多视图可共用文件）与 `IMG_DIMS`（像素尺寸）为准。GIF/宣传场景图未采用。

## 数据来源（2026-09-30 核验）

- 规格：apple.com.cn/iphone/compare（苹果官方对比页，207 行规格逐项提取：芯片/屏幕/影像/电池/连接/尺寸重量）
- 价格与国行型号：apple.com.cn/shop/buy-iphone/{iphone-duo,iphone-18-pro,iphone-17e} 官方 `fullPrice` JSON（Duo 15999/17999/21499/26499；18 Pro 9999/11999/15499/20499；17e 5299/7299）
- 发布时间：apple.com.cn/newsroom 归档（2026-09-09 发布 iPhone 18 Pro 与 iPhone Duo；09-12 预售、09-18 全球发售；iPhone 17e 见 2026-03-11「现已发售」条目）
- 集中未公开项统一记「Apple未公布」/「未查到」，不用估算值填充
