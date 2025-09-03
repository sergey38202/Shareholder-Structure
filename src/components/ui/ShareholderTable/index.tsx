import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { ShareholderData } from '@/types/shareholder';

import type { ShareholderTableProps, ShareholderTableData } from './types';
import './styles.css';

export const ShareholderTable: React.FC<ShareholderTableProps> = ({
  data,
  loading,
}) => {
  const columns: ColumnsType<ShareholderTableData> = [
    {
      title: <span className="p2-accent">Держатель акции</span>,
      dataIndex: 'holder',
      key: 'holder',
      render: (text: string) => <span className="p1-secondary">{text}</span>,
    },
    {
      title: <span className="p2-accent">% Доли</span>,
      dataIndex: 'percentage',
      key: 'percentage',
      align: 'right',
      render: (value: number) => (
        <span className="p1-secondary">{value.toFixed(2)} %</span>
      ),
    },
  ];

  const tableData: ShareholderTableData[] = data.map(
    (item: ShareholderData, index: number) => ({
      key: index.toString(),
      holder: item.name,
      percentage: item.value,
    })
  );

  return (
    <div className="shareholder-table-container">
      <Table
        columns={columns}
        dataSource={tableData}
        loading={loading}
        pagination={false}
        className="custom-shareholder-table"
        size="middle"
      />
    </div>
  );
};
