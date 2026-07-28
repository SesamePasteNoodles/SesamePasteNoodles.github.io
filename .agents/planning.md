# GitHub Pages 個人作品集網站規劃書（V3）

> 文件角色：本檔是專案的產品、內容與 UX 主規格。若與
> [`DESIGN-vercel.md`](./DESIGN-vercel.md) 衝突，以本檔為準；實際施工順序與驗收方式見
> [`IMPLEMENTATION-PLAN.md`](./IMPLEMENTATION-PLAN.md)。

## 零、已確立的設計決策

- 採用「Vercel 的閱讀效率＋深藍、金黃與黑色的 Modern Bauhaus 個性」，不直接複製 Vercel。
- 下一版視覺驗證以深藍為主體、金／芥末黃為重點、黑色為修飾；保留大寫標題、細實線／虛線與幾何編排。
- 首頁以快速理解與專案導流為主，技術深度移至 Project Detail／Case Study。
- 桌面版採頂部導覽搭配窄版黃色側軌，不再使用占畫面 20% 的大型固定側欄。
- Hero 使用技術資訊卡，不使用圖庫人物照；About 只有在個人照獲准公開後才使用，
  否則採純文字或非人物品牌圖形。
- Tech Stack 至少保留一個完整黑底區塊，作為全頁主要視覺節點。
- 動畫只提示狀態與操作，並支援鍵盤操作與減少動態偏好。
- 所有專案、技術與成效敘述必須能由實際成果佐證，不使用尚未完成的能力宣稱。

## 一、設計方向

網站以 **Deep Navy × Modern Bauhaus × Vercel-like Readability** 為方向。比例只用來表達設計優先順序：

- 70%：本專案的資訊架構、專案敘事與 Case Study。
- 25%：深藍、金黃與黑色建立的沉穩個人識別。
- 5%：Vercel 的字體、留白、細框線與工程感。

從 Vercel 參考中採用：

- 高對比的深色底與淡色文字
- 大量留白
- 細線框與 Grid 排版
- 清楚的字級階層
- 工程師與開發工具風格
- 專案截圖作為主要視覺

保留或強化的個人化元素：

- 品牌黃色作為重點色
- Hero 區域加入淡黃色光暈
- 局部網格背景
- 不規則 Bento Grid
- 卡片 Hover 動態
- 技術標籤與編號點綴
- 深藍區塊為主，墨黑用於導覽、Tech Stack 或局部分隔
- 窄版黃色側軌
- 大寫章節標題與細虛線
- About 區塊經核准的黑白人物照，或非人物品牌圖形

整體風格定位：

> 沉穩、理性、有工程深度，以克制的金黃細節保留銳度與個人識別。

---

## 二、視覺系統

### 2.1 色彩

#### 基礎色

```css
--color-background: #081526;
--color-background-soft: #10243e;
--color-background-muted: #172d48;

--color-text: #f2f1ec;
--color-text-secondary: #c8d0da;
--color-text-muted: #aab6c5;

--color-border: #30435a;
--color-border-strong: #52647a;
--color-ink: #05080d;
```

#### 品牌色

```css
--color-primary: #d6a928;
--color-primary-hover: #e3bb45;
--color-primary-soft: #2b2a20;
--color-primary-strong: #f0cd69;
```

品牌黃主要使用於：

- CTA 按鈕
- 區塊編號
- Hover 邊框
- 關鍵字底線
- 技術標籤
- 小型圖示
- Hero 光暈

避免大面積使用黃色，金黃視覺佔比原則上控制在 5–10%。
黑色主要用於導覽、卡片層次、Tech Stack 與操作狀態，不與深藍大面積混用而失去層次。

---

### 2.2 字體

#### 英文及數字

```text
Geist
Inter
system-ui
```

#### 中文

```text
Noto Sans TC
Microsoft JhengHei
sans-serif
```

#### 程式及技術文字

```text
Geist Mono
JetBrains Mono
monospace
```

