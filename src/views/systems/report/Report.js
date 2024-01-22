import React, { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';

const WareHouse = () => {
    return (
        <PageContainer title="Report" description="This is Report">
            <Breadcrumb title="Report" subtitle="test page" />
            <AppCard />
            <h1>abc</h1>
        </PageContainer>
    );
};

export default WareHouse; 