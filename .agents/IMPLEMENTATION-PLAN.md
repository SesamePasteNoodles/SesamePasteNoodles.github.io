# Portfolio Implementation Plan

> 文件角色：本檔是可執行的施工與驗收計畫。產品、內容和 UX 決策以
> [`planning.md`](./planning.md) 為準；[`DESIGN-vercel.md`](./DESIGN-vercel.md)
> 僅作視覺參考。

## 1. 專案目標

建立一個部署於 GitHub Pages 的個人作品集，讓招募者能在短時間內理解：

- 經使用者核准的專業定位。
- 可實際驗證的技術棧與專案成果。
- HAPPET 中的角色、技術決策與解題能力。
- GitHub 與經使用者核准公開的聯絡方式。

網站必須兼具 Vercel 式閱讀效率與深藍、金黃、黑色的沉穩個人識別，但不仿製
Vercel 官網。

## 2. 範圍

### 本次包含

- 響應式首頁。
- About、Tech Stack、Featured Projects、Experience、Contact。
- HAPPET 專案詳情頁。
- Portfolio 與 WinForms Ticket System 的基本詳情內容。
- Mobile Menu、捲動導覽、Back to top、必要的進場效果與圖片 Modal。
- SEO、Open Graph、效能、無障礙與 GitHub Pages 部署。

### 本次不包含

- 後台 CMS。
- 聯絡表單與郵件寄送服務。
- 部落格。
- 登入、資料庫或伺服器端 API。
- 為了裝飾而加入的 3D、Canvas 或大量視差動畫。
- 未經驗證的專案數據與技術宣稱。

## 3. 開工前決策

以下是目前建議基準；Phase 0 完成時再做一次覆核：

| 項目 | 建議決策 | 原因 |
|---|---|---|
| 前端 | Vue 3、TypeScript、Vite | 符合規劃的元件化與資料驅動結構 |
| 路由 | Vue Router Hash History | GitHub Pages 重新整理詳情頁時不需 Rewrite |
| 樣式 | 自訂 CSS、CSS Grid、CSS Variables | 保留獨特視覺並控制產物大小 |
| UI Framework | 初期不引入 Bootstrap | 現有需求可由原生 CSS 完成 |
| 內容資料 | TypeScript data modules | 專案、技能和經歷可集中維護 |
| 圖示 | 先使用本地 SVG | 避免不必要套件與外部請求 |
| 部署 | GitHub Actions → GitHub Pages | 自動建置並保留可重現流程 |

不得在未確認授權與授權條款前複製 Vercel 的圖像或專屬素材。

## 4. 開工前資料清單

開始正式版面實作前，需取得或確認：

- 以 [`CONTENT.md`](./CONTENT.md) 作為公開個人資訊白名單；未列出的欄位預設省略。
- 職稱、專業摘要、履歷、電話、照片及其他個人資訊只有在使用者明確核准後才加入。
- 若沒有經核准的個人照，About 使用純文字或非人物品牌圖形，不使用圖庫人物照。
- 三個專案的正式名稱、狀態、角色、時間、團隊人數與技術棧。
- 每個公開 Repository、Demo 或無法公開的原因。
- HAPPET 實際負責範圍及可公開的驗證、2FA、Wallet、Payment 細節。
- 每個專案至少一張真實截圖；HAPPET 建議準備登入、錢包、管理介面與流程圖。
- 所有量化成效的來源；無證據的百分比或效能數據一律移除。

## 5. 資訊架構

```text
Home
├── Hero
├── About
├── Tech Stack
├── Featured Projects
├── Experience
└── Contact

Project Detail
├── HAPPET
├── Portfolio
└── WinForms Ticket System
```

首頁負責掃描與導流；Project Detail 負責證明問題分析、設計選擇與實作結果。

## 6. 施工階段

### Phase 0：內容盤點與技術基線

工作：

- 備份並保留 `iSpan_AI_SinglePage` 作為舊版視覺參考。
- 確認新應用程式放置位置，避免覆寫舊版。
- 完成第 4 節資料清單。
- 確認 Vue／TypeScript／Vite、Hash Router 與無 Bootstrap 的基準。
- 定義 Node 與套件版本鎖定方式。

