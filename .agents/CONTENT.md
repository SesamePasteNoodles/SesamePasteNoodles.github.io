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

- Summary: 寵物照護媒合平台，整合會員驗證、照護媒合、寵物醫療紀錄、
  站內錢包與第三方付款流程。
- Verified development period: 2026-06-04 to 2026-07-19.
- Status: 開發紀錄已核對；正式發布狀態待確認。
- Technologies: Vue 3, Vite, Vue Router, Pinia, Axios, Bootstrap 5,
  ASP.NET Core Web API (.NET 10), EF Core 10, SQL Server, ASP.NET Core
  Identity Core, JWT, Google OAuth, ECPay, Azure Blob Storage, and GitHub
  Actions.
- Verified implementation areas: DB-First Identity stores, JWT and refresh-token
  rotation, security-stamp validation, Google sign-in, CAPTCHA, two-factor
  authentication and recovery codes, policy-based authorization, wallet
  transactions, ECPay checkout and callback verification, and administrative
  wallet review with OTP confirmation.

The project role, team size, repository URL, demo, release status, production
deployment, and outcome metrics remain unpublished until explicitly confirmed.

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

## Privacy

Personal information not listed in this document is private by default.
Photos, résumés, and other identifying materials require explicit approval
before publication.
