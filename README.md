# TRAVTHRU

中文马来西亚包车网站，使用 Vite 与原生 JavaScript。支持桌面及移动端。

## 开发

环境已提供 Node.js 24、npm 与 `/usr/bin/chromium`。

```sh
cd /workspace/TRAVTHRU
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --port 5173
```

```sh
npm run build
npm test
```

Playwright 默认使用系统 Chromium。其他机器可设置 `CHROMIUM_PATH` 指向已安装的 Chromium。无需下载 Playwright 浏览器。

## 实现

- 原生滚动驱动的车辆揭幕、镜头推进、座舱到目的地的三段场景；滚动可以逆向回放。
- SVG 气流路线、场景展开、视差、滚动进度。遵循 `prefers-reduced-motion`。
- 5 / 6 / 7 / 10 / 16 座及巴士分类；MPV 可切换 Alphard/Vellfire 与 Innova；支持触控拖动、箭头及键盘。
- 行程表单校验、摘要、复制与下载。通过用户主动点击的 WhatsApp 链接携带摘要，不自动发送消息或确认订单。
- 原站 Logo、电话、邮件及地址；Google Maps 为真实地址的搜索链接，未编造 Place ID。
- 字体、图片本地提供，不依赖用户浏览时访问外部图片或字体服务。

## 内容与素材来源

2026-10-27 从 https://www.travthru.com/ 的公开页面及公开前端资源核对：

- 电话及 WhatsApp：+60 10-719 8186
- 邮箱：travethru@gmail.com（保留原站拼写）
- 地址：Lot 302 Pertama Complex, Jalan Tuanku Abdul Rahman, Chow Kit, 50100 Kuala Lumpur, Malaysia
- `logo.svg`、`logo-mark.png` 与 `cabin-*.webp`、`innova.webp` 来自原官网公开资源。
- `hero-bronze.png`、`covered-bronze.png`、`fleet.png` 与 `destinations.png` 为生成的概念展示图片，不作为实际车队年份、配置或可用库存的证明。
- 四段用户视频仅作为风格与交互参考，没有把参考站的视频、标志或代码嵌入本站。

## 仍需制作或确认

当前揭幕是图片合成与滚动遮罩，场景为 DOM/SVG 动画；不是参考视频中的真实布料模拟与 360° 车辆 3D 环绕。达到该精度需要正确的 2026 Alphard 三维模型、材质及布料/镜头动画制作。当前主图不标注未经确认的车型年份。

请在上线前确认车型座位数（当前按含驾驶座的车型分类展示）、行李容量、2026 年款库存、报价、条款与原站联系资料是否仍有效。当前没有支付、后台库存或自动派单系统。

外部 WhatsApp、电话、邮箱和地图链接已配置；未代用户发送咨询。实际部署与域名切换尚未执行。

## 中文与 English

右上角的 `EN / 中文` 按钮切换全站语言。`?lang=en` 与 `?lang=zh` 可直接打开指定语言。选择保存在浏览器，表单输入不会因切换语言而丢失。下拉框保留稳定的内部值，界面、车辆说明、无障碍标签、隐私说明与 WhatsApp 行程摘要按当前语言显示。用户自己输入的行程内容不自动翻译。

## 发布 Demo

`vercel.json` 已设置 Vite 构建与响应头。可将本仓库导入自己的 Vercel 项目生成预览域名，不需要修改旧官网 DNS。

`.github/workflows/site.yml` 在 `main` 推送后依次执行四项中文/英文桌面与移动测试、生产构建及 GitHub Pages 发布。仓库 Settings → Pages 的 Source 必须先设为 **GitHub Actions**，并且账号/仓库套餐允许使用 Pages。工作流不会修改旧官网域名。

Vite 使用相对资源路径，支持部署在 GitHub Pages 的仓库子路径。当前环境的本地开发地址不能作为公网链接；只有托管平台返回并实际访问验证成功的地址才是在线 Demo。

## 开场与快捷预约

新标签页首次打开时先展示公司名称与原站 Logo，再通过信封展开动画呈现快捷预约面板。可跳过开场、关闭面板、按 Escape 或向下滚动收起；当前标签页不会反复打断用户，页脚的「重播开场 / Replay intro」可重新查看。减少动态效果的系统设置会缩短开场并跳过信封动画。

快捷面板支持点对点接送与按时包车、交换路线、日期/时间、乘客及行李数量。提交会将需求带入主行程表单，不会查询或虚构实时库存/价格，也不会自动创建订单。日期时间按马来西亚出行计划填写。浏览器只在 sessionStorage 中保存开场是否展示的标记，不保存个人行程资料。

## 页脚品牌标识

付款展示包含 TNG eWallet 字标、Stripe、American Express、Visa、Mastercard 与现金；仅展示品牌，不包含支付表单、交易或网关集成。具体付款安排由客服确认。社交区按参考图展示 Instagram、Facebook、YouTube、LinkedIn 与 X，未设置账号链接。

品牌 SVG 来自 Simple Icons（https://simpleicons.org，Amex/Visa 及社交图标来自 npm 16.36.0，LinkedIn 来自 13.21.0）。品牌名称与标志归各自权利人所有；TNG 为文字识别徽标，现金为界面图形。

Stripe 字标来自 Font Awesome Free 7.3.1（https://fontawesome.com，图标 CC BY 4.0），许可文本保留在 public/images/brands/FONT-AWESOME-LICENSE.txt。

手势气流通过装饰 Canvas 响应鼠标移动、原生滚动与手机触控，不拦截点击或滚动。启用系统减少动态效果设置时停用，页面不可见或流线消散后停止绘制。

Hero 与揭幕配对图已依用户参考车辆改为铜色 Alphard 风格（黑色格栅、深色轮毂与低趴包围）。新文件名用于避免旧主图缓存。图像为概念展示，不代表已确认的实际库存。