驗收：

- 沒有 `href="#"`、假 Demo、圖庫人物照或無來源量化數據進入正式內容。
- 每個專案都有可公開狀態與主要 CTA 決策。
- 技術選型與目錄位置已確認。

停止條件：

- HAPPET 的角色或可公開範圍仍不明確時，不撰寫技術 Case Study。

### Phase 1：專案骨架與資料模型

工作：

- 建立 Vue 3／TypeScript／Vite 專案。
- 設定 Router、Hash History 與 Not Found 畫面。
- 建立 `projects.ts`、`skills.ts`、`experience.ts`。
- 建立 Layout、Section Container、Button、Tag 與 Heading 基礎元件。
- 使 View 聚焦於路由資料、頁面狀態與區塊組合，將具獨立職責或重用價值的 UI 拆為 Component。
- 建立 lint、type-check、build 與 preview scripts。

驗收：

- 首頁與三個 Project Detail 路由可直接開啟。
- 專案資料不重複硬編碼於多個元件。
- View 不承載可獨立封裝的大型 UI 區塊。
- 共用元件以 Props、Slots 或 Emits 提供清楚介面，且不直接依賴特定 View 的資料結構。
- 元件拆分符合 `planning.md` 的職責與重用原則，未因追求檔案數量而過度抽象。
- Build 與 type check 通過。

### Phase 2：Design System

工作：

- 建立顏色、字體、間距、容器、圓角、邊框和動態 Token。
- 建立深藍主背景、金／芥末黃重點色、黑色修飾與淡色文字的語意色彩 Token。
- 實作頂部 Navbar 與 64–80px 黃色 Section Rail。
- 建立黑底 Tech Stack、細虛線、大寫標題和編號語言。
- 定義 `:hover`、`:focus-visible`、active、disabled 狀態。
- 實作 `prefers-reduced-motion`。
- 將 `hero-status`、`.router-link-active`、`.mono-label`、`.hero-eyebrow` 與同類小字的基準提高至至少 14px。
- 以 14px、15px、16px 三個版本逐步比較，同時測試行高、字重、字距與對比，再確定最終 Token。

驗收：

- 黃色不搭配低對比白字。
- 所有互動元件可看見鍵盤焦點。
- 上述小字在 Desktop、Tablet 與 Mobile 的一般閱讀距離下均可輕鬆辨識，且未破壞標題階層或造成折行擠壓。
- 360px 寬度無非預期水平捲動。
- 元件視覺符合 `planning.md`，而非直接複製 Vercel。

### Phase 3：首頁

工作：

- Hero：姓名，以及經核准的定位、主文案、CTA 與技術資訊卡。
- About：經核准的簡介；個人照未核准時採純文字或非人物品牌圖形。
- Tech Stack：黑底 Bento Grid。
- Featured Projects：HAPPET 主卡與兩張副卡。
- Experience：精簡 Timeline。
- Contact：依 `CONTENT.md` 顯示 Email 與 GitHub；履歷只有在核准後才加入。

驗收：

- 首屏可辨識姓名、經核准的專業定位與作品入口。
- 所有 CTA 連到有效目標。
- 專案卡只呈現摘要，不把 Case Study 全文塞入首頁。
- 圖片有尺寸、替代文字與合理裁切。

### Phase 4：Project Detail

工作：

- 建立共用 Project Hero、Overview、Technical Highlight 和 Gallery。
- 完成 HAPPET 的問題、設計、原因、結果敘事。
- 加入架構圖、流程圖、截圖與可存取的 Image Modal。
- 補齊 Portfolio 與 WinForms Ticket System 的精簡詳情頁。

驗收：

- HAPPET 清楚區分團隊成果與個人貢獻。
- 每項技術亮點能說明取捨，不只列出工具名稱。
- 圖片 Modal 支援 ESC、背景關閉、焦點管理與鍵盤切換。
- 直接開啟或重新整理 Hash Route 不出現 404。

### Phase 5：RWD、互動與無障礙

工作：

