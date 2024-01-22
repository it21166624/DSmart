import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import BinCardTable from 'src/components/systems/material/binCardTable.js';
import TransactionDetailsTable from 'src/components/systems/material/transactionDetailsTable.js';
import BlankCard from '../../../components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Bin Card',
  },
];

 

const bincard = () => {
  const h1Style = {
    color: 'green',
  };
  return (
    <PageContainer title="Bin Card" description="this is bincard page">
      <Breadcrumb title="Bin Card" items={BCrumb} />
      <BlankCard>
        <BinCardTable />
        <br/>
        <h1 style={h1Style}>Transaction Details</h1>
        <TransactionDetailsTable />
      </BlankCard>
    </PageContainer>
  );
};

export default bincard;