---

### 2.3 字級

```text
Hero Title        64–80px
Section Title     40–48px
Project Title     28–36px
Card Title        20–24px
Body              16–18px
Caption           14–16px
Technical Label   14–15px
```

手機版 Hero Title 降至 42–48px。

`hero-status`、`.router-link-active`、`.mono-label`、`.hero-eyebrow` 與同類輔助小字，
桌面、平板與手機的實際呈現原則上不得小於 14px。下一版從 14px 起分階段比較
14px、15px 與 16px，連同行高、字重、字距與對比一起調整，以一般閱讀距離下
不需費力辨識，且不破壞視覺階層為驗收依據。不得單靠全大寫或過大字距強化識別。

---

### 2.4 圓角與陰影

以 Vercel 的精準感為主，不使用過度柔軟的圓角。

```text
Button       6–8px
Card         12px
Large Image  16px
Tag          999px
```

卡片預設以細框線建立層級，不依賴明顯陰影。

Hover 時才加入：

```css
box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
```

---

## 三、首頁 Wireframe

### 3.1 Desktop Wireframe

下圖以主內容區為主；實際畫面左側另有固定的 64–80px 黃色 Section Rail，
顯示 `RC.` 與目前章節編號。

```text
┌────────────────────────────────────────────────────────────┐
│ RC.       About   Skills   Projects   Experience   Contact │
│                                  GitHub   [複製 Email]      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  SELECTED WORK                                              │
│  ─────────────────────────                                 │
│                                                            │
│  Randy Chen                                                │
│  [APPROVED PROFESSIONAL TITLE]                              │
│                                                            │
│  [APPROVED PROFESSIONAL SUMMARY]                            │
│                                                            │
│  [查看精選作品]  [GitHub]                                  │
│                                                            │
│                                  ┌──────────────────────┐  │
│                                  │  JWT                 │  │
│        淡黃色光暈／網格背景         │  2FA                 │  │
│                                  │  WALLET              │  │
│                                  │  PAYMENT             │  │
│                                  └──────────────────────┘  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  01 / ABOUT                                                │
│                                                            │
│  從需求理解到系統實作                                      │
│                                                            │
│  [個人介紹文字........................]  ┌───────────────┐ │
│  [....................................]  │ Current Focus │ │
│  [....................................]  │ ASP.NET Core  │ │
│                                         │ Vue 3         │ │
│                                         │ System Design │ │
│                                         └───────────────┘ │
├────────────────────────────────────────────────────────────┤
│  02 / CORE STACK                                           │
│                                                            │
│  ┌──────────────────────┬───────────────────────────────┐ │
│  │ Backend              │ Frontend                      │ │
│  │ ASP.NET Core         │ Vue 3                         │ │
│  │ EF Core              │ TypeScript                    │ │
│  │ Dapper               │ Pinia                         │ │
│  ├──────────────────────┼───────────────────────────────┤ │
│  │ Data                 │ Tools                         │ │
│  │ SQL Server           │ Git / Docker                  │ │
│  │ Redis                │ Swagger / Postman             │ │
│  └──────────────────────┴───────────────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│  03 / FEATURED PROJECTS                                    │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ HAPPET / PETCARE                              01     │ │
│  │                                                      │ │
│  │ [APPROVED PROJECT SUMMARY]                           │ │
│  │                                                      │ │
│  │ ┌──────────────────────────────┐  ROLE               │ │
│  │ │                              │  [APPROVED ROLE]    │ │
│  │ │       專案大型截圖            │                     │ │
│  │ │                              │  STACK              │ │
│  │ └──────────────────────────────┘  [APPROVED STACK]   │ │
│  │                                                      │ │
│  │ [APPROVED HIGHLIGHTS]                [View Project] │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────┬───────────────────────────┐ │
│  │ PORTFOLIO                │ WINFORMS TICKET SYSTEM    │ │
│  │ 專案截圖                  │ 專案截圖                   │ │
│  │ Vue 3 / GitHub Pages     │ C# / WinForms / SQL      │ │
│  │ [View Project]           │ [View Project]           │ │
│  └──────────────────────────┴───────────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│  04 / EXPERIENCE                                           │
│                                                            │
│  [ONLY RENDER APPROVED EXPERIENCE CONTENT]                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  LET'S BUILD SOMETHING RELIABLE.                           │
│                                                            │
│  歡迎聯絡我討論職缺或合作機會。                             │
│                                                            │
│  [複製 Email]   GitHub                                     │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  © 2026 Randy Chen                          BUILT WITH VUE  │
└────────────────────────────────────────────────────────────┘
```

---

## 四、首頁區塊設計

### 4.1 Navbar

#### 排版

桌面版由「窄版側軌＋頂部導覽」組成。

窄版側軌：

```text
RC.
01
02
03
04
```

側軌建議寬度為 64–80px，使用品牌黃；章節編號跟隨目前捲動位置切換。

頂部導覽中間：

```text
About
Skills
Projects
Experience
Contact
```

右側：

```text
GitHub
複製 Email
```

#### 行為

- Sticky Navbar
- 桌面側軌固定，手機版隱藏
- 捲動後背景加入半透明白色
- 使用 `backdrop-filter: blur()`
- 目前區塊加入黃色底線
- 手機版改為 Menu Button
- 所有連結需有鍵盤 Focus 樣式與至少 44px 的互動高度

---

### 4.2 Hero

#### 目標

讓面試官第一眼理解：

- 姓名
- 經核准的專業定位
- 查看作品入口

#### 文案結構

```text
SELECTED WORK

Randy Chen
還在累積實務經驗的全端工程師
歡迎瀏覽我實際做過的專案、解決過的問題，以及還在持續學習的內容。
```

CTA：

```text
查看精選作品
GitHub
複製 Email
```

#### 視覺點綴

Hero 不放一般人物大頭照或圖庫照片，改用技術型資訊卡：

```text
AUTH
JWT + REFRESH TOKEN

SECURITY
2FA + SECURITY STAMP

PAYMENT
WALLET + WEBHOOK
```

背景加入：

- 淡灰 Grid
- 黃色模糊光暈
- 少量黑色線條
- 滑鼠移動產生極輕微位移

Hero 高度建議：

```text
Desktop：85–95vh
Mobile：自動高度，最少 720px
```

---

### 4.3 About

採用左右雙欄。

#### 左欄

- 大標題
- 100～150 字介紹
- 求職方向

#### 右欄

個人照獲准公開時，使用真實黑白人物照與資訊卡的組合；未獲准時改用純文字或
非人物品牌圖形，不使用圖庫人物照或無關裝飾插圖。

```text
CURRENT FOCUS

Backend Architecture
Authentication & Security
Transaction Consistency
Frontend Integration
```

點綴方式：

- 黃色序號
- 細框線
- Hover 時局部背景變成淡黃色
- 人物照預設黑白，避免 Hover 後突然恢復全彩造成視覺跳脫

---

### 4.4 Tech Stack

使用黑底 Bento Grid，不使用單純 Logo 牆。此區塊延續原 SinglePage 的深色視覺，
卡片以深灰底、細框線與品牌黃編號建立層級。

```text
┌──────────────────┬────────────────────────┐
│ Backend          │ Frontend               │
│ 大卡             │ 大卡                   │
├──────────────────┼────────────┬───────────┤
│ Data             │ Tools      │ Principles│
└──────────────────┴────────────┴───────────┘
```

每張卡片包含：

- 分類名稱
- 技術清單
- 一句實際用途
- 簡單線性 Icon
- 技術編號

例如：

```text
01 / BACKEND

ASP.NET Core
EF Core
Dapper

RESTful API、身分驗證與交易流程實作。
```

---

### 4.5 Featured Projects

#### 專案數量

首頁固定展示三個：

