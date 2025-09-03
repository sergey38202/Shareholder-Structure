export interface ShareholderData {
  name: string;
  value: number;
  color: string;
}

export interface ApiShareholderData {
  holder: string;
  share_percent: string;
  last_updated: string;
  verified: boolean;
}

export interface ShareholderTableData {
  key: string;
  holder: string;
  percentage: number;
}

export interface ShareholderSummary {
  totalShareholders: number;
  largestShareholder: {
    name: string;
    percentage: number;
  };
  smallestShareholder: {
    name: string;
    percentage: number;
  };
}