- 驗證 Desktop、Tablet、Mobile 排版。
- 實作 Mobile Menu 與捲動章節狀態。
- 實作 Back to top 按鈕：初始門檻為 `scrollY > 480px`，並依 Hero 實際高度驗證是否需要微調。
- 加入 300–500ms 的必要進場效果。
- 檢查語意標籤、標題階層、替代文字、Focus 與對比。
- 測試 Reduced Motion。

驗收：

- 只用鍵盤可操作導覽、CTA、專案卡、Menu 與 Modal。
- Hover 不是唯一的資訊或操作提示。
- 文字放大與窄螢幕不遮擋內容。
- Mobile Menu 開啟時焦點與頁面捲動行為合理。
- Back to top 只在超過門檻後出現，隱藏時不可聚焦，鍵盤可操作，且具有可見焦點與至少 44×44px 觸控範圍。
- Back to top 在 Reduced Motion 模式即時回到頂端；於 Desktop、Tablet、Mobile 均不遮擋 CTA 或重要內容。

### Phase 6：SEO、效能與部署

工作：

- 設定 title、description、canonical 與 Open Graph。
- 製作 favicon 與分享圖。
- 壓縮圖片並使用適當格式與 lazy loading。
- 設定 GitHub Actions 與 Pages base path。
- 執行 build、連結、Lighthouse 與部署後 smoke test。

驗收：

- Production build 通過。
- GitHub Pages 首頁與各 Hash Route 可正常開啟。
- 沒有失效資源、空連結或 Console error。
- 核心內容在 JavaScript 或動畫失敗時仍能合理閱讀。

## 7. 建議驗證矩陣

| 類型 | 驗證內容 |
|---|---|
| 靜態檢查 | Lint、TypeScript、格式與無效連結 |
| Build | Production build、base path、產物資源路徑 |
| Desktop | 1440×900、1280×800 |
| Tablet | 768×1024 |
| Mobile | 390×844、360×800 |
| 鍵盤 | Tab 順序、Skip Link、Menu、Modal、CTA |
| 動態偏好 | Reduced Motion |
| 內容 | 專案角色、連結與 `CONTENT.md` 核准的公開資訊 |
| 部署 | 首頁、詳情 Hash Route、重新整理、404 |

實作建立 `package.json` 後，至少提供以下等價指令：

```text
npm run lint
npm run type-check
npm run build
```

若加入測試框架，再新增 `npm run test`；不為了勾選清單而建立沒有價值的空測試。

## 8. 風險與控制

| 風險 | 控制方式 |
|---|---|
| Vercel 風格蓋過個人特色 | 以 `planning.md` 為唯一主規格，保留黃側軌與黑底區塊 |
| 技術宣稱超過實際成果 | 每項內容回溯至程式碼、截圖或 Repository |
| Vue 遷移範圍過大 | 先完成骨架與首頁，再逐頁搬入內容 |
| 圖片拖慢 GitHub Pages | 固定尺寸、壓縮、現代格式與 lazy loading |
| Hash URL 不夠美觀 | 先換取部署穩定性，未來更換託管服務再調整 |
| 動畫影響可用性 | 限制動畫範圍並支援 Reduced Motion |
| 文件與實作分歧 | 每個 Phase 完成時同步更新規格與實際狀態 |

## 9. Definition of Done

專案只有在以下條件全部成立時才算完成：

- 首頁與三個 Project Detail 內容正確且可公開。
- 所有連結、下載與聯絡方式有效。
- Desktop、Tablet、Mobile 的主要流程完成驗證。
- 鍵盤、Focus、對比、替代文字與 Reduced Motion 完成檢查。
- Lint、type check 與 production build 通過。
- GitHub Pages 部署成功並完成線上 smoke test。
- README 說明本機開發、建置、部署與內容維護方式。
- `planning.md`、本檔與實際程式沒有已知重大矛盾。

## 10. 下一個執行點

下一步只進行 Phase 0：

1. 確認正式新專案目錄位置。
2. 盤點並補齊第 4 節內容與素材。
3. 覆核技術基線。
4. 在取得必要內容後，再建立 Vue 專案骨架。
