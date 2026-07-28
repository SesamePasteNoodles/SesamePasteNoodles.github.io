# Portfolio Content Policy

This document defines the personal information approved for publication on
this portfolio.

## Public profile

- Name: Randy Chen
- Email: `randy861028@gmail.com`
- GitHub: <https://github.com/SesamePasteNoodles>

## Project links

Repository and demo links are published only after they have been verified.
Unavailable links are omitted rather than replaced with empty or placeholder
links.

## Approved project content

### 石阮售票系統 (Shi-Ruan Ticketing System)

- Summary: 基於 C# WinForms 與 SQL Server／Dapper 開發的桌面端售票系統，
  實作動態座位圖、連續座位檢核，以及 60 秒鎖單與逾時自動釋放流程。
- User-confirmed development period: 2026-04.
- Project type: 個人獨立開發。
- Status: 核心購票流程完成；少數輔助介面仍保留 TODO。
- Technologies: C# 14, .NET 10, Windows Forms, SQL Server, Dapper, ADO.NET,
  SQL Transaction, and System.Windows.Forms.Timer.
- Verified implementation areas: dynamic seat-map rendering, contiguous-seat
  validation, transactional order and seat locking, 60-second checkout timeout,
  automatic seat release, ticket snapshots, and UUID ticket identifiers.
- Repository: <https://github.com/SesamePasteNoodles/winforms-ticket-practice>
- Existing material: ten real application screenshots; four are selected for the
  portfolio detail page.

### HAPPET

- Summary: HAPPET 是由五人團隊協作開發的一站式寵物照護平台，整合會員安全、
  照護媒合、醫療與日常紀錄、社群、周邊商城，以及電子錢包與第三方支付流程。
- Verified development period: 2026-06-04 to 2026-07-22.
- Public release date: 2026-07-28.
- Status: 公開展示版已發布／可依文件於本機建置。
- Team size: 五人團隊全端專案。
- Approved personal role: 負責會員與身分驗證、電子錢包、第三方金流模組的後端設計及前後端整合。
- Repository: <https://github.com/SesamePasteNoodles/HAPPET>
- License: MIT.
- Technologies: JavaScript, Vue 3, Vite, Vue Router, Pinia, Axios, Bootstrap 5,
  ASP.NET Core Web API (.NET 10), EF Core 10, SQL Server, ASP.NET Core
  Identity, JWT, Google OAuth, TOTP 2FA, ECPay, IMemoryCache, and Azure Blob
  Storage.
- Approved personal contributions:
  - 會員與身分驗證模組 (Google OAuth 2.0, JWT, Refresh Token Rotation, TOTP 2FA & Recovery Codes, Security Stamp Token 撤銷, CAPTCHA, Policy-based Authorization & RBAC)
  - 電子錢包、提款申請與交易明細前後端串接與資料庫交易
  - ECPay CheckMacValue 簽章、Callback／Webhook 與冪等處理
  - 管理端錢包與提款審核功能
  - 上述模組的前後端串接
- Available materials: 九張真實系統截圖均已明確核准以原圖公開；畫面中的姓名、示範聯絡資料與使用者照片亦核准不經裁切、遮罩或修改直接顯示。

The online demo, production deployment, and outcome metrics remain unprovided.

### AI Agent 全域規範同步系統

- Summary: 以 PowerShell 集中建置、驗證、備份並安全同步 Codex 與 Antigravity
  全域規範的管理工具。
- Verified development period: 2026-07-20 to 2026-07-21.
- Status: 功能完成／可使用；正式發布狀態待確認。
- Technologies: Windows PowerShell 5.1, PowerShell 7, CMD, .NET runtime APIs,
  JSON, Markdown, YAML, Git, GitHub Actions, and Gitleaks.
- Verified capabilities: deterministic dual-platform builds, managed-file allowlists,
  path traversal protection, preview, backup, SHA-256 verification, rollback,
  defensive restore checks, and isolated cross-version integration-test design.
- License: MIT.
- Existing material: a real main-menu screenshot.

The project role, team size, repository URL, demo, release status, real-world usage,
and outcome metrics remain unpublished until explicitly confirmed.

## Approved skill set

The following five skill categories and normalized technology names are approved for publication in the Hero section:

- FRONTEND: Vue 3, Bootstrap, Pinia, Axios
- BACKEND: ASP.NET Core, EF Core, ADO.NET, Dapper
- DATABASE: Microsoft SQL Server
- VERSION CONTROL: Git, GitHub
- API TESTING: Postman, Swagger

No unapproved skills, proficiency ratings, percentages, progress bars, or other unverified personal details are permitted.

## Privacy

Personal information not listed in this document is private by default.
Photos, résumés, and other identifying materials require explicit approval
before publication.
