# 首頁細節調整與精選專案卡片實作計畫

> 狀態：可交接施工  
> 適用範圍：新版 Vue 作品集首頁  
> 主要規格：[`planning.md`](./planning.md)  
> 公開內容白名單：[`CONTENT.md`](./CONTENT.md)  
> 階段驗收：[`IMPLEMENTATION-PLAN.md`](./IMPLEMENTATION-PLAN.md)

## 一、任務背景

目前首頁已具備深藍、金黃、細框線與 Modern Bauhaus 的視覺基礎，但公開頁面混入過多
「技術索引／內部治理」語彙，包括：

- `WEB / INTERFACE`
- `PROFILE INDEX`
- `RC—01`
- `PUBLIC PROFILE`
- `SELECTED WORK`
- `VERIFIED LINKS`
- `ONLY VERIFIED CONTENT IS PUBLISHED`
- `02 / APPROACH`
- `BUILT TO MAKE THE WORK CLEAR.`
- `VERIFIED / FOCUSED / ACCESSIBLE`

這些文字主要描述網站如何整理內容，沒有直接幫助訪客理解作者、能力或作品。首頁的專案區
目前又只輸出三個專案名稱，與原規格要求的「HAPPET 主卡＋兩張副卡」不符。

本次調整要將首頁從「設計模板／規格展示」修正為「能快速理解與進入作品的個人作品集」。

## 二、已確認決策

### 2.1 保留

- 深藍、金黃、黑色、細框線與網格背景。
- Randy Chen 姓名、Email、GitHub 與有效 Project Detail 入口。
- `RC.` 作為精簡品牌標記，但同一個 viewport 只顯示一處。
- 左側黃色 Section Rail；桌面顯示 Rail 品牌標記，Rail 隱藏時改由 Header 顯示品牌標記。
- 大寫標題、Mono 小標與章節編號，但編號必須對應真實可導覽區塊。
- 鍵盤操作、`:focus-visible`、Reduced Motion 與既有 Mobile Menu 行為。

### 2.2 移除

- 整個 `ContentPrinciples`／`Approach` 區塊。
- Hero 的 `WEB / INTERFACE`、`PROFILE INDEX`、`RC—01`、大型圓形 `RC` 索引卡。
- `PUBLIC PROFILE`、`VERIFIED LINKS`、`ONLY VERIFIED CONTENT IS PUBLISHED`。
- 把內容治理、可驗證原則和無障礙要求當作公開賣點的文字。
- 同一畫面重複出現的 `RC.`、`RC—01`、大型 `RC`。

無障礙與內容可信度仍是驗收要求，只是不再以自我說明文字占據首頁。

### 2.3 首頁目標資訊架構

```text
Header / Desktop Section Rail
├── Intro
├── Projects
└── Contact

Hero
├── PORTFOLIO / 2026
├── Randy Chen
├── 以已核准專案內容組成的簡短導讀
├── 查看精選專案
├── GitHub
└── Email

Featured Projects
├── HAPPET 主卡
├── 石阮售票系統副卡
└── AI Agent 全域規範同步系統副卡

Contact / Footer
```

除非 `.agents/CONTENT.md` 新增核准內容，Hero 不自行補上職稱、求職方向、年資或個人成效。

## 三、內容與素材規則

### 3.1 可用素材盤點

| 專案 | 首頁圖片策略 | 現況 |
| --- | --- | --- |
| HAPPET | 使用可辨識但不冒充實際畫面的 placeholder | 無已核准專案圖片 |
| 石阮售票系統 | 優先使用 `01-main-card-mode.png` | 已有 4 張真實截圖 |
| AI Agent 全域規範同步系統 | 使用 `main-menu.jpg` | 已有 1 張真實截圖 |

### 3.2 Placeholder 規格

HAPPET placeholder 必須：

