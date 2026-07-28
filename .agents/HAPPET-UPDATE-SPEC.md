# HAPPET 作品集資訊更新修改書

> 文件角色：本文件是交接給 AI Agent 的施工規格，只描述要修改的內容、依據、
> 邊界與交付物。成果驗收請另外使用
> [`HAPPET-UPDATE-ACCEPTANCE.md`](./HAPPET-UPDATE-ACCEPTANCE.md)，不得把驗收紀錄
> 或驗收結論寫回本文件。

## 1. 任務目標

依據 HAPPET 公開展示版 Repository，解除作品集目前對 HAPPET Repository、發布
狀態、團隊規模、個人貢獻與實機圖片的暫時保留，完成下列更新：

- 公開 HAPPET Repository、MIT License 與公開展示版狀態。
- 明確區分五人團隊共同成果與 Randy Chen 的個人貢獻。
- 修正現有 Case Study 中超過程式碼證據或描述不精確的技術敘述。
- 以使用者核准原樣公開的真實系統畫面取代 HAPPET CSS placeholder。
- 同步更新內容白名單、專案資料與相關規劃文件狀態。

本任務只修改作品集 Repository，不得修改 HAPPET 公開版 Repository。

## 2. 權威資料來源

### 2.1 HAPPET 公開版

- 本機來源：
  `E:\麻醬麵\Code\全端班_大專_寵物照護\公開版本`
- 公開 Repository：
  <https://github.com/SesamePasteNoodles/HAPPET>
- 主要分支：`public`
- 公開版日期：`2026-07-28`
- License：MIT

優先查閱：

- `README.md`
- `docs/architecture.md`
- `docs/security.md`
- `docs/payment.md`
- `docs/preview.md`
- `Snapshot/`
- 會員、Wallet、Payment、Identity 與 Authorization 相關實作

### 2.2 作品集現況

施工前必須查閱：

- `.agents/CONTENT.md`
- `.agents/planning.md`
- `.agents/IMPLEMENTATION-PLAN.md`
- `src/data/projects.ts`
- HAPPET 首頁卡片、Project Detail、Gallery、Modal 與相關 smoke check

若公開 README 的概括描述與程式碼行為衝突，以可直接查核的程式碼行為為準。

## 3. 已核准公開的事實

### 3.1 專案基本資料

- 正式名稱：HAPPET
- 專案類型：五人團隊全端專案
- 開發期間：`2026-06-04 — 2026-07-22`
- 公開版日期：`2026-07-28`
- 公開狀態：公開展示版已發布，可依文件於本機建置
- Repository：<https://github.com/SesamePasteNoodles/HAPPET>
- License：MIT
- 線上 Demo：未提供
- Production Deployment：未提供
- 成效數據：未提供

開發期間與公開版日期是不同欄位，不得把公開版日期改寫成開發結束日期。

### 3.2 團隊平台範圍

下列內容只能描述為團隊共同完成的平台功能：

- 會員與身分安全
- 寵物照護媒合
- 寵物醫療與日常照護紀錄
- 社群與論壇
- 寵物周邊商城
- 電子錢包與第三方支付

建議專案摘要：

> HAPPET 是由五人團隊協作開發的一站式寵物照護平台，整合會員安全、照護媒合、
> 醫療與日常紀錄、社群、周邊商城，以及電子錢包與第三方支付流程。

### 3.3 個人角色與貢獻

建議角色：

> 負責會員與身分驗證、電子錢包、第三方金流模組的後端設計及前後端整合。

允許列入個人貢獻：

- 會員與身分驗證模組
- Google OAuth 2.0
- JWT 與 Refresh Token Rotation
- TOTP 2FA 與 Recovery Codes
- Security Stamp Token 撤銷
- CAPTCHA
- Policy-based Authorization 與 RBAC
- 電子錢包、提款申請與交易明細
- ECPay CheckMacValue、Callback／Webhook
- Callback 冪等處理
- 管理端錢包與提款審核功能
- 上述模組的前後端串接

不得自行延伸為「技術負責人」、「後端 Lead」、「架構師」或其他未被核准的職稱。

## 4. 必要修改

### 4.1 `.agents/CONTENT.md`

更新 HAPPET 區段：

- 保留已核對的開發期間。
- 將待確認狀態改為公開展示版已發布。
- 加入公開版日期、五人團隊、個人角色、Repository 與 MIT License。
- 加入個人貢獻白名單。
- 加入「九張真實系統截圖與六份技術文件可作為素材來源」。
- 保留「未提供線上 Demo、Production Deployment 與成效數據」。
- 刪除 HAPPET 角色、團隊規模、Repository 與發布狀態仍未核准的舊敘述。

### 4.2 `src/data/projects.ts`

更新 `slug: 'happet'` 的專案資料：

- `status` 改為「公開展示版已發布／可本機建置」。
- 新增 `repositoryUrl`。
- 新增 `license: 'MIT'`。
- `period` 保留原開發期間。
- 在 Overview 顯示五人團隊與已核准角色。
- 將 Contribution Section 改為實際角色與個人貢獻，不得再顯示未核准 placeholder。
- 加入經處理的 HAPPET 圖片、替代文字與圖說。
- 使用真實圖片作為 `cardImage` 與 `heroImage`，移除 HAPPET 專用 CSS placeholder
  的實際使用；若該 CSS 已無其他用途，一併移除。
- 不設定 `demoUrl`。

