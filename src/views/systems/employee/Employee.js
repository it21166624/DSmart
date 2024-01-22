import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import ComEmployee from 'src/components/systems/employee/ComEmployee';


const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Shop',
    },
  ];
  
const WareHouse = () => {
    return (
        <PageContainer title="Employee Management" description="This is Employee Management">
            <Breadcrumb title="Employee Management Details" items={BCrumb} />
            <AppCard />
            <ComEmployee/>
        </PageContainer>
    );
};

export default WareHouse; 