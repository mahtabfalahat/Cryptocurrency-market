import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { marketsListPage, marketDetailsPage } from './Paths';
import MarketsListPage from '../pages/MarketsListPage/MarketsListPage';
import MarketDetailsPage from '../pages/MarketDetailsPage/MarketDetailsPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path={marketsListPage} element={<MarketsListPage />} />
            <Route path={`${marketDetailsPage}/:baseCurrencyId`} element={<MarketDetailsPage />} />
        </Routes>
    );
};

export default AppRoutes;
