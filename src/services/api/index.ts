export { BaseApiService } from './base';
export { ShareholderApiService, shareholderApiService } from './shareholderApi';

export { default as apiClient, API_CONFIG } from '@/config/api';

export type {
  ApiResponse,
  ApiError,
  PaginationMeta,
  PaginatedResponse,
  ShareholderApiData,
  ShareholderListResponse,
} from '@/types/api';