1. HAPPET
2. WinForms 個人小專案（正式名稱待確認）
3. AI Agent 全域規範同步系統

首頁只負責精選與導流，不隨專案總數增加而持續堆疊。三個名額由內容資料的
`featured` 與 `featuredOrder` 明確控制，不自動等同最新三個專案。第四個之後的
專案收納於完整 Projects 頁；首頁提供「查看全部專案」入口。

#### HAPPET

作為主專案，佔完整寬度。

排版比例：

```text
圖片 65%
資訊 35%
```

資訊包含：

- 專案名稱
- 一句定位
- Role
- Tech Stack
- 三個核心亮點
- Case Study 按鈕
- 可驗證的實際截圖、Repository 或 Demo 連結

若尚未有可公開的 Repository 或 Demo，應明確標示專案狀態，不放置 `href="#"`。

#### 其他兩個專案

以雙欄卡片呈現。

卡片 Hover：

- 圖片放大 1.02 倍
- 邊框轉為品牌黃
- 箭頭向右移動
- 背景由白色變成 `#fafafa`

#### 未來專案與總覽頁收納

- `/#/projects` 顯示所有可公開專案，採用全寬橫向卡片列表（Desktop 圖片在左、內容在右；Tablet/Mobile 圖片在上、內容在下），初期不因只有三個專案而加入多餘篩選器，新增專案時自然增加新列擴充。
- `/#/projects/:slug` 顯示個別 Project Detail／Case Study，主視覺於標題與摘要之後、Metadata 前立即呈現。
- 未來若有無公開圖片的專案，採用具品牌語彙且可存取的 placeholder，不繪製虛構介面；HAPPET 已全面使用核准公開之真實操作圖片。
- 專案數量超過約 9～12 個時，再依實際內容評估分類、篩選或分頁。
- 新增專案預設進入完整 Projects 頁；是否進入首頁由人工策展決定。

---

### 4.6 Experience

不使用完整履歷卡片。只有 `.agents/CONTENT.md` 核准的經歷才能出現在此區；
沒有核准內容時，首頁省略 Experience。

```text
[APPROVED DATE]
[APPROVED EXPERIENCE TITLE]
[APPROVED SUMMARY]
```

每個節點使用黃色圓點。

---

### 4.7 Contact

Contact 採用淺黃色背景，作為結尾視覺收斂。

```text
LET'S BUILD SOMETHING RELIABLE.

歡迎聯絡我討論職缺或合作機會。

[複製 Email]
[GitHub]
```

Email 操作直接複製公開信箱至剪貼簿，並提供可見且可被輔助技術讀取的成功／失敗狀態，
不依賴使用者設定預設郵件應用程式。避免使用表單，降低維護成本。履歷只有在
`.agents/CONTENT.md` 明確核准後才加入。

---

## 五、Project Detail Wireframe

