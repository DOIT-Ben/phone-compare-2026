# 2026 旗舰手机对比

纯静态前端项目：`index.html`（140KB）+ `img/`（77 张 WebP，约 2.2MB）+ `sw.js`（离线缓存）。双击 `index.html` 即可运行（需联网加载 GSAP / Chart.js / Fuse.js CDN，离线时自动降级为基础交互）；GitHub Pages 部署后由 Service Worker 提供二次访问秒开与离线可用。

- 数据：内嵌 23 款机型全量数据（2026 新旗舰 + 各品牌上一代精品 + iPhone 18 全系列/Duo/17e/17/Air/16e），同步存于 `2026旗舰手机完整对比.csv`；右上角「导入 CSV」可替换（存 localStorage）。抽屉标题行展示官方发布日期 + 首销日期（厂商不公布生产日期）。
- 功能：三槽机型对比（搜索下拉、差异高亮、仅看差异、列排序、FLIP 动画）、机型卡片栅格（3D 倾斜）、详情抽屉（五视图图库、核心参数、六维雷达、关键数据条形图、充电环形图、优缺点提取）、灯箱（键盘/触摸/惯性滑动）。
- 图片：77 张官方真实产品图（WebP，≤1500px）按需加载；**22/23 款机型有真实主图**（唯一例外是未发布的华为 Mate 90 系列，显示品牌风格 CSS 示意稿并标注「暂无真实图片」）。img 内全部声明 width/height（IMG_DIMS 表），加载零布局跳动；图库打开即预加载该机全部视图，卡片悬停预热全图；详情页右上角可粘贴图片链接替换（按视图存 localStorage，加载失败自动回退 CSS 稿）。
- 性能：首屏 HTML 140KB（图片拆分为独立 WebP 文件懒加载）；CLS 0.00（Lighthouse/Tracing 实测）；`html.boot` 首帧渐显替代内容突现；滚动条常驻 + `scrollbar-gutter:stable`，任何交互布局零挤压；全屏遮罩/灯箱/弹层不用 backdrop-filter，面板滑动为纯 transform 合成层动画，图表动画 480ms。
- Service Worker（`sw.js`，仅 https 生效）：页面 network-first（始终拿最新版），图片 cache-first（内容不可变，改名即换新）；离线可完整浏览。
- 主题：深色 / 浅色双主题，点击切换按钮以圆形揭示转场扩散（View Transitions API，不支持的浏览器自动退回直切）；Chart.js 配色跟随主题重建；`?theme=light|dark` URL 参数优先级最高；首屏内联脚本防闪白。
- 交互细节：下拉选机即时落槽（状态同步生效，仅按钮高亮渐变作反馈，不做飞行/克隆动画——叠层动画历史上三次出现重影与割裂感，已移除）；抽屉支持向右拖拽手势关闭（跟手，超阈值/高速度甩出）；抽屉内 `↑`/`↓` 切换上一台/下一台机型（内容淡入刷新，不重播面板滑入），`←`/`→` 切换视图；选机、排序、开关均有超时兜底，窗口后台化导致 rAF 冻结时交互不卡死。
- 降级：CDN 脚本异步加载且不阻塞交互（jsdelivr 失败自动切 unpkg，全部失败时仍可正常使用，仅无动画/图表/模糊搜索）。
- 技术栈：原生 ES6 + Web Components + GSAP + Chart.js + Fuse.js + View Transitions + Service Worker，响应式（桌面三列 / 平板两列 / 手机单列）。
- 深链：`index.html#d=m4` 直接打开指定机型详情（id 为 CSV 序号 m1…m23）。
- 已知缺口：m2 iPhone 17 Pro Max 无「正面」帧、m13 iPhone 17 无「侧面」帧、m15 iPhone 16e 无「背面」（机型页已下架且 Wayback 超时）；m6/m8/m9/m15/m17/m18/m19 为官网仅存单图机型，其余视图显示 CSS 示意稿。

