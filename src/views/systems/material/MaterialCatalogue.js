import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import AppCard from 'src/components/shared/AppCard';
import PageContainer from '../../../components/container/PageContainer';
import MaterialCatalogueTbale from 'src/components/systems/material/materialCatalogueTbale.js';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Material Catalogue',
  },
];

const MaterialCatalogue = () => {
  return (
    <PageContainer title="Material Catalogue" description="This is Material Catalogue  ">
      <Breadcrumb title="Material Catalogue" items={BCrumb} />
      <AppCard />
      <MaterialCatalogueTbale />
    </PageContainer>
  );
};

export default MaterialCatalogue;