```text
┌────────────────────────────────────────────────────────────┐
│ ← Back to Projects                         GitHub   Demo    │
├────────────────────────────────────────────────────────────┤
│  HAPPET / PETCARE                                          │
│                                                            │
│  [APPROVED PROJECT SUMMARY]                                 │
│                                                            │
│  ROLE              TEAM             YEAR                    │
│  [APPROVED ROLE]   5-Person Team    2026.06–2026.07         │
│                                                            │
│  [APPROVED TECH STACK]                                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                 大型專案 Hero 截圖                          │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  PROJECT OVERVIEW                                          │
│                                                            │
│  專案背景與開發目的                    MY ROLE              │
│  ...............................       JWT                  │
│  ...............................       2FA                  │
│                                        Wallet               │
│                                        Payment              │
├────────────────────────────────────────────────────────────┤
│  TECHNICAL HIGHLIGHTS                                      │
│                                                            │
│  01 Authentication                                         │
│  問題 → 設計 → 原因 → 結果                                 │
│                                                            │
│  02 Wallet & Payment                                       │
│  問題 → 設計 → 原因 → 結果                                 │
│                                                            │
│  03 Transaction Consistency                                │
│  問題 → 設計 → 原因 → 結果                                 │
├────────────────────────────────────────────────────────────┤
│  ARCHITECTURE                                              │
│                                                            │
│  ┌────────────────────────┬─────────────────────────────┐ │
│  │ Login / 2FA Flow       │ Deposit Flow                │ │
│  │ 流程圖                  │ 流程圖                       │ │
│  └────────────────────────┴─────────────────────────────┘ │
│                                                            │
│  點擊圖片後使用 Modal 放大                                 │
├────────────────────────────────────────────────────────────┤
│  SCREENSHOTS                                               │
│                                                            │
│  ┌────────────┬────────────┬────────────┐                 │
│  │ Login      │ Wallet     │ Admin      │                 │
│  └────────────┴────────────┴────────────┘                 │
├────────────────────────────────────────────────────────────┤
│  LESSONS LEARNED                                           │
│                                                            │
│  問題                    做法                   改進方向     │
├────────────────────────────────────────────────────────────┤
│  NEXT PROJECT                            Back to Projects → │
└────────────────────────────────────────────────────────────┘
```

---

## 六、Project Detail 設計原則

專案詳情頁改為偏向技術文件與 Case Study 的閱讀方式。

### 使用方式

- 主背景白色
- 長文內容最大寬度約 760px
- 圖片與流程圖最大寬度約 1200px
- 技術標籤使用等寬字體
- 章節前加入編號
- 重點卡片使用淺灰或淡黃色背景

### 避免

- 所有資訊都塞進卡片
- 過多左右滑動區塊
- 大量動畫
- 每個段落都使用不同版型
- 流程圖縮得太小

---

## 七、互動設計

互動只用於提示操作，不做炫技動畫。

### 基礎動畫

```text
頁面進入：Opacity + TranslateY
時間：300～500ms
```

必須支援 `prefers-reduced-motion: reduce`；啟用時停用位移、視差與圖片縮放，
只保留必要的狀態切換。

### Card Hover

```text
圖片 Scale：1 → 1.02
邊框：灰色 → 黃色
箭頭：translateX(4px)
```

### 技術標籤

Hover 時：

```text
背景：白色 → 淡黃色
文字：黑色 → 深黃色
```

### Back to top

- 預設在 `window.scrollY > 480px` 時顯示，480px 為新版測試的初始門檻，可依實際 Hero 高度微調。
- 按鈕固定於視窗右下角，需考慮 Mobile safe area，不得遮擋 CTA 或其他固定操作。
- 觸發後回到頁面頂端；一般模式可平滑捲動，`prefers-reduced-motion: reduce` 時改為即時跳轉。
- 使用真實 `<button>`，提供可理解的 accessible name、可見 `:focus-visible` 狀態與至少 44×44px 觸控範圍。
- 顯示與隱藏不得造成版面位移；隱藏時不得留在鍵盤 Tab 順序中。

### 圖片 Modal

適用於：

- 系統架構圖
- 登入流程圖
- 金流流程圖
- 實機截圖

功能：

- 點擊放大
- ESC 關閉
- 點擊背景關閉
- 上一張／下一張
- 顯示圖片名稱
- 開啟後將焦點移入 Modal，關閉後將焦點還給觸發按鈕
- 鍵盤可操作上一張、下一張與關閉

### 無障礙與可用性

- 所有互動元件需有可見的 `:focus-visible` 狀態。
- 文字與背景需維持足夠對比；黃色主要作為底色、邊框與裝飾，不承載低對比白字。
- 圖片需提供具體替代文字；純裝飾圖形使用空替代文字或從輔助技術隱藏。
- 導覽、Modal、專案卡片與 Mobile Menu 必須可只用鍵盤完成操作。
- 不以 Hover 作為唯一資訊來源。
- 行動裝置不得產生非預期水平捲動。

---

## 八、RWD 規劃

### Desktop

