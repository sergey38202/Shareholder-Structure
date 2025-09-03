import { BaseApiService } from './base';
import type { ShareholderApiData } from '@/types/api';
import type { ShareholderData } from '@/types/shareholder';
import mockData from '@/data/data.json';

export class ShareholderApiService extends BaseApiService {
  private readonly ENDPOINTS = {
    LIST: '/shareholders',
    BY_COMPANY: '/shareholders/company',
    DETAILS: '/shareholders/details',
  } as const;

  /**
   * Fetch shareholders by company code
   */
  async getShareholdersByCompany(
    companyCode: string
  ): Promise<ShareholderData[]> {
    try {
      await this.simulateNetworkDelay();

      const mockResponse = this.createMockApiResponse(mockData.SBER);

      return this.processShareholderData(mockResponse.data);
    } catch (error) {
      console.error('Failed to fetch shareholders by company:', error);
      throw new Error(
        `Failed to fetch shareholders for company ${companyCode}`
      );
    }
  }

  /**
   * Fetch all shareholders with pagination
   */
  async getAllShareholders(_page = 1, _limit = 20): Promise<ShareholderData[]> {
    console.log(_page, _limit);
    try {
      await this.simulateNetworkDelay();
      const mockResponse = this.createMockApiResponse(mockData.SBER);

      return this.processShareholderData(mockResponse.data);
    } catch (error) {
      console.error('Failed to fetch all shareholders:', error);
      throw new Error('Failed to fetch shareholders list');
    }
  }

  /**
   * Get shareholder details by ID
   */
  async getShareholderDetails(
    shareholderId: string
  ): Promise<ShareholderApiData> {
    try {
      await this.simulateNetworkDelay();

      const mockShareholder = mockData.SBER[0];
      return {
        ...mockShareholder,
        last_updated: new Date().toISOString(),
        verified: true,
      };
    } catch (error) {
      console.error('Failed to fetch shareholder details:', error);
      throw new Error(
        `Failed to fetch details for shareholder ${shareholderId}`
      );
    }
  }

  /**
   * Process raw API data into application format
   */
  private processShareholderData(
    rawData: ShareholderApiData[]
  ): ShareholderData[] {
    const grouped = rawData.reduce((acc, item) => {
      const holder = item.holder;
      const percentage = parseFloat(item.share_percent);

      if (acc[holder]) {
        acc[holder] += percentage;
      } else {
        acc[holder] = percentage;
      }

      return acc;
    }, {} as Record<string, number>);

    const processed = Object.entries(grouped).map(([holder, percentage]) => ({
      name: holder,
      value: percentage,
      color: '',
    }));

    const total = processed.reduce((sum, item) => sum + item.value, 0);

    if (total !== 100) {
      processed.forEach(item => {
        item.value = (item.value / total) * 100;
      });
    }

    const colors = [
      '#69CDFF',
      '#FF5555',
      '#FFC94F',
      '#37D881',
      '#9C27B0',
      '#FF9800',
    ];
    processed.forEach((item, index) => {
      item.color = colors[index % colors.length];
    });

    return processed;
  }

  /**
   * Create mock API response with proper structure
   */
  private createMockApiResponse(data: typeof mockData.SBER) {
    const enhancedData: ShareholderApiData[] = data.map(item => ({
      ...item,
      last_updated: new Date().toISOString(),
      verified: true,
    }));

    return {
      data: enhancedData,
      message: 'Shareholders retrieved successfully',
      success: true,
      timestamp: new Date().toISOString(),
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      meta: {
        company_code: 'SBER',
        report_date: new Date().toISOString().split('T')[0],
        currency: 'RUB',
        total_shares: 21586948000,
      },
    };
  }

  /**
   * Simulate network delay for realistic API behavior
   */
  private async simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * 1000 + 300;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

export const shareholderApiService = new ShareholderApiService();