技術標籤應以公開版實際內容為準，至少包含：

- JavaScript
- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Bootstrap 5
- ASP.NET Core Web API (.NET 10)
- EF Core 10
- SQL Server
- ASP.NET Core Identity
- JWT
- Google OAuth 2.0
- TOTP 2FA
- ECPay
- `IMemoryCache`
- Azure Blob Storage

`GitHub Actions` 不得列為 HAPPET 公開版技術標籤，因公開版沒有
`.github/workflows`。若未另行取得可公開證據，直接從 HAPPET 區段移除。

### 4.3 Case Study 技術敘述

保留可由程式碼佐證的主題：

- 自訂 User／Role Store 整合 DB-First Identity Schema。
- JWT、Refresh Token Rotation、Security Stamp、CAPTCHA、Google OAuth、
  TOTP 2FA 與 Recovery Codes。
- Policy-based Authorization 區分登入狀態、2FA 暫時憑證與角色權限。
- Wallet Database Transaction、`RowVersion` 樂觀並行控制、並行例外處理、
  重試與回滾。
- ECPay CheckMacValue、Callback 驗證與冪等處理。
- 逾期交易 Background Service。
- 管理員查看敏感錢包餘額前的 Email OTP 驗證。

必須修正：

- 將「悲觀／樂觀並行鎖定」改為「Database Transaction 搭配 `RowVersion`
  樂觀並行控制、衝突重試與失敗回滾」。
- 將「提款或錢包審核指令強制 OTP」改為「管理員查看會員真實錢包餘額前，
  需經 Email OTP 二次驗證」。
- 未證實有獨立 Audit Log 時，不得宣稱「完整 Audit Log 稽核軌跡」。
- 將「安全無虞」、「大幅強化」、「高並行」、「完全防止」等無量化證據的結論，
  改為具體機制、處理目的與可觀察行為。

### 4.4 HAPPET 圖片素材

建立：

```text
public/projects/happet/
```

核准素材：

1. `Snapshot/我的錢包.png`
2. `Snapshot/金流管理.png`
3. `Snapshot/會員中心.png`
4. `Snapshot/會員管理.png`
5. `Snapshot/媒合訂單畫面.png`
6. `Snapshot/專家接案紀錄.png`
7. `Snapshot/我的寵物_波波.png`
8. `Snapshot/社群首頁.png`
9. `Snapshot/電商首頁.png`

處理規則：

- 使用者已明確核准九張圖片全部原樣公開，包含畫面中的姓名、示範 Email、電話、
  地址與使用者照片。
- 九張圖片直接使用原圖，不裁切、不遮罩、不修圖、不轉換格式，也不建立衍生版本。
- 複製到作品集後可依現有命名慣例調整檔名，但檔案內容必須與來源 PNG 相同。
- 圖片必須有描述畫面目的的 `alt`，不得把圖說寫成個人成效或團隊功能的個人歸屬。

建議圖片用途：

- Card／Hero：我的錢包
- Gallery：上述九張原圖

### 4.5 `.agents/planning.md`

只更新已過期的 HAPPET 狀態：

- 移除 HAPPET 無公開 Repository、角色、圖片或個人貢獻的假設。
- 將 HAPPET placeholder 規劃改為真實專案圖片。
- 將 HAPPET Detail Metadata 更新為五人團隊、已核准角色與 Repository。
- 保留首頁快速導流、Detail 承載技術深度，以及區分團隊成果與個人貢獻的原則。

不要藉此重寫整份設計規格或改變網站視覺方向。

### 4.6 `.agents/IMPLEMENTATION-PLAN.md`

- 更新文件日期與目前進度敘述。
- 移除 Phase 4 因 HAPPET 公開授權不足而阻塞的紀錄。
- 將 Phase 4 後續工作改成：補齊 HAPPET Case Study、加入安全圖片、完成內容與
  跨裝置複核。
- 完成施工前不得先把 Phase 4 標記為完成。
- 保留歷史施工紀錄，不要刪除與本次無關的 Phase 或驗證結果。

### 4.7 相關程式與 smoke check

若現有元件或 smoke check 明確依賴 HAPPET placeholder、舊狀態或未公開文案，
只做完成本任務所需的最小修改。延續既有資料模型與受控 Section Renderer，不新增
CMS、UI framework 或新的內容系統。

## 5. 不在本次範圍

- 修改 HAPPET 公開版 Repository。
- 建立或部署 HAPPET 線上 Demo。
- 宣稱 HAPPET 已有 Production Deployment。
- 重新設計整個作品集。
- 新增與 HAPPET 更新無關的專案或個人資料。
- 製造效能、安全、使用者數、營收或轉換率等量化成效。
- 將團隊共同完成的媒合、醫療、社群或商城功能寫成 Randy Chen 的個人貢獻。
- Commit、Push 或建立 Pull Request；除非使用者另行明確要求。

## 6. 交付物

施工 Agent 應交付：

- 更新後的 `.agents/CONTENT.md`。
- 更新後的 `src/data/projects.ts`。
- 更新後的 `.agents/planning.md`。
- 更新後的 `.agents/IMPLEMENTATION-PLAN.md`。
- 未裁切、未遮罩且未轉換格式的 HAPPET 原始圖片資產。
- 因移除 placeholder 或舊文案所需的最小元件、樣式與 smoke check 修改。
- 一份簡潔變更摘要，列出實際修改檔案與未執行事項。
