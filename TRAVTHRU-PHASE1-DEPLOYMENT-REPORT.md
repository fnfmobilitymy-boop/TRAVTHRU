# Travthru 第一階段 SEO 正式部署紀錄

日期：2026-11-16（Asia/Kuala_Lumpur）。使用者在確認「不用預覽，直接部署到 travthru.com」後回覆 yes，正式部署獲批准。本文件取代先前報告中「尚未部署」的階段性狀態。

- 正式英文頁：https://travthru.com/en/
- 正式中文首頁：https://travthru.com/
- 正式馬來文：https://travthru.com/ms/
- 上線前 main：3f6106a497aabbaa9f1a9fd6576bcbafe0f1a08f。
- 上線前備份已推送：backup/production-before-phase1-20261116。
- 原工作區實作：e3d64c6；從最新遠端 main 建立 release 分支，僅 cherry-pick 此實作，未將其他事故調查分支整批合併。
- 實際發布：c92404cdfa871eea8906c04932f2f199ef74b68c。
- GitHub Actions：https://github.com/fnfmobilitymy-boop/TRAVTHRU/actions/runs/43869829280。
- validate 與 deploy 均 completed/success；正式推送前再次通過 production build、syntax lint 與三語 SEO 檢查；Actions 執行完整流程測試後成功發布。

## 正式站驗證

使用具 TLS 驗證的 HTTP 請求及 Googlebot UA，逐一比對正式頁與發布 build：

1. /、/en/、/ms/ 全部 200、index,follow、未見 X-Robots-Tag 禁止。
2. 英文 Title：Chauffeur Service KL & Private Driver Malaysia | Travthru。
3. 英文 H1：Premium Chauffeur Service in Kuala Lumpur。
4. 英文 Description 與使用者批准文字完全相同；品牌副標、服務正文及 Hero 直接 WhatsApp 均已進入靜態 HTML。
5. Hero WhatsApp 指向原官方號碼 https://wa.me/60107198186；不需先填表。
6. 三語 HTML、robots、sitemap、主 JS、主 CSS 共 7 個檔案與本地發布 build 逐位元一致，完整 SHA-256 記於 incident-evidence/phase1-production-verification.json。
7. 三語 self canonical 與 reciprocal hreflang 值保持；www 的 /、/en/、/ms/、/sitemap.xml 均正確 301 至 non-www 同一路徑。
8. 沒有改主域、預設語言、301 設定、服務價格或公司資料；中文／馬來文文字及動畫保留。

Googlebot UA 請求不是實際 Google IP／GSC 即時測試。此驗證證明正式站交付本次已測試 build，不代表 Google 已重新抓取或排名已恢復。

## 剩餘事項與回滾

HTTP 強制 HTTPS 的既有問題、/articles 最終 404、舊內容／外鏈及 11/7 分期 query→page 資料仍未解決；未擅自擴大服務到 24/7 或活動包車，也未實作歷史路由恢復。

如需回滾，從最新 main 針對 c92404c 做 git revert，檢查後續他人變更、build 與測試後發布；不強推或硬重置整站。已保存上線前分支與完整 bundle。

後續可在 GSC 對 /en/ 做即時測試與要求建立索引，並觀察完整資料日的查詢／頁面成效；本次沒有操作 Google 帳戶或宣稱已申請索引。
