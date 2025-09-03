import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { CustomLegend, ShareholderTable } from '@/components/ui';
import { shareholderService } from '@/services/shareholderService';
import type { ShareholderData } from '@/types/shareholder';

import './styles.css';

export const ShareholderStructure: React.FC = () => {
  const [data, setData] = useState<ShareholderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1300);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const shareholderData = await shareholderService.fetchShareholderData();
        setData(shareholderData);
        setError(null);
      } catch (err) {
        setError('Failed to load shareholder data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (error) {
    return (
      <div className="shareholder-structure-container">
        <div className="error-message">
          <span className="p1-secondary" style={{ color: 'var(--color-red)' }}>
            {error}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="shareholder-structure-container">
      <div className="form-container">
        <div className="form-title">
          <h4 className="heading-h4">Структура акционеров</h4>
        </div>

        <ShareholderTable data={data} loading={loading} />

        <div className="p2-secondary form-date-text">
          Дата последнего обновления этой структуры: {getCurrentDate()}
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-content">
          <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 60 : 80}
                outerRadius={isMobile ? 120 : 150}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {!isMobile && (
            <div className="legend-side">
              <CustomLegend
                payload={data.map(item => ({
                  value: item.name,
                  color: item.color,
                }))}
              />
            </div>
          )}
        </div>
        {isMobile && (
          <CustomLegend
            payload={data.map(item => ({
              value: item.name,
              color: item.color,
            }))}
          />
        )}
      </div>
    </div>
  );
};