- 使用 CSS、現有字體、線條與品牌色製作，不新增假截圖。
- 顯示 `HAPPET` 與「專案影像尚未公開」或等義文字。
- 使用 `role="img"` 與清楚的 `aria-label`，或以等價語意讓輔助科技知道它是替代視覺。
- 不使用圖庫人物、寵物照片、生成式產品畫面或第三方品牌素材。
- 未來加入核准圖片時，可只調整資料，不重寫卡片結構。

真實圖片必須沿用 `ProjectImage.alt`，設定固定 `aspect-ratio`、合理 `object-fit`、明確
`width`／`height` 或等價尺寸保留策略，避免 CLS。

### 3.3 公開文案邊界

- 專案名稱、摘要、狀態、期間、技術與亮點只能來自 `src/data/projects.ts`。
- HAPPET 不顯示尚未核准的個人角色、團隊規模、Repository、Demo、發布狀態或成效。
- 不使用 `href="#"`、空連結或假按鈕。
- Repository 或 Demo 不存在時，首頁只保留有效的 Project Detail 入口。
- 卡片最多顯示精簡摘要、少量技術標籤與狀態；完整技術決策留在 Project Detail。

## 四、資料與元件設計

### 4.1 Project 資料模型

在既有 `Project` 介面加入可選欄位：

```ts
featured?: boolean
featuredOrder?: number
cardImage?: ProjectImage
```

規則：

- 三個首頁專案皆設定 `featured: true`。
- `featuredOrder` 固定為 HAPPET `1`、石阮售票系統 `2`、AI Agent 同步系統 `3`。
- `cardImage` 只在需要與詳情頁第一張圖片不同時設定；否則使用 `images?.[0]`。
- HAPPET 在沒有核准圖片時不建立假的 `ProjectImage`，由元件走 placeholder 分支。
- 首頁以 `featured` 篩選並依 `featuredOrder` 排序，不直接使用陣列前 3 筆。

### 4.2 建議元件責任

```text
src/components/home/
├── HeroSection.vue
├── FeaturedProjects.vue
└── FeaturedProjectCard.vue
```

`FeaturedProjects.vue`：

- 取得已排序的精選專案。
- 決定第一張主卡與後兩張副卡版面。
- 提供 Section heading 與「查看全部專案」；若完整 Projects route 尚未實作，不建立假入口。

`FeaturedProjectCard.vue`：

- 接收 `project` 與 `variant: 'primary' | 'secondary'`。
- 統一處理真實圖片與 placeholder。
- 顯示名稱、摘要、期間／狀態、精簡技術標籤及 Project Detail CTA。
- 整張卡片可點擊時必須避免巢狀互動元素；否則只讓明確 CTA 成為連結。
- Hover、Focus 與 Reduced Motion 使用同一套狀態邏輯。

不要讓 `FeaturedProjects.vue` 複製 Project Detail 的完整內容，也不要為三個專案各寫一套
硬編碼卡片。

### 4.3 RC 顯示策略

- Desktop：顯示黃色 Section Rail 的 `RC.`，Header 內的 wordmark 視覺隱藏。
- Rail 隱藏的 Tablet／Mobile：顯示 Header 的 `RC.`。
- Hero 不再顯示 `RC`、`RC—01` 或其他 RC 裝飾。
- 視覺隱藏不得移除必要的首頁 accessible name。

## 五、分階段實作與 Commit

每個階段完成驗收後才建立 commit。不得把所有修改壓成單一大型 commit，也不得在中間
commit 留下無法 build 的狀態。

### Stage 1：移除公開頁面的內部原則區

預計修改：

- 從 `HomeView.vue` 移除 `ContentPrinciples`。
- 刪除已無用途的 `ContentPrinciples.vue` 與對應 CSS。
- Header、Section Rail 和 `useActiveSection` 呼叫端由 `approach` 改為 `projects`。
- 導覽文字與 accessible name 改成 Intro／Projects／Contact。
- 編號 `01 / 02 / 03` 分別對應 Intro／Projects／Contact。

階段驗收：

- 首頁 DOM 不再出現 `02 / APPROACH`、`BUILT TO MAKE THE WORK CLEAR.`、
  `VERIFIED`、`FOCUSED`、`ACCESSIBLE`。
