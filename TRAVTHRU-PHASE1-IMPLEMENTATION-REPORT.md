# Travthru 第一階段 Chauffeur Service SEO 修復交付

日期：2026-11-16（Asia/Kuala_Lumpur）。狀態：工作區實作與預覽，**未推送、未部署正式站**。分支：fix/phase1-chauffeur-20261116。

## 備份與範圍

修改前基準：9e77df285e85a66ce4a094f4a9b5537f65efd6e6。

備份分支：backup/phase1-chauffeur-20261116。完整 Git bundle：/workspace/work/travthru-audit/travthru-before-phase1.bundle，git bundle verify 通過。這份備份含當時所有 refs 及完整歷史，與先前事故備份分開。

本次只啟用已批准的英文 SEO 與直接詢價修補。沒有使用先前 0b8f1ef 的通用修復分支；沒有將英文換到 /，也沒有帶入 hreflang、canonical、主域、301 或語言偏好路由變更。

## 修改檔案

| 檔案 | 修改用途 |
|---|---|
| src/seo.js | 僅英文 Title、Description，精確採用使用者批准文字 |
| src/english-content.js（新增） | 英文專用 H1/H2/H3、正文、圖片說明、內鏈 CTA、可見品牌副標與直接 WhatsApp；非英文不套用 |
| src/i18n.js | 讓既有語言切換辨識新版英文文案；維持原路由邏輯；避免新英文詞與原目的地／翻譯空白混淆 |
| scripts/seo-build.mjs | 建置時輸出完整英文正文及 Hero 直接詢價，無須等待 JS；使用穩定翻譯識別還原 Hero 的中文內容 |
| src/style.css | 只對英文 Hero 調整長標題換行、品牌副標與詢價文字連結；沿用原圖片、色彩、字體、動畫及版型 |
| src/main.js | 英文車型 role=img 的 aria-label 準確標示車型、illustration 及 private chauffeur travel；不改車型／預訂操作 |
| package.json | 增加可重現的 syntax lint、production-preview Phase 1 檢查指令；未增加依賴 |
| scripts/lint.mjs（新增） | JS／JSON／Python 語法檢查；明確不是 ESLint 規則檢查或 TypeScript 型別檢查 |
| scripts/check-phase1.mjs（新增） | 無 JS／Googlebot UA、保護既有 SEO 訊號、四尺寸截圖、三語切換與 no pageerror |
| tests/phase1-chauffeur.spec.js（新增） | 新文案跨語言切換與無需填表的 WhatsApp 直達回歸 |
| tests/site.spec.js | 更新英文 H1 預期；保留原有流程驗證 |
| TRAVTHRU-KEYWORD-MAPPING.md（新增） | 全部 18 query 的數據、意圖、目標現有區塊、實作位置及待確認服務 |
| incident-evidence/phase1-* | 測試紀錄、原頁保留比對及 /articles 狀態 |
| 本報告 | 修改前後對照、測試、預覽、限制、上線／回滾方案 |

## 英文修改前後對照

| 元素 | 修改前 | 已完成工作區版本 |
|---|---|---|
| Title | KLIA Airport Transfer & Private Chauffeur Kuala Lumpur &#124; TRAVTHRU | Chauffeur Service KL & Private Driver Malaysia &#124; Travthru |
| Description | Plan KLIA/KLIA2 airport transfers, private chauffeur services and tailored tours in Kuala Lumpur with TRAVTHRU. Enquire on WhatsApp for a personalised quote. | Book a premium chauffeur service in Kuala Lumpur with Travthru. Enjoy professional private drivers, luxury MPVs, KLIA airport transfers and comfortable private transportation. |
| H1 | Every journey, beautifully taken care of. | Premium Chauffeur Service in Kuala Lumpur |
| 品牌標語 | 作 H1 | 完整保留於 H1 下方可見副標，不使用隱藏 SEO 文字 |
| Experience H2 | A world to discover. It starts with a journey. | Private Chauffeur Service in Malaysia. |
| Services H2 | Look forward to it. We will take care of the rest. | Professional Chauffeur Service in Kuala Lumpur |
| Fleet H2 | The right space. Comfort, without compromise. | Luxury MPV & Private Driver Service |
| Promise H3 | Your pace. Your journey. | Chauffeur Service for Business & Leisure |
| 機場卡 H3 | Land. Breathe. You are here. | KLIA Airport Transfer |
| 私人旅程卡 H3 | Follow your curiosity. | Private Transfers & Tours |
| 商務卡 H3 | Arrive ready for what matters. | Corporate Chauffeur Service |
| 商務卡說明 | Business travel · Groups · Event transfers | Business travel · Private transportation · Routes confirmed；不把未核實活動服務當成承諾 |
| 車型說明 | Alphard / Vellfire. A first-class seat for every guest. | Explore Alphard / Vellfire options for luxury chauffeur travel. |
| 內鏈 | Discover our services → #services | Explore chauffeur services → 同一 #services |
| Hero 詢價 | 選車 CTA；已有浮動與頁尾 WhatsApp | 保留全部入口，另加 Ask us on WhatsApp → 同一官方電話；不用填表或完成行程規劃 |