```text
最大內容寬度：1200px
左右 Padding：32px
```

### Tablet

```text
兩欄 Grid 保留
Hero 技術卡縮小
Project 主卡改為上下排列
```

### Mobile

```text
Navbar 改為選單
黃色側軌隱藏
Hero 改為單欄
About 改為單欄
Tech Stack 全部單欄
Project Card 全部上下排列
Experience Timeline 靠左
CTA 按鈕滿版或雙欄
```

手機版避免將所有技術 Tag 顯示完整，保留重要項目即可。

---

## 九、元件規劃

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   ├── SectionRail.vue
│   │   ├── AppFooter.vue
│   │   └── SectionContainer.vue
│   │
│   ├── home/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── TechStackGrid.vue
│   │   ├── FeaturedProjects.vue
│   │   ├── ExperienceTimeline.vue
│   │   └── ContactSection.vue
│   │
│   ├── project/
│   │   ├── ProjectHero.vue
│   │   ├── ProjectOverview.vue
│   │   ├── TechnicalHighlight.vue
│   │   ├── ArchitectureGallery.vue
│   │   ├── ScreenshotGrid.vue
│   │   └── LessonsLearned.vue
│   │
│   └── shared/
│       ├── BaseButton.vue
│       ├── TechTag.vue
│       ├── ProjectCard.vue
│       ├── SectionHeading.vue
│       ├── BackToTopButton.vue
│       └── ImageModal.vue
│
├── views/
│   ├── HomeView.vue
│   ├── ProjectDetailView.vue
│   └── NotFoundView.vue
│
├── content/
│   └── projects/
│       ├── happet.json
│       ├── winforms-project.json
│       └── ai-agent-rules-sync.json
│
├── data/
│   ├── skills.ts
│   └── experience.ts
│
├── router/
│   └── index.ts
│
└── styles/
    ├── variables.css
    ├── global.css
    └── utilities.css
```

### 9.1 元件拆分原則

- View 僅負責路由資料取得、頁面層狀態與區塊組合，不直接承載可獨立封裝的大型 UI 區塊。
- 具重複用途、獨立職責、互動狀態或一致視覺語意的 UI，應拆成可重用 Component。
- 共用元件透過 Props、Slots 與 Emits 定義清楚介面，不直接依賴特定頁面的資料結構或路由狀態。
- 頁面專屬的區塊放在對應功能目錄；跨頁面的基礎 UI 放在 `shared/`；全站骨架放在 `layout/`。
- 重複內容與業務資料由 `data/` 模組提供，不得在多個 View 或 Component 重複硬編碼。
- 拆分以職責、可讀性與重用價值為依據；單次、簡單且無獨立行為的標記不必為了元件數量過度拆分。

### 9.2 專案內容模型與 CMS 擴充

專案內容從第一版起採 CMS-ready 的資料結構，不將 Project Detail 正文或圖片清單
硬編碼在 Vue 元件。建議每個專案使用獨立 JSON 內容檔，圖片集中在對應目錄：

```text
src/content/projects/
├── happet.json
├── winforms-project.json
└── ai-agent-rules-sync.json