## 图片：77 张真图 / 23 款机型（WebP，按需加载）

| 机型 | 真图视图 | 来源 |
|---|---|---|
| iPhone 18 Pro Max | 五视图全 | apple.com.cn 对比页 + 官网产品页 `_large_2x`（含相机控制侧面） |
| iPhone 18 Pro | 五视图全 | apple.com.cn 对比页渲染图（酒红背+正面配对裁剪）+ 产品页相机控制/镜头模组 |
| iPhone Duo | 五视图全 | apple.com.cn 对比页官方渲染图（星光白/夜空色展开内屏）+ 产品页铰链/折叠态/内外屏尺寸 |
| iPhone 17e | 五视图全 | apple.com.cn 对比页渲染图（浅粉配对裁剪）+ 产品页三色背面/屏幕/保护壳 |
| iPhone 17 Pro Max | 主图/背面/侧面/细节 | apple.com.cn 版本化 CDN（星宇橙/底部侧面/超瓷晶） |
| iPhone 17 Pro | 五视图全 | apple.com.cn CDN（页面已下架，经 Wayback 提取 paths；深蓝背 `colors_blue_2x`） |
| iPhone 17 | 主图/正面/背面/细节 | apple.com.cn 官网产品页（薰衣草紫等 product-viewer 帧） |
| iPhone Air | 五视图全 | apple.com.cn 官网产品页（color_static 背面 + 超瓷晶正面帧） |
| iPhone 16e | 主图/正面 | apple.com.cn CDN（经 Wayback 提取路径） |
| 荣耀 Magic9 Pro Max | 五视图全 | honer.com 产品页 CDN + 百度百科（官方前后双机主图） |
| 荣耀 Magic8 Pro | 主图/背面/侧面/细节 | 百度百科（配色阵列主图 + 侧面手持）+ GSMArena |
| 小米 18 Pro Max | 主图/背面/细节 | 百度百科（官方手持正背双机）+ GSMArena + 百度百科 |
| 小米 17 Pro Max | 主图/正面/背面 | 百度百科（官方风格渲染图裁剪） |
| iQOO 16 | 主图/正面/背面/细节 | vivo 官网官方 KV（`cn-exstatic-vivofs.iqoo.com`）+ 百度百科背面特写 |
| iQOO 15 | 主图/背面 | 百度百科（官方手持背面）+ GSMArena |
| 红米 K100 Pro Max | 主图/背面 | 百度百科（官方背面渲染） |
| 红米 K90 Pro Max | 主图/背面 | GSMArena bigpic（主图/背面同源，官方渲染） |
| 华为 Mate 80 Pro Max | 五视图全 | huawei.com DAM 图库 |
| 华为 Mate 70 Pro+ | 主图/正面/背面/细节 | 百度百科（官方前后配对裁剪）+ GSMArena + huawei.com |
| 一加 16 | 主图/背面 | GSMArena bigpic（官方预热渲染） |
| 一加 15 | 主图/背面 | 百度百科（官方沙丘金海报）+ GSMArena |
| 一加 13 | 主图/背面 | 百度百科（官方三机展示 + 黑色背面） |
| 华为 Mate 90 | 无官方图（2026-10-01 发布） | 保留 CSS 示意稿 |

小尺寸源图经 Lanczos 3x 放大 + 锐化（非 AI 超分）；全部统一降采样至 ≤1500px，仓库内为 WebP q78-84（约 2236KB）。`img/*.jpg` 为处理源图，仅保留在本地不入库。视图与文件的对应关系以 `index.html` 内 `DEFAULT_IMGS`（多视图可共用文件）与 `IMG_DIMS`（像素尺寸）为准。GIF/宣传场景图未采用（人物/海报类官方图仅在没有纯产品图时使用）。

## 数据与图片来源（2026-09-30 核验）