### 新版服務摘要（完整）

> Looking for a chauffeur service in KL? Travthru offers private chauffeur services for business and leisure, KLIA and KLIA2 airport transfers, car rental with a driver and tailored tours in Kuala Lumpur. Enquire about hourly chauffeur service or an outstation transfer to destinations such as Genting Highlands or Melaka. Share your route, dates, passenger count and luggage requirements so our team can confirm availability, a suitable vehicle and a personalised quote.

Experience 正文先寫 Based in Kuala Lumpur, Malaysia，避免 H2 的 Malaysia 被解讀成任意全國路線保證。hourly／outstation 用詢價及確認措辭，只舉現有目的地，不新增未核實 Singapore。未更動價格、電話、地址、SSM 或容量保證。

### 圖片與關鍵字分布

Hero role=img 說明：Champagne bronze Toyota Alphard illustration for private chauffeur travel。動態車型以實際車名＋illustration for private chauffeur travel 描述。品牌 logo 與真實旅程照片 alt 保持原意；不把每張圖片塞滿關鍵字。

18 項關鍵字依 Chauffeur KL、私人服務、Luxury MPV、private transfer、private transportation／corporate 意圖分配到現有內容。新增 12 項為 0 clicks／1,511 impressions，前 6 項為 78／1,348；18 列算術曝光 2,859，未確認相同視窗前不當作官方全站期間總量。完整表見 TRAVTHRU-KEYWORD-MAPPING.md。

24 hour chauffeur service 與 event chauffeur services malaysia：列為待業者確認，不加入英文服務承諾。中文／馬來文沿用既有內容，其中原先活動字樣仍需業務核實；本次沒有擴寫或強化它們。

## 測試結果

| 檢查 | 結果／界線 |
|---|---|
| Production Build | PASS：Vite＋靜態三語 HTML；現有 new URL('../', import.meta.url) 提示仍存在，非此次新錯誤，資產路徑測試通過 |
| Lint | PASS：npm run lint；28 JS files、3 JSON、Python localizer 語法檢查。原專案無 ESLint 設定，未宣稱通過 ESLint 規則分析 |
| TypeScript Check | **不適用**：原專案為 JavaScript，沒有 .ts/.tsx 或 tsconfig；未新增型別系統，不冒稱 tsc 已通過 |
| 三語 SEO Metadata | PASS：node scripts/check-seo.mjs；Title、Description、單一 H1、canonical、hreflang、robots、schema、資產、錨點及版寬 |
| Googlebot UA／無 JavaScript | PASS：本地 production build 使用 Googlebot UA，正文、H1、服務摘要、副標及 WhatsApp 均可讀；不是 Google 線上 URL Inspection |
| Responsive／Production hydration | PASS：中英馬 × 320/390/768/1440；無水平溢出；英文 H1／品牌副標／Hero 底部不互相重疊；建置英文頁切回中、馬再英文正確，無 pageerror |
| 全部既有及新增操作測試 | PASS：npm test，20/20 通過（最後完整執行約 1 分鐘） |
| WhatsApp 直接詢價 | PASS：空白表單下點新 Hero 入口，攔截新視窗到正確 wa.me 號碼；保留浮動入口，不發送真實訊息 |
| 行程規劃／車型／表單／動畫 | 包含於完整 Playwright 套件；影片／降動態／照片牆／手機導覽均保留 |
| 原有中馬及 SEO 訊號 | PASS：中文／馬來文 HTML 僅忽略共享 JS/CSS 檔名變動後與發布基準完全一致；robots.txt／sitemap.xml 位元一致；三頁 canonical／hreflang 值逐項完全一致 |

