export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  aspectRatio?: '16/9' | '16/10' | '4/3' | '1/1' | 'auto'
  layout?: 'contained' | 'full' | 'wide'
}

export interface OverviewSection {
  type: 'overview'
  title?: string
  description: string
  role?: string
  period?: string
  status?: string
  technologies?: string[]
}

export interface TextSection {
  type: 'text'
  title?: string
  paragraphs: string[]
}

export interface HighlightItem {
  title?: string
  problem?: string
  choice?: string
  reason?: string
  impact?: string
  description?: string
}

export interface HighlightsSection {
  type: 'highlights'
  title?: string
  items: HighlightItem[]
}

export interface MediaSection {
  type: 'media'
  title?: string
  image: ProjectImage
  layout?: 'contained' | 'full' | 'wide'
}

export interface GallerySection {
  type: 'gallery'
  title?: string
  images: ProjectImage[]
  columns?: 1 | 2 | 3 | 4
}

export interface TechnicalDecisionItem {
  title: string
  problem: string
  choice: string
  reason: string
  impact: string
}

export interface TechnicalDecisionSection {
  type: 'technicalDecision'
  title?: string
  decisions: TechnicalDecisionItem[]
}

export interface ContributionSection {
  type: 'contribution'
  title?: string
  summary?: string
  items?: string[]
}

export type ProjectSection =
  | OverviewSection
  | TextSection
  | HighlightsSection
  | MediaSection
  | GallerySection
  | TechnicalDecisionSection
  | ContributionSection

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
  sections?: ProjectSection[]
  featured?: boolean
  featuredOrder?: number
  cardImage?: ProjectImage
}

/**
 * Public project content is added only after it has been explicitly approved.
 * The route and views support future entries without placeholder copy.
 */
