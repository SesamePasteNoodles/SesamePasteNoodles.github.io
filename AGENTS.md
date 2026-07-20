# Project Instructions

本檔適用於整個 repository，僅補充本作品集專案特有的規則。

## 文件角色

- `.agents/planning.md`：產品、內容、資訊架構與 UX 的主要規格。
- `.agents/IMPLEMENTATION-PLAN.md`：施工階段、驗收條件與 Definition of Done。
- `.agents/DESIGN-vercel.md`：僅供視覺參考，不得覆蓋 `planning.md` 的專案決策。
- `iSpan_AI_SinglePage/`：舊版原型與視覺參考；除非使用者明確要求，不要直接覆寫或把它當成正式新版。
- `README.md`：面向訪客與招募者的專案入口，不承載完整內部規格。

產品決策衝突時以 `planning.md` 為準；執行順序與驗收方式以
`IMPLEMENTATION-PLAN.md` 為準。

## 目前基線

- 專案仍在 Phase 0／新版骨架建立前階段。
- 預定技術基線為 Vue 3、TypeScript、Vite 與 Vue Router Hash History。
- 樣式以自訂 CSS、CSS Grid 與 CSS Variables 為主；不要自行加入 Bootstrap 或其他 UI framework。
- 部署目標是 GitHub Pages，實作路由與資源路徑時必須考慮 repository base path。
- 建立新版應用程式前，先確認放置位置，不要覆寫舊版原型。

## 內容規則

- 不得虛構姓名、職稱、聯絡方式、Repository、Demo、專案角色、團隊規模、技術棧或成效數據。
- 未確認的內容使用清楚的 placeholder 或省略，不要用看似正式的假資料補齊版面。
- HAPPET Case Study 必須區分團隊成果與個人貢獻。
- 只有實際完成且可說明的功能，才能寫成技術亮點。
- 不使用圖庫人物照冒充本人；專案圖片應優先使用真實截圖或自行製作的示意圖。
- 不建立 `href="#"`、空下載或假 CTA；目標未提供時應顯示合理的未公開／準備中狀態。

## 設計與互動

- 維持「Vercel 的閱讀效率＋黑白黃 Modern Bauhaus 個性」，不要仿製 Vercel 官網。
- 保留芥末黃、黑白區塊、窄版黃色側軌、大寫標題、細線／虛線與黑底 Tech Stack 等識別元素。
- 首頁負責快速掃描與導流；技術深度放在 Project Detail／Case Study。
- 所有互動元件須有可見的 `:focus-visible` 狀態，且可使用鍵盤操作。
- 支援 `prefers-reduced-motion`；Hover 不得是唯一的資訊或操作提示。
- 驗證 360px 寬度無非預期水平捲動，並避免黃色底搭配低對比白字。
- 圖片 Modal 若實作，需處理 ESC、焦點移入與還原、背景關閉及鍵盤切換。

## 實作與驗證

- 專案、技能與經歷應集中在資料模組，避免在多個元件重複硬編碼。
- 延續既有命名與目錄結構；若實際架構與規劃文件不同，完成同一變更時同步更新相關文件。
- `package.json` 建立後，完成變更至少執行與範圍相關的 lint、type-check 與 production build。
- 涉及版面或互動時，另檢查 Desktop、Tablet、Mobile、鍵盤操作與 Reduced Motion。
- 部署相關變更需驗證 GitHub Pages base path、首頁、Hash Route、重新整理與靜態資源載入。

## 素材與 License

- 不複製 Vercel 的專屬圖片、品牌素材或無法確認授權的資產。
- 原始程式碼依根目錄 `LICENSE` 採用 MIT License。
- `NOTICE.md` 所列個人照片、履歷、聯絡資料、品牌識別、作品集文案、專案截圖與其他個人素材不在 MIT 授權範圍內。
- 新增素材時維持相同界線；第三方素材仍依其原始授權，不得假設可隨程式碼再授權。
- 不要未經使用者確認變更 License 或縮小個人素材的保留範圍。
