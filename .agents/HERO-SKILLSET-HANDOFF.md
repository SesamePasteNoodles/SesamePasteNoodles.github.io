# Hero Skill Set 實作交接規劃

## 1. 文件目的

本文件提供下一位 Agent 實作首頁 Hero 右側 Skill Set 的完整交接資訊。
這一輪只調整 Hero 與其必要的集中式技能資料，不建立完整 Tech Stack 區塊，
也不改動專案主施工文件 `.agents/IMPLEMENTATION-PLAN.md`。

規格與內容衝突時仍依下列優先順序處理：

1. 使用者在目前任務中的明確要求。
2. `.agents/planning.md` 的產品、內容與 UX 決策。
3. `.agents/CONTENT.md` 的公開內容白名單。
4. 本交接文件。

## 2. 任務背景

目前 `src/components/home/HeroSection.vue` 只呈現姓名、導讀與 CTA，桌面版右側沒有
主要內容。使用者決定暫時在右側展示 Skill Set，並明確要求不得使用星星、百分比、
進度條、熟練度分級或其他無法驗證的量化表達。

Skill 內容由使用者提供的履歷第一頁左下角提取，使用者已指定作為本次公開 Skill Set。
顯示時可統一官方產品名稱與大小寫，但不得加入履歷未列出的技能。

## 3. 核准內容

Skill Set 固定使用以下五個分類：

| 分類 | 顯示內容 |
|---|---|
| 前端 / FRONTEND | Vue 3、Bootstrap、Pinia、Axios |
| 後端 / BACKEND | ASP.NET Core、EF Core、ADO.NET、Dapper |
| 資料庫 / DATABASE | Microsoft SQL Server |
| 版本控制 / VERSION CONTROL | Git、GitHub |
| API 測試 / API TESTING | Postman、Swagger |

名稱正規化：

- 履歷的 `BootStrap` 顯示為官方寫法 `Bootstrap`。
- 履歷的 `MS SQL` 顯示為較明確的 `Microsoft SQL Server`。
- 不將 `Swagger` 改寫為更具體的產品或套件名稱，避免超出來源內容。

不得從履歷同頁提取或公開電話、地址、照片、工作經歷或其他未在本任務中指定的個人資料。

## 4. 設計方向

### 4.1 資訊層級

Hero 右側使用一個非互動式技術資訊板：

```text
┌──────────────────────────────────┐
│ SELECTED SKILL SET               │
├──────────────────────────────────┤
│ 01 / FRONTEND                    │
│ Vue 3 · Bootstrap · Pinia · Axios│
├──────────────────────────────────┤
│ 02 / BACKEND                     │
│ ASP.NET Core · EF Core           │
│ ADO.NET · Dapper                 │
├──────────────────────────────────┤
│ 03 / DATABASE                    │
│ Microsoft SQL Server             │
├──────────────────────────────────┤
│ 04 / VERSION CONTROL             │
│ Git · GitHub                     │
├──────────────────────────────────┤
│ 05 / API TESTING                 │
│ Postman · Swagger                │
└──────────────────────────────────┘
```

各列編號只用於建立閱讀順序，不代表能力排名或熟練度。面板標題不顯示總數範圍。

### 4.2 視覺語言

- 延續現有 Deep Navy、金黃與墨黑的 Modern Bauhaus 視覺。
- 資訊板使用接近 `--color-ink` 的深色底、細框線及黃色小面積重點。
- 分類標籤使用 Mono 字體與大寫英文；技術名稱維持清楚易讀，不做 Logo 牆。
- 各列以細線分隔，避免大量膠囊標籤造成視覺雜訊。
- 不新增外部圖示、圖片、套件、動畫或滑鼠追蹤效果。
- 不讓 Hover 承載任何必要資訊；整個 Skill Set 預設即完整可見。

### 4.3 響應式排版

- Desktop：Hero 採左右雙欄，左側保留姓名、導讀與 CTA，右側資訊板約占 38%–42%。
- 建議 Grid：
  `grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr)`。
- Skill Set 面板建議最大寬度約 `460px`，靠右對齊。
- Tablet（`<= 900px`）：改為單欄，資訊板放在 CTA 下方，寬度填滿容器。
- Mobile（`<= 760px`）：維持單欄；技術名稱允許自然換行，不做水平滑動。
- 重新檢查 Hero 的 `min-height` 與 padding，避免加入面板後在 360px 寬度產生裁切或
  非預期水平捲動。

## 5. 語意與無障礙

- Skill Set 建議使用 `<aside aria-labelledby="hero-skills-title">`。
- 面板標題使用 `<h2 id="hero-skills-title">Selected Skill Set</h2>`。
- 五個分類使用 `<ul>`／`<li>`，分類名稱可使用 `<h3>`。
- 裝飾性編號加上 `aria-hidden="true"`，避免輔助技術重複朗讀。
- 面板沒有操作行為，不加入 `tabindex`、按鈕或假連結。
- 文字與邊框必須符合現有高對比色彩；黃色底不得搭配低對比白字。
- 200% 文字縮放時內容不得重疊、裁切或遮住 Hero CTA。
- 不新增動態效果；現有 `prefers-reduced-motion` 行為不得退化。

## 6. 資料與元件設計

### 6.1 `src/data/skills.ts`

維持技能資料集中管理，不在 Hero 元件內重複硬編碼。可沿用現有介面：

```ts
export interface SkillGroup {
  title: string
  items: string[]
}
```

將 `skillGroups` 填入第 3 節核准的五個分類。若版面需要英文標籤，可在介面新增明確欄位，
例如 `label`，不要依陣列索引或 CSS 推導內容。