public/images/projects/
├── happet/
├── winforms-project/
└── ai-agent-rules-sync/
```

內容檔至少包含：

- `slug`、名稱、摘要、狀態、分類、角色、團隊人數與技術標籤。
- `featured`、`featuredOrder`、封面圖與有效的 Repository／Demo 狀態。
- 可排序的 `sections` 區塊；每個區塊以 `type` 決定 Vue 呈現元件。
- 每張內容圖片的路徑、替代文字、圖說及必要的版型設定。

第一版支援的內容區塊以受控版型為主：

```text
richText
imageWithCaption
textWithImage
imageGallery
technicalHighlight
```

`textWithImage` 可選圖片在左或右；`imageGallery` 可包含多張圖片，且每張圖片都有
獨立的 `alt` 與 `caption`。後台所稱的「自由編排」是調整區塊順序並選擇上述版型，
不提供任意像素拖拉，以維持 RWD、鍵盤操作、圖片語意與視覺一致性。

公開站仍部署於 GitHub Pages。後續 CMS 優先評估 Git-backed 方案，由後台將內容與
媒體提交回 Repository，再由 GitHub Actions 重新建置；CMS 不取代 Vue、Vite、
Router 或既有部署流程。登入與 Repository 寫入憑證不得存入前端程式碼或提交至
版本控制。

預設不引入 Bootstrap。Grid、Container、RWD 與視覺樣式以原生 CSS／CSS Grid
完成，避免多一層樣式覆寫與不必要的前端負擔。只有在實作階段確認某項元件確實
能降低維護成本時，才另行評估相依套件。

路由預設採 Vue Router Hash History，以避免 GitHub Pages 直接開啟專案詳情頁時
出現 404。若之後改用自訂網域與支援 Rewrite 的託管服務，再評估 Web History。

---

## 十、開發順序

本節只保留階段摘要；詳細任務與驗收條件見 `IMPLEMENTATION-PLAN.md`。

目前狀態（2026-07-28）：Phase 0–6 已完成（包含 HAPPET Case Study 與真實圖片更新）；Phase 7 為需求成立時才導入的條件式階段。目前 roadmap 規劃至 Phase 7，未規劃 Phase 8。

### Phase 0：內容與技術基線

- 依 `.agents/CONTENT.md` 確認公開資訊，並確認專案角色與公開範圍
- 確認新專案目錄與技術基線
- 移除假連結、圖庫人物照與無法佐證的敘述

### Phase 1：專案骨架與資料模型

- Vue、TypeScript、Vite
- Router 與 Hash History
- CMS-ready Projects content files、Skills 與 Experience data modules
- Layout 與共用元件

### Phase 2：設計系統

- CSS Variables
- Typography
- Button
- Card
- Container
- Section Heading
- Navbar 與 Section Rail
- Focus、Reduced Motion 與響應式基線

### Phase 3：首頁

- Navbar
- Hero
- About
- Tech Stack
- Featured Projects
- Experience
- Contact
- Footer

### Phase 4：Project Detail

- Project Hero
- Overview
- Technical Highlights
- Architecture
- Screenshots
- Lessons Learned
- WinForms 個人小專案
- AI Agent 全域規範同步系統

### Phase 5：互動與 RWD

- Hover
- Scroll Animation
- Image Modal
- Mobile Menu
- Responsive Layout

### Phase 6：部署與最佳化

- GitHub Actions
- GitHub Pages
- SEO Metadata
- Open Graph
- 圖片壓縮
- Lighthouse 檢查
- 404 處理

### Phase 7：內容管理（需求達成時導入）

- 以 Git-backed CMS 管理專案內容與媒體，優先評估 Pages CMS
- 設定多圖、圖說、替代文字、區塊排序及受控版型欄位
- 編輯儲存後 Commit 回 Repository，觸發既有 GitHub Actions 部署
- 驗證登入、最小 Repository 權限、媒體路徑與內容還原流程

各 Phase 的工作項目、依賴、驗收條件與停止條件，以
[`IMPLEMENTATION-PLAN.md`](./IMPLEMENTATION-PLAN.md) 為準。

---

## 十一、V3 最終方向

本網站不直接複製 Vercel，而是採用其：

- 清楚的資訊架構
- 黑白精準感
- 細框線
- 大量留白
- Grid 排版
- 技術型字體

再加入：

- 品牌黃色
- 淡黃色光暈
- Bento Grid
- 黑白區塊交錯
- 卡片 Hover
- 技術編號
- 專案大圖
- 窄版黃色側軌
- 大寫標題與細虛線
- About 經核准的黑白人物照，或非人物品牌圖形

最後形成：

> **Vercel 的閱讀效率、SinglePage 的黑白黃個性，以及能被面試官快速驗證的工程案例。**
