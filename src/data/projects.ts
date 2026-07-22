export interface Project {
  slug: string
  name: string
  summary?: string
  status?: string
  period?: string
  technologies?: string[]
  highlights?: string[]
  license?: string
  repositoryUrl?: string
  demoUrl?: string
  images?: ProjectImage[]
}

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

/**
 * Public project content is added only after it has been explicitly approved.
 * The route and views already support future entries without placeholder copy.
 */
export const projects: Project[] = [
  {
    slug: 'shi-ruan-ticketing-system',
    name: '石阮售票系統',
    summary:
      '基於 C# WinForms 與 SQL Server／Dapper 開發的桌面端售票系統，實作動態座位圖、連續座位檢核，以及 60 秒鎖單與逾時自動釋放流程。',
    status: '核心購票流程完成／個人獨立開發',
    period: '2026.04',
    technologies: [
      'C# 14',
      '.NET 10',
      'Windows Forms',
      'SQL Server',
      'Dapper',
      'ADO.NET',
      'SQL Transaction',
    ],
    highlights: [
      '以 SQL Transaction 封裝訂單建立、座位條件式鎖定與票券快照寫入，維持多步驟交易的原子性。',
      '整合 WinForms Timer 與 FormClosing 生命週期，實作 60 秒付款倒數及逾時、離場自動釋放座位。',
      '依場次動態渲染座位圖，加入連續座位檢核與結帳階段的單張退選、即時計價重算。',
      '以票價與座位區域快照保存交易當下資料，並使用 UNIQUEIDENTIFIER 建立電子票券識別憑證。',
    ],
    repositoryUrl: 'https://github.com/SesamePasteNoodles/winforms-ticket-practice',
    images: [
      {
        src: 'projects/shi-ruan/01-main-card-mode.png',
        alt: '石阮售票系統活動總覽的大圖卡片模式',
        caption: '活動總覽與關鍵字搜尋入口。',
      },
      {
        src: 'projects/shi-ruan/07-seat-selection.png',
        alt: '石阮售票系統依場次動態產生的座位選擇畫面',
        caption: '依場地資料動態渲染座位區域、排數與可售狀態。',
      },
      {
        src: 'projects/shi-ruan/08-checkout-countdown.png',
        alt: '石阮售票系統結帳頁面的六十秒付款倒數',
        caption: '鎖單倒數、單張退選與總價即時重算。',
      },
      {
        src: 'projects/shi-ruan/10-my-tickets.png',
        alt: '石阮售票系統的電子票券卡片列表',
        caption: '保留購票快照與 UUID 識別憑證的電子票券。',
      },
    ],
  },
  {
    slug: 'happet',
    name: 'HAPPET',
    summary:
      '寵物照護媒合平台，整合會員驗證、照護媒合、寵物醫療紀錄、站內錢包與第三方付款流程。',
    status: '開發紀錄已核對；正式發布狀態待確認',
    period: '2026.06.04 — 2026.07.19',
    technologies: [
      'Vue 3',
      'Vite',
      'Vue Router',
      'Pinia',
      'Axios',
      'ASP.NET Core Web API',
      'EF Core 10',
      'SQL Server',
      'ASP.NET Core Identity',
      'JWT',
      'Google OAuth',
      'ECPay',
      'Azure Blob Storage',
      'GitHub Actions',
    ],
    highlights: [
      '以自訂 User／Role Store 將 ASP.NET Core Identity 整合至既有 DB-First Schema。',
      '串接 JWT、Refresh Token 輪替、Security Stamp、CAPTCHA、Google 登入與 2FA Recovery Codes。',
      '以 Policy-Based Authorization 區分完整登入、2FA 暫時憑證與管理操作權限。',
      '以資料庫交易與並行控制處理錢包儲值、扣款、退款及交易明細。',
      '抽象化付款 Gateway，實作 ECPay 結帳、CheckMacValue 驗證與 Callback 流程。',
      '後台錢包審核流程加入 OTP 驗證與操作紀錄。',
    ],
  },
  {
    slug: 'ai-agent-rules-sync',
    name: 'AI Agent 全域規範同步系統',
    summary:
      '以 PowerShell 集中建置、驗證、備份並安全同步 Codex 與 Antigravity 全域規範的管理工具。',
    status: '功能完成／可使用；正式發布狀態待確認',
    period: '2026.07.20 — 2026.07.21',
    technologies: [
      'Windows PowerShell 5.1',
      'PowerShell 7',
      'CMD',
      '.NET Runtime APIs',
      'JSON',
      'Markdown',
      'YAML',
      'GitHub Actions',
      'Gitleaks',
    ],
    highlights: [
      '由單一來源確定性建置 Codex 與 Antigravity 雙平台產物。',
      '以白名單、目的根目錄檢查與路徑穿越防護限制同步範圍。',
      '同步流程具備預覽、備份、SHA-256 驗證與失敗回滾。',
      '回復流程包含 reparse point、雜湊與全目標 preflight 檢查。',
      '建立跨 PowerShell 版本的隔離整合測試與 CI 設定。',
    ],
    license: 'MIT',
  },
]