- Header 與 Rail 的 Projects 連結可正確捲動至 `#projects`。
- Scroll active state 在 Intro、Projects、Contact 間正確切換。
- Mobile Menu 的 ESC、焦點循環與關閉後焦點還原維持正常。
- `npm run lint`、`npm run type-check`、`npm run build` 通過。

Commit：

```text
refactor: 移除首頁內部原則說明

- 將首頁導覽改為 Intro、Projects 與 Contact
- 移除 Approach 區塊及失效樣式
```

### Stage 2：精簡 Hero 與 RC 品牌顯示

預計修改：

- 移除 Hero 的 signal panel、狀態列與不明索引文字。
- 保留姓名、年度、有效 CTA 與基於已核准專案的簡短導讀。
- 加入「查看精選專案」錨點連結。
- 重新整理 Hero grid、留白與最小高度，避免移除右欄後形成大片空白。
- 實作 Desktop Rail／Tablet-Mobile Header 二選一的 RC 顯示策略。

階段驗收：

- 首頁不再出現本計畫第二節列出的待移除文字。
- 任一 viewport 同一時間最多看見一個 `RC.` 品牌標記。
- 首屏可辨識 `Randy Chen`，且不宣稱未核准職稱或成效。
- 「查看精選專案」、GitHub、Email 皆有有效目標。
- 1280×800、768×1024、390×844、360×800 無非預期水平捲動。
- 200% 文字縮放時姓名、導讀與 CTA 不重疊或被裁切。
- `npm run lint`、`npm run type-check`、`npm run build` 通過。

Commit：

```text
refactor: 精簡首頁 Hero 品牌語彙

- 移除重複 RC 與技術索引裝飾
- 強化姓名、導讀與作品入口階層
```

### Stage 3：建立首頁精選資料契約

預計修改：

- 擴充 `Project` 的 `featured`、`featuredOrder`、`cardImage` 可選欄位。
- 為三個專案設定精選狀態與明確順序。
- 建立可測試的精選專案篩選／排序邏輯。
- 不變更 Project Detail 既有資料讀取與路由行為。

階段驗收：

- 精選結果固定為 HAPPET、石阮售票系統、AI Agent 同步系統。
- 改變 `projects` 原始陣列順序不會改變首頁策展順序。
- 未設定 `featured` 的未來專案不會自動進入首頁。
- HAPPET 沒有假圖片資料。
- 三個既有 Project Detail Hash Route 仍可直接開啟。
- `npm run lint`、`npm run type-check`、`npm run build` 通過。

Commit：

```text
feat: 定義首頁精選專案資料

- 加入精選狀態、排序與卡片圖片欄位
- 固定三個首頁專案的人工策展順序
```

### Stage 4：建立可重用的精選專案卡片

預計修改：

- 新增 `FeaturedProjectCard.vue`。
- 實作 primary／secondary 兩種版型。
- 支援真實圖片、CSS placeholder、技術標籤、狀態與 Project Detail CTA。
- 加入 Hover、Focus Visible 與 Reduced Motion 狀態。

階段驗收：

- 真實圖片採用資料中的 alt，不以檔名代替。
- HAPPET placeholder 明確表示影像尚未公開，且不是空白灰框。
- 卡片不顯示 HAPPET 未核准角色、團隊規模、Repository、Demo 或成果數字。
- 每張卡片只提供有效 Project Detail 入口，沒有空 CTA。
- Tab 可依視覺順序操作三張卡片，Focus 不被裁切。
- Reduced Motion 下不執行圖片縮放或位移動畫。
- `npm run lint`、`npm run type-check`、`npm run build` 通過。

Commit：

```text
feat: 建立精選專案卡片元件

- 支援主副卡、真實圖片與無圖片 placeholder
- 補齊鍵盤焦點與 Reduced Motion 狀態
```

### Stage 5：完成一主兩副首頁版面

預計修改：

