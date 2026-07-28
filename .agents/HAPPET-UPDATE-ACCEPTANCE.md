# HAPPET 作品集資訊更新驗收標準

> 文件角色：本文件只供修改完成後進行獨立複核。施工內容與依據請使用
> [`HAPPET-UPDATE-SPEC.md`](./HAPPET-UPDATE-SPEC.md)。不得因本文件的檢查項目
> 擴張施工範圍，也不得在施工尚未完成時預先填寫通過結果。

## 1. 驗收前提

- HAPPET 公開版 Repository 保持未修改。
- 作品集變更範圍可由 Git diff 清楚辨識。
- 使用者既有或其他工作的變更未被覆寫。
- 驗收者已閱讀修改書、HAPPET 公開 README、Security、Payment 與相關程式碼。
- 驗收結果只根據實際檔案、執行輸出與畫面，不以施工 Agent 的自述代替證據。

## 2. 內容正確性

全部符合才通過：

- HAPPET 顯示為五人團隊專案。
- 開發期間仍為 `2026-06-04 — 2026-07-22`。
- 公開版日期另列為 `2026-07-28`，未冒充開發期間。
- 狀態明確表示公開展示版已發布且可本機建置。
- Repository 指向 <https://github.com/SesamePasteNoodles/HAPPET>。
- License 顯示 MIT。
- 沒有 HAPPET Demo URL 或 Production Deployment 宣稱。
- 專案摘要涵蓋團隊平台範圍，但沒有把全部功能歸為個人完成。
- 個人角色明確聚焦會員／身分驗證、Wallet、Payment 與前後端整合。
- Contribution Section 有實際內容，不再顯示未核准 placeholder。
- `.agents/CONTENT.md`、`src/data/projects.ts` 與畫面呈現彼此一致。

## 3. 技術敘述正確性

全部符合才通過：

- DB-First Identity 僅描述公開程式碼中存在的自訂 User／Role Store。
- Token 敘述包含 JWT、Refresh Token Rotation 與 Security Stamp，但沒有使用
  「絕對安全」或「完全防止」等保證。
- Wallet 並行控制描述為 Database Transaction、`RowVersion` 樂觀並行控制、
  衝突處理、重試或回滾。
- 全站 HAPPET 內容未再宣稱 Wallet 使用悲觀鎖定。
- OTP 明確限定為管理員查看真實錢包餘額前的 Email 二次驗證。
- 未宣稱提款核准／拒絕端點本身強制 OTP。
- 未宣稱存在無法由程式碼查核的完整 Audit Log。
- ECPay 敘述區分 CheckMacValue 驗證、Callback／Webhook 與冪等處理。
- HAPPET 技術標籤包含 JavaScript，未誤寫為 TypeScript。
- HAPPET 技術標籤未包含公開版中不存在的 GitHub Actions workflow。
- 沒有無來源的效能、安全、使用者、收入或其他量化成果。

## 4. Repository 與 CTA

全部符合才通過：

- 首頁或 Projects 卡片仍可正常進入 HAPPET Detail。
- HAPPET Detail 顯示有效的 Repository CTA。
- Repository CTA 是實際連結，不是 `href="#"`。
- 未渲染空的 Demo 按鈕、假 Demo 按鈕或不可操作 CTA。
- 外部連結行為符合現有站點慣例，鍵盤可聚焦且有可見的 `:focus-visible`。

## 5. 圖片與隱私

逐張檢視原始資產與實際頁面，全部符合才通過：

- HAPPET 不再使用 CSS placeholder 作為 Card 或 Hero 主視覺。
- Card、Hero 與 Gallery 使用真實 HAPPET 系統畫面。
- Gallery 收錄公開版 `Snapshot` 目錄中的全部九張系統截圖。
- 九張圖片均直接使用原圖，未裁切、遮罩、修圖或轉換格式。
- 九張 HAPPET 圖片與公開版來源 PNG 檔案雜湊逐張相同。
- 畫面中的姓名、示範 Email、電話、地址與使用者照片已獲使用者明確核准原樣公開。
- 圖片文字在 Desktop 與放大檢視時仍具合理可讀性。
- 每張圖片具有準確且不重複圖說的替代文字。
- Gallery 圖說清楚標示畫面功能，不把團隊功能錯寫成個人成果。
- 圖片 Modal 的 ESC、背景關閉、焦點移入與焦點還原正常。

## 6. 規劃文件一致性

全部符合才通過：

- `planning.md` 不再宣稱 HAPPET 沒有公開 Repository、角色、圖片或個人貢獻。
- `planning.md` 不再要求 HAPPET 使用 placeholder。
- `IMPLEMENTATION-PLAN.md` 不再把「等待 HAPPET 公開授權」列為目前阻塞。
- Phase 4 只有在本文件全部必要項目完成後才可標記完成。
- 歷史紀錄與本次無關的 Phase、設計決策及既有驗證結果未被任意刪除。
- 修改書與驗收標準仍為兩份獨立文件，沒有被合併。

## 7. 自動化檢查

在作品集根目錄依序執行：

```powershell
npm run lint
npm run type-check
npm run build
npm run test:smoke
git diff --check
```

判定方式：

- 每個命令 Exit Code 必須為 0。
- 不得只因 `npm run build` 內含 type-check 而省略獨立的 type-check 紀錄。
- 若修改 smoke check，必須確認它驗證新的公開狀態、Repository 或舊 placeholder
  移除情況，而不是單純刪除失敗檢查。
- 若任何命令因環境而未執行，整體不得標示為完整通過；需明列未驗證範圍與原因。

## 8. 跨裝置與互動檢查

至少檢查：

| 裝置 | 建議 Viewport | 必查內容 |
|---|---:|---|
| Desktop | 1280 × 800 | Card／Hero 圖片比例、Repository CTA、Gallery、Modal |
| Tablet | 768 × 1024 | 圖文重排、Metadata、CTA、圖片可讀性 |
| Mobile | 390 × 844 | 單欄順序、CTA 高度、圖片完整呈現、Modal |
| Small Mobile | 360 × 800 | 無水平捲動、文字與技術標籤不溢出 |

另外確認：

- 鍵盤可依合理順序操作 HAPPET 頁面所有互動元件。
- Hover 不是唯一資訊來源。
- `prefers-reduced-motion` 下沒有不必要動畫。
- 直接開啟與重新整理 HAPPET Hash Route 不出現 404。
- HAPPET 圖片載入失敗時仍有可理解的替代資訊。

## 9. 回歸檢查

全部符合才通過：

- 其他兩個 Featured Projects 的內容、圖片、排序與 CTA 未被改壞。
- Projects 總覽仍維持 Desktop 橫向卡片與 Tablet／Mobile 單欄版型。
- HAPPET `featuredOrder` 仍符合既有策展順序。
- Header、Footer、Back to top 與 Copy Email 行為未受影響。
- 沒有新增 Bootstrap 或其他 UI framework 到作品集。
- 沒有修改 HAPPET 公開版 Repository。
- 沒有非本任務所需的大範圍重構或格式化。

## 10. 最終驗收報告格式

驗收者應分開回報：

1. 結論：通過／部分通過／不通過。
2. 內容與技術正確性結果。
3. 圖片隱私檢查結果。
4. 自動化命令與 Exit Code。
5. Desktop、Tablet、Mobile、Small Mobile 與鍵盤檢查結果。
6. 未通過項目、證據位置與建議修正。
7. 未執行或無法驗證的範圍。

未實際執行的檢查不得標示為通過。
