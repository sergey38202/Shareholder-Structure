import { shareholderApiService } from '@/services/api';
import type { ShareholderData } from '@/types/shareholder';

/**
 * High-level shareholder service that wraps the API service
 * Provides business logic and error handling for the UI layer
 */
export const shareholderService = {
  /**
   * Fetch shareholder data with business logic
   */
  async fetchShareholderData(companyCode = 'SBER'): Promise<ShareholderData[]> {
    try {
      const data = await shareholderApiService.getShareholdersByCompany(
        companyCode
      );

      return data;
    } catch (error) {
      console.error('❌ ShareholderService: Error fetching data:', error);
      throw new Error('Failed to load shareholder data');
    }
  },

  /**
   * Get all shareholders with pagination
   */
  async getAllShareholders(page = 1, limit = 20): Promise<ShareholderData[]> {
    try {
      const data = await shareholderApiService.getAllShareholders(page, limit);

      return data;
    } catch (error) {
      console.error(
        '❌ ShareholderService: Error fetching all shareholders:',
        error
      );
      throw new Error('Failed to load shareholders list');
    }
  },

  /**
   * Validate shareholder data integrity
   */
  validateData(data: ShareholderData[]): boolean {
    const totalPercentage = data.reduce((sum, item) => sum + item.value, 0);
    const isValid = Math.abs(totalPercentage - 100) < 0.01;

    return isValid;
  },

  /**
   * Get data summary statistics
   */
  getDataSummary(data: ShareholderData[]) {
    const totalShareholders = data.length;
    const largestShareholder = data.reduce((max, current) =>
      current.value > max.value ? current : max
    );
    const smallestShareholder = data.reduce((min, current) =>
      current.value < min.value ? current : min
    );

    const summary = {
      totalShareholders,
      largestShareholder: {
        name: largestShareholder.name,
        percentage: largestShareholder.value,
      },
      smallestShareholder: {
        name: smallestShareholder.name,
        percentage: smallestShareholder.value,
      },
    };

    return summary;
  },
};