- 以 `FeaturedProjects.vue` 取代 `ApprovedContentSections.vue` 中的專案名稱列表。
- HAPPET 主卡全寬呈現。
- 石阮售票系統與 AI Agent 同步系統以雙欄副卡呈現。
- Mobile 改為單欄，內容與 Tab 順序維持 HAPPET、石阮、AI Agent。
- 若 Skills／Experience 仍無合格的完整首頁設計，本次不順手擴張範圍；保留或省略須依
  `CONTENT.md` 與既有渲染條件處理。

階段驗收：

- 首頁不再是三行純文字專案列表。
- Desktop 呈現一張全寬主卡與兩張等寬副卡。
- Tablet／Mobile 合理重排，360px 無水平捲動。
- 三張卡片均包含名稱、核准摘要、精簡技術資訊與詳情入口。
- 圖片比例一致、沒有明顯變形，載入時無顯著版面跳動。
- Hover 不是唯一的資訊或操作提示。
- `npm run lint`、`npm run type-check`、`npm run build` 通過。

Commit：

```text
feat: 完成首頁一主兩副專案版面

- 以 HAPPET 主卡帶領三個精選專案
- 完成桌面雙欄與行動版單欄重排
```

### Stage 6：自動驗證與規格同步

預計修改：

- 擴充既有 smoke check，驗證首頁必要 CTA、三個 Project Detail 連結及已移除字串。
- 視情況增加精選排序的輕量測試；不要為此引入新的測試框架。
- 更新 `planning.md` 和 `IMPLEMENTATION-PLAN.md` 的首頁現況與最終差異。
- 記錄實際執行的 Desktop、Tablet、Mobile、鍵盤與 Reduced Motion 驗收結果。

階段驗收：

- `npm run lint`
- `npm run type-check`
- `npm run build`
- `npm run test:smoke`
- 正式 build 的首頁不包含已移除的內部原則文案。
- 首頁與三個 Project Detail Hash Route 可直接開啟及重新整理。
- Console 沒有 error，圖片與靜態資源沒有 404。
- 文件描述與實際元件、導覽名稱、專案順序一致。

Commit：

```text
test: 補強首頁精簡版驗收

- 驗證精選專案入口與移除文案
- 同步首頁規格及跨裝置驗收結果
```

## 六、整體 Definition of Done

全部條件同時成立才算完成：

- 訪客首屏能看見姓名、簡短導讀與作品 CTA，不需要理解任何內部索引代碼。
- 首頁不再顯示 `Approach` 內容治理區。
- 同一 viewport 最多顯示一個 `RC.`。
- 專案展示符合「HAPPET 主卡＋兩張副卡」，不是純文字列表。
- 所有卡片內容來自公開白名單與集中式資料模組。
- HAPPET 缺圖時使用誠實、可存取且可替換的 placeholder。
- 三張卡片的 Project Detail 入口皆有效，沒有 `href="#"`。
- Desktop、Tablet、390px Mobile、360px Mobile、200% 文字縮放均完成檢查。
- 全站鍵盤導覽、Focus Visible、Mobile Menu、Reduced Motion 均完成檢查。
- GitHub Pages base path、Hash Route、重新整理與靜態資源載入均正常。
- Lint、type-check、production build 與 smoke test 全數通過。
- 每個 Stage 各自形成可理解、可 build、可回退的 commit。

## 七、交接注意事項

- 開工前先執行 `git status --short`，保留使用者或其他 Agent 的既有變更。
- 僅修改本計畫列出的首頁、資料、必要共用樣式與對應文件。
- 不新增 UI framework、圖片套件或測試框架。
- 不把舊版 `iSpan_AI_SinglePage/` 當成正式新版直接覆寫。
- 若施工時發現 HAPPET 新圖片，仍須先確認它已列入 `CONTENT.md` 或取得使用者明確核准。
- 每個 Stage 驗收失敗時先修正再 commit，不建立「已知壞掉」的中繼提交。
- 除非使用者明確要求，完成後不要自行 Push 或建立 PR。