export const projects: Project[] = [
  {
    slug: 'shi-ruan-ticketing-system',
    name: '石阮售票系統',
    featured: true,
    featuredOrder: 2,
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
    sections: [
      {
        type: 'overview',
        title: '專案簡介與背景',
        description:
          '石阮售票系統是一款基於 C# WinForms 與 SQL Server / Dapper 開發的桌面端售票管理應用。本專案為個人獨立開發作品，重點在於實作嚴謹的交易原子性、60 秒鎖單結帳計時器、離場自動釋放機制，以及依場次動態渲染座位圖與連續選位校驗。',
        role: '個人獨立開發',
        period: '2026.04',
        status: '核心購票流程完成；少數輔助介面仍保留 TODO',
        technologies: [
          'C# 14',
          '.NET 10',
          'Windows Forms',
          'SQL Server',
          'Dapper',
          'ADO.NET',
          'SQL Transaction',
        ],
      },
      {
        type: 'technicalDecision',
        title: '關鍵技術決策與解題邏輯',
        decisions: [
          {
            title: '多步驟交易原子性與座位鎖定',
            problem:
              '在熱門場次搶票或高並行情境下，若選位、建立訂單與寫入票券分段執行，極易引發重複售出 (Overbooking) 或狀態不一致。',
            choice:
              '採用 SQL Transaction 事務封裝，配合條件式 UPDATE 語法在單一數據庫事務內完成座位鎖定與訂單建立。',
            reason:
              '利用 SQL Server 引擎原生的 ACID 特性，免去外部分散式鎖的維護複雜度與延遲。',
            impact:
              '防範競態條件發生的重複售出，確保訂單與座位鎖定狀態的一致性。',
          },
          {
            title: '鎖單倒數與資源自動釋放',
            problem:
              '使用者選定座位後若離場、關閉視窗或未在規定時間內完成付款，座位將持續鎖定，造成場館營運庫存浪費。',
            choice:
              '整合 WinForms System.Windows.Forms.Timer 與 FormClosing 視窗生命週期事件，建立 60 秒結帳計時器與離場觸發機制。',
            reason:
              '前端視窗能在倒數結束或視窗關閉時主動發起座位釋放命令，並與資料庫進行安全同步。',
            impact:
              '確保未結帳座位可在 60 秒內或離場當下立即回歸可售狀態，提高熱門場次庫存運轉效率。',
          },
          {
            title: '場次動態座位圖與連續座位檢核',
            problem:
              '不同演藝場館的座位區域與排列方式差異極大，且多張購票時使用者普遍要求相鄰連續座位。',
            choice:
              '依場地 JSON/DB 定義動態產生 WinForms UI 控制項矩陣，並配合校驗演算法進行座位連續性檢測。',
            reason:
              '提供直觀視覺化選位體驗，並在選位當下及時阻擋非連續或跨排無效組合。',
            impact:
              '降低使用者誤選無效座位的機率，提升整體購票效率與結帳順暢度。',
          },
          {
            title: '票券快照與 UUID 驗證憑證',
            problem:
              '活動票價與座位分區未來可能調整，歷史訂單必須保持購票當時的真實價格與區位資訊。',
            choice:
              '建立票券快照 (Ticket Snapshot) 表記錄交易當下價格，並使用 UNIQUEIDENTIFIER 生成防偽票券碼。',
            reason:
              '隔離後續場次資料異動對過往訂單的影響，且 UUID 提供不可猜測的安全驗證碼。',
            impact:
              '保障消費爭議時的交易紀錄完整性，並可直接支援電子票券掃碼防偽驗證。',
          },
        ],
      },
      {
        type: 'gallery',
        title: '系統操作畫面展示',
        columns: 2,
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
    ],
  },
  {
    slug: 'happet',
    name: 'HAPPET',
    featured: true,
    featuredOrder: 1,
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
      'Bootstrap 5',
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
    sections: [
      {
        type: 'overview',
        title: '專案簡介與系統範圍',
        description:
          'HAPPET 是一個專為寵物主人與照護服務者設計的全方位媒合平台。系統整合了身分驗證安全體系、照護媒合機制、寵物健康與醫療紀錄管理、站內儲值錢包以及第三方線上支付。後端採用 ASP.NET Core Web API 搭配 EF Core 10 與 SQL Server，前端基於 Vue 3 與 Pinia。',
        period: '2026.06.04 — 2026.07.19',
        status: '開發紀錄已核對；正式發布狀態待確認',
        technologies: [
          'Vue 3',
          'Vite',
          'Vue Router',
          'Pinia',
          'Axios',
          'Bootstrap 5',
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
      },
      {
        type: 'technicalDecision',
        title: '已驗證技術決策與架構亮點',
        decisions: [
          {
            title: 'DB-First Schema 整合 ASP.NET Core Identity',
            problem:
              '既有資料庫採用 DB-First 設計，無法直接套用 Identity 預設的 Code-First 表格結構與欄位命名。',
            choice:
              '撰寫自訂 IUserStore 與 IRoleStore 實作，將 ASP.NET Core Identity 的身分邏輯介接至既有 DB-First 實體模型。',
            reason:
              '保留既有資料庫關聯與歷史資料格式，同時享用 Identity 內建的全套密碼雜湊、權限控制與安全防禦 API。',
            impact:
              '在不破壞既有 DB Schema 的前提下，完成標準化且安全無虞的身分驗證模組。',
          },
          {
            title: '多層級身分驗證與安全令牌機制 (JWT, Refresh Token & 2FA)',
            problem:
              '醫療紀錄與金流儲值涉及敏感個資與資產安全，傳統 Session 易引發 Cross-Site 問題，而單一 JWT 無法及時廢止。',
            choice:
              '實作短效期 JWT、Refresh Token 滾動式輪替 (Rotation)、Security Stamp 即時校驗、CAPTCHA 人機驗證與 2FA Recovery Codes。',
            reason:
              '短效期 JWT 搭配 Security Stamp 能在使用者修改密碼或安全憑證時即時無效化所有已發出 Token。',
            impact:
              '構建多層級安全機制，降低 Token 被盜用與重放攻擊 (Replay Attack) 的風險。',
          },
          {
            title: '並行控制與交易一致性站內錢包 (Wallet & Concurrency Control)',
            problem:
              '高並行情境下，儲值、扣款與退款等金流操作易產生 Race Condition，導致帳務異動不符或餘額錯誤。',
            choice:
              '採用 SQL Database Transaction 事務包覆，配合悲觀／樂觀並行鎖定 (Concurrency Lock) 管理餘額與明細。',
            reason:
              '金流數據容錯率為零，必須確保每次金額變更與交易明細寫入具備 ACID 特性。',
            impact:
              '保障站內錢包流水帳與實際餘額計價精確，防範並行重複扣款或併發溢領。',
          },
          {
            title: '第三方金流抽象化與網關整合 (ECPay Gateway & Callback Verification)',
            problem:
              '串接綠界 ECPay 第三方支付需要處理 CheckMacValue 安全防偽簽章與非同步 Webhook Callback。',
            choice:
              '抽象化 IPaymentGateway 介面，封裝 CheckMacValue 簽章驗證演算法，並實作 Idempotency 冪等 Callback 處理器。',
            reason:
              '隔離第三方支付 SDK 與核心業務邏輯，防止網路重發 Callback 造成重複記帳或狀態錯亂。',
            impact:
              '提供穩定可靠的線上儲值與支付體驗，維護交易結果精確性與寫入冪等性。',
          },
          {
            title: '管理員高風險操作二次防線 (Admin Wallet Review & OTP)',
            problem:
              '管理員執行人工錢包審核或大額撥款時，若遭權限濫用或誤觸操作，將造成難以挽回的金流損失。',
            choice:
              '採用 Policy-Based Authorization 控管存取，並針對高風險審核指令強制要求輸入 OTP 一次性動態密碼。',
            reason:
              '為管理端核心權限加入二次授權機制與完整的 Audit Log 稽核軌跡記錄。',
            impact:
              '大幅強化平台內部控制能力，有效防範內部人員誤操作或權限遭冒用之風險。',
          },
        ],
      },
      {
        type: 'contribution',
        title: '專案團隊與角色說明',
        summary:
          '目前個人角色、團隊規模、專屬貢獻範圍、Repository 及發布狀態尚未核准公開。本頁面僅展示已核對與驗證之核心技術架構。',
        items: [],
      },
    ],
  },
  {
    slug: 'ai-agent-rules-sync',
    name: 'AI Agent 全域規範同步系統',
    featured: true,
    featuredOrder: 3,
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
    images: [
      {
        src: 'projects/ai-agent/main-menu.jpg',
        alt: 'AI Agent 全域規範同步系統 PowerShell 主選單介面',
        caption: '提供直覺式選單操作，支援同步、預覽 diff、SHA-256 驗證與自動回滾。',
      },
    ],
    sections: [
      {
        type: 'overview',
        title: '系統定位與開發背景',
        description:
          '以 PowerShell 集中建置、驗證、備份並安全同步 Codex 與 Antigravity 全域規範的管理工具。針對跨平台 AI Agent 工具規範格式與存放路徑分歧的問題，提供單一來源確定性建置、受控檔案白名單防護與嚴謹的備份還原流程。',
        period: '2026.07.20 — 2026.07.21',
        status: '功能完成／可使用；正式發布狀態待確認',
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
      },
      {
        type: 'technicalDecision',
        title: '核心架構與設計決策',
        decisions: [
          {
            title: '雙平台確定性建置 (Deterministic Dual-Platform Build)',
            problem:
              'Codex 與 Antigravity 兩大 AI Agent 工具的規範格式、檔名與儲存路徑各異，人工維護極易造成內容不一致。',
            choice:
              '建立 Single Source of Truth 原始檔案，透過 PowerShell 轉換引擎解析並確定性建置出雙平台對應的目標格式。',
            reason:
              '消除多重維護的人為疏失風險，保持發布至兩平台的規則邏輯一致。',
            impact:
              '實作一鍵建置同步，達成可重現的產物建置結果。',
          },
          {
            title: '受控檔案白名單與防護 (Managed-File Allowlist & Path Traversal Protection)',
            problem:
              '自動化腳本若缺少目標邊界檢查，在同步或覆寫過程中可能誤刪或破壞系統關鍵檔案，甚至面臨 Path Traversal 攻擊。',
            choice:
              '設定嚴格的 Managed-File Allowlist 白名單，並結合 .NET FileInfo API 驗證目的根目錄絕對路徑。',
            reason:
              '阻斷任何相對路徑穿越 (如 `../`) 的可能性，嚴格限定腳本僅能存取獲准的規範檔案。',
            impact:
              '提供嚴謹的防護邊界，防範非授權檔案存取與誤覆寫風險。',
          },
          {
            title: '安全同步與自動回滾 (Preview, SHA-256 & Rollback)',
            problem:
              '同步執行過程中若遇權限阻擋、檔案佔用或斷電，可能導致規範檔案處於半完成的毀損狀態。',
            choice:
              '設計「Preview 預覽 diff -> 建立全備份 -> 執行寫入 -> SHA-256 哈希比對驗證 -> 失敗發起自動 Rollback」流程。',
            reason:
              '確保每次同步操作均具備原子性 (All-or-Nothing)，任何一步驗證失敗均能即刻還原。',
            impact:
              '提供極高系統可復原性與防呆機制，保障開發環境規範檔案始終完好。',
          },
          {
            title: '跨 PowerShell 版本隔離測試 (Cross-Version Isolated Test Design)',
            problem:
              '團隊環境可能混用傳統 Windows PowerShell 5.1 與跨平台 PowerShell 7 (Core)，兩者語法與內建指令存在微小差異。',
            choice:
              '設計隔離的整合測試架構，使用原生 .NET Runtime API 替換跨版本行為不一致的 cmdlet，並加入 GitHub Actions 自動矩陣測試。',
            reason:
              '確保工具在不同的 OS 與 PowerShell 版本上皆能表現出預期的行為。',
            impact:
              '克服環境版本相容性障礙，實現極高穩定度的自動化運作。',
          },
        ],
      },
      {
        type: 'gallery',
        title: '系統主選單介面',
        columns: 1,
        images: [
          {
            src: 'projects/ai-agent/main-menu.jpg',
            alt: 'AI Agent 全域規範同步系統 PowerShell 主選單介面',
            caption: '提供直覺式選單操作，支援同步、預覽 diff、SHA-256 驗證與自動回滾。',
          },
        ],
      },
    ],
  },
]

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity))
}
