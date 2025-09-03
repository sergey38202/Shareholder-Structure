export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
  requestId: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  success: false;
  timestamp: string;
  requestId: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Shareholder API specific types
export interface ShareholderApiData {
  holder: string;
  share_percent: string;
  last_updated: string;
  verified: boolean;
}

export interface ShareholderListResponse
  extends ApiResponse<ShareholderApiData[]> {
  meta: {
    company_code: string;
    report_date: string;
    currency: string;
    total_shares: number;
  };
}