- 苹果规格：apple.com.cn/iphone/compare（官方对比页，207 行规格逐项提取：芯片/屏幕/影像/电池/连接/尺寸重量）
- 苹果价格与国行型号：apple.com.cn/shop/buy-iphone/{iphone-duo,iphone-18-pro,iphone-17e} 官方 `fullPrice` JSON（Duo 15999/17999/21499/26499；18 Pro 9999/11999/15499/20499；17e 5299/7299）
- 苹果发布时间：apple.com.cn/newsroom 归档（2026-09-09 发布 iPhone 18 Pro 与 iPhone Duo；09-12 预售、09-18 全球发售；iPhone 17e 见 2026-03-11「现已发售」条目）
- 苹果图片：产品页/对比页资源换 `_large_2x` 后缀取 2 倍图；已下架机型（17 Pro/16e）经 Wayback CDX 取资源路径（CDN 资源本体仍有效）；配对图（背+正面）按列覆盖度定位中线裁成单机视图
- 国产图片：百度百科词条图（浏览器同源 fetch 绕过 403，`bkimg.cdn.bcebos.com/pic/<hash>?x-bce-process=…,w_1600`）、vivo 官网 KV、GSMArena `cdn2.gsmarena.com/vv/bigpic/<slug>.jpg`（160×212 经 3x 放大）
- 苹果电池（2026-09-30 补录）：果粉查询 guofenchaxun.com `/devices/params/battery/<slug>`（引 HubWeb.cn，工信部口径：额定容量、双电芯拆分、能量 Wh、标称/限制电压、电池型号与电芯厂、官方视频/流媒体续航）。9 款真实容量：18 Pro Max 5391mAh（带SIM）/5567mAh（无SIM）、17 Pro Max 4823/5088mAh、17 Pro 3988/4252mAh、18 Pro 4056/4288mAh、iPhone 17 3692mAh、Air 3149mAh、16e 与 17e 4005mAh、Duo 4883mAh（双电芯 2962+1921，19.073Wh）
- 苹果内存与 Geekbench 6：NanoReview 机型页（引 Geekbench 数据库均值）——17 Pro Max 12GB·3940/10434、17 Pro 12GB·3992/10688、iPhone 17 8GB·3736/9226、Air 12GB·4044/11101、16e 8GB·3281/8035、18 Pro 12GB·4719/12677、Duo 12GB·4731/13202、17e 8GB·3595/9245、18 Pro Max 12GB（GB6 4737/12677 见 IT之家）
- 苹果官方规格补充：apple.com.cn 技术规格页（17 与 Air 现行；17 Pro 与 16e 官方页已下架，经 Wayback 2026-07/2026-01 存档取用）——典型/HDR/户外峰值亮度、超瓷晶面板代数（17 全系正面超瓷晶 2）、扬声器（iPhone Air 官方为「内置扬声器」单扬，非立体声）、广色域 P3、4K 杜比视界帧率、官方视频续航（17 30h/27h、17 Pro 31h/28h、Air 27h/22h、16e 26h/21h/音频90h）、MagSafe/Qi2 15W、20W/40W 快充口径、NPU（A19/A19 Pro/A18 均 16 核）
- 苹果国行型号：Apple 支持文档 support.apple.com/zh-cn/108044（按「（中国大陆）」条目）——18 Pro Max A3718、18 Pro A3715、17 Pro Max A3527、17 Pro A3524、iPhone 17 A3521、Air A3518、17e A3635、16e A3410（此前 18 Pro Max 与 17 Pro Max 行的型号有串号，本轮修正）
- 反向充电：Apple 支持文档口径——iPhone 15 及后续 USB-C 反向有线充电最高 4.5W，无反向无线充电
- 仍未公开项（苹果不披露）：触控采样率、调光方式、发光材料、护眼认证、独立影像芯片型号、游戏实测、充满时间；集中统一记「Apple未公布」/「未查到」，不用估算值填充
