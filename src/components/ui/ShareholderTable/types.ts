import type { ShareholderData } from '@/types/shareholder';

export interface ShareholderTableData {
  key: string;
  holder: string;
  percentage: number;
}

export interface ShareholderTableProps {
  data: ShareholderData[];
  loading?: boolean;
}