### 6.2 `src/components/home/HeroSection.vue`

- 匯入 `skillGroups`。
- 保留目前未提交的 Hero 文案修改，不得用 `HEAD` 版本覆蓋。
- 在既有 Hero 主要內容右側加入 Skill Set `<aside>`。
- 建議保留外層 `.hero-copy` 作為 Grid 容器，將目前的姓名、導讀與 CTA 包入具語意的
  左欄容器，再加入右欄面板。
- 不改變既有 CTA 文字、路由、GitHub 連結或複製 Email 行為。

### 6.3 `src/components/home/ApprovedContentSections.vue`

目前此元件會在 `skillGroups.length > 0` 時，於 Featured Projects 後方額外產生一個
未完成視覺設計的 Skills 區塊。這一輪填入 `skillGroups` 後會觸發重複呈現，因此必須：

- 暫時移除 `skillGroups` 匯入及對應的 `<section id="skills">`。
- 保留 Experience 的既有條件式呈現。
- 不建立第二份 Hero 專用技能陣列規避問題，以免同一組公開技能日後重複維護。

完整 Tech Stack 區塊日後若要恢復，應重新使用 `src/data/skills.ts` 的同一份資料。

### 6.4 `src/styles/global.css`

- 將 Hero 主容器改為可容納左右欄的 Grid。
- 新增範圍明確的 `.hero-skills*` 樣式，不使用通用元素選擇器污染其他頁面。
- 使用現有 CSS Variables，不增加重複色碼。
- 在既有 `900px`、`760px` media query 中完成堆疊與手機版調整。
- 不修改 Featured Projects、Project Detail 或 Footer 的無關樣式。

### 6.5 `.agents/CONTENT.md`

新增簡短的 `Approved skill set` 白名單段落，記錄第 3 節的五個分類及名稱正規化。
不得把履歷中的其他個人資訊一併加入。

### 6.6 `scripts/smoke-check.js`

依現有 smoke check 寫法加入最小但有價值的契約驗證：

- `skills.ts` 包含五個核准分類及技能。
- `HeroSection.vue` 匯入並呈現 `skillGroups`。
- `ApprovedContentSections.vue` 不再重複產生 Skills 區塊。
- 不出現星等、百分比、進度條或 `aria-valuenow` 等熟練度表達。

不要建立只檢查檔案存在的空泛測試。

## 7. 建議施工順序

1. 再次檢查 `git status --short`，保存並避開使用者的既有修改。
2. 更新 `.agents/CONTENT.md`，固定本次公開 Skill Set。
3. 填入 `src/data/skills.ts` 的集中式資料。
4. 調整 `ApprovedContentSections.vue`，防止技能內容重複出現。
5. 修改 `HeroSection.vue` 的語意結構與右側資訊板。
6. 在 `global.css` 完成 Desktop、Tablet、Mobile 樣式。
7. 更新 smoke check。
8. 執行自動化與人工驗收。
9. 檢查最終差異，確認沒有修改本任務範圍外的檔案。

未經使用者明確要求，不自行 Commit、Push 或建立 Pull Request。

## 8. 驗證矩陣

### 8.1 自動化

依序執行：

```text
npm run lint
npm run type-check
npm run build
npm run test:smoke
git diff --check
```

任何指令未執行或失敗時都必須明確回報，不得描述為通過。

### 8.2 人工版面

至少檢查：

| Viewport | 驗證重點 |
|---|---|
| 1440 × 900 | 左右欄比例、資訊板靠右、姓名與 CTA 不被壓縮 |
| 1280 × 800 | 首屏高度合理、五組技能完整可讀 |
| 768 × 1024 | Skill Set 正確移至 CTA 下方 |
| 390 × 844 | 自然換行、無裁切、無水平捲動 |
| 360 × 800 | 最窄支援寬度無非預期水平捲動 |

另檢查：

- 200% 文字縮放。
- 全站鍵盤 Tab 順序，確認新增的非互動面板不會取得焦點。
- `prefers-reduced-motion: reduce`。
- Hero CTA 的既有 Hover、Focus Visible、GitHub 與複製 Email 行為。

## 9. 不在本次範圍

- 不建立完整 Tech Stack 首頁區塊。
- 不加入熟練度、年資、星等、百分比、雷達圖或進度條。
- 不新增履歷未列出的技能。
- 不加入 Skill Logo、第三方資產或新的 npm 套件。
- 不修改 Hero 既有文案、CTA 或聯絡方式。
- 不修改專案卡片、詳情頁、導覽、Footer 或部署設定。
- 不修改或刪除 `.agents/IMPLEMENTATION-PLAN.md`。
- 不處理 `iSpan_AI_SinglePage/` 舊版原型。

## 10. Definition of Done

- Hero Desktop 右側正確顯示五組核准 Skill Set。
- Tablet 與 Mobile 改為單欄且不產生水平捲動。
- Skill 只在 Hero 顯示一次，不在 Featured Projects 後方重複出現。
- 畫面沒有星等、百分比、進度條或其他熟練度宣稱。
- 技能資料集中於 `src/data/skills.ts`，Hero 沒有重複硬編碼。
- 語意結構、對比、文字縮放、鍵盤與 Reduced Motion 驗收完成。
- Lint、type check、production build、smoke check 與 `git diff --check` 全部通過。
- 使用者目前在 `HeroSection.vue` 的既有修改獲得保留。
- `.agents/IMPLEMENTATION-PLAN.md` 保持存在且未被修改。