測試曾揭露英文 H1 的 Kuala Lumpur 與原目的地翻譯值相同，造成 production HTML 切中文時誤用目的地詞；已加明確翻譯識別及空白處理，並補上建置版回歸，修復後通過。這不是把靜態英文換好卻忽略語言切換。

## 預覽與重現

互動預覽運行於**雲端工作環境**：http://localhost:4173/en/，中文 /、馬來文 /ms/。此不是公開部署，也不保證使用者電腦本身的 localhost 能直連雲端。環境未提供可用的 open_cloud_preview／桌面控制工具，無法產生經驗證的使用者電腦轉發 URL；已用 Playwright 實際檢查並保留桌機／手機截圖。

截圖：artifacts/phase1/english-320.png、english-390.png、english-768.png、english-1440.png；佈局數據在 responsive-results.json。截圖使用 reduced motion 方便直接檢視 Hero；正常動畫另外由完整測試驗證，沒有移除動畫。

本地重現（不要推送 main）：

```sh
npm ci
npm run lint
npm run build
npm run preview -- --port 4173 --strictPort
```

另開終端：

```sh
node scripts/check-seo.mjs
npm run test:phase1
npm test
```

正式版 build 的 canonical／robots 為 production 設定，僅在本地預覽。若將來另批准公開測試站，需獨立 preview noindex 建置，不能把測試站當正式提交 Google。

## /articles 與尚未解決事項

- 最新複驗 www /articles 301 到 apex /articles，最終 404。GSC referring page 不能證明它曾有排名或正文；舊 200 仍可能 SPA fallback。沒有取得新的歷史正文或搜尋成效，不能捏造文章。
- 待取得內容／query／外鏈證據後，優先原址恢復；只有真實等價內容才精準 301。**本次沒有執行恢復、重定向或新建文章。**
- 11/7 事故根因未確診；等待分期 query→page，不能以本次相關性修補保證排名回復。
- Hosting 的 HTTP 未強制 HTTPS 仍待單獨授權及 Pages 權限；本次不改 redirect。
- 原有根頁 localStorage 語言偏好可能把根頁切到上次語言，仍是已知問題；本次按限制不帶入路由變更。
- Search Console 實際驗證方式／舊 HTML token 尚未取得；不虛構 token，不修改驗證／canonical 設定。
- 24 小時、活動服務、全國任意路線與舊內容價值仍待核實；不憑關鍵字曝光擴充業務承諾。

## 上線方案（尚未批准）

1. 使用者先審核本地預覽、18 項 mapping、完整測試與本次 commit；確認具體內容後明確批准正式部署。
2. 上線前唯讀確認遠端 main 是否仍為原發布後的 3f6106a；若有他人更新，先比較並保留，不強推／覆寫。
3. 從最新 main 建立 release 分支，只整合已批准本次變更，重新 build／測試；核對中馬內容、URL／canonical／hreflang／sitemap、價格與聯絡資料。
4. 保存上線前 main SHA、可復原 build 與 workflow run；只有批准後才推送 main，因現有 GitHub Actions 對 main push 會自動部署。
5. 部署成功後即時核對三語 HTTP、Title/H1/Description、Googlebot raw HTML、資產、WhatsApp 及新語言切換；GSC 執行 live test，按完整數據觀察原 query cohort，而非宣稱即時恢復。

## 回滾方案

目前未部署，正式站不需回滾。預覽需返回舊版時，使用乾淨的獨立 worktree checkout 備份 SHA 後重建，不用 git reset --hard 刪除工作。

如日後已批准上線且發現回歸，針對**本次實作 commit**做 git revert，保留後續他人修改，重新通過 build／測試後按部署程序發布；不整站回滾到不明舊站、不改主域／網址、不重建已刪失資料。先區分技術回歸與尚未累積足夠樣本的搜尋波動。
