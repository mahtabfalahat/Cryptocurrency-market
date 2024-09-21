import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelectedItem } from '../../contexts/SelectedMarketContext';
import { useTheme } from '../../contexts/ThemeContext';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loading/Loading';
import CustomError from '../../components/CustomError/CustomError';
import { numberWithCommas } from '../../utils/utils';
import { DetailItemApiResponse } from './../../types/interfaces';
import './style.scss';

const MarketDetailsPage: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { selectedItem } = useSelectedItem();
    const { baseCurrencyId } = useParams<{ baseCurrencyId: string }>();
    const [language, setLanguage] = useState<'en' | 'fa'>('en');
    const navigate = useNavigate();
    const { data, loading, error } = useFetchData<DetailItemApiResponse>(`/v1.0/exchange/currencies/${baseCurrencyId}`);

    useEffect(() => {
        const savedLanguage = (localStorage.getItem('language') as 'en' | 'fa') || 'en'
        setLanguage(savedLanguage);
    }, []);

    const combinedItem = useMemo(() => {
        if (data?.data && selectedItem) {
            return {
                logo: data.data.logo,
                name: data.data.name,
                persian_name: data.data.persian_name,
                changePercent: selectedItem.financial?.last24h?.change_percent,
                quoteVolume: selectedItem.financial?.last24h?.quote_volume,
                sell: selectedItem.sell,
                quoteCurrencySymbol: selectedItem?.quote_currency_symbol
            };
        }
        return null;
    }, [data?.data, selectedItem]);

    if (loading) return <Loading />;
    if (error) return <CustomError message={error} />;

    return (
        <div className={`market-details-page ${theme}`}>
            <div className='market-detail-container'>
                <div className='market-logo-container'>
                    <img src={combinedItem?.logo} alt={combinedItem?.name} className='market-logo' />
                    <p>{combinedItem?.persian_name}</p>
                </div>
                <div className='row-info'>
                    <p>{t('EnglishName')}</p>
                    <p>{combinedItem?.name}</p>
                </div>
                <div className='row-info'>
                    <p>{t('Price')}</p>
                    <p>
                        {numberWithCommas(combinedItem?.sell)}
                        {language === "en" ? combinedItem?.quoteCurrencySymbol.en.toUpperCase() : combinedItem?.quoteCurrencySymbol.fa}
                    </p>
                </div>

                <div className='row-info'>
                    <p>{t('24HourChanges')}</p>
                    <p>{combinedItem?.changePercent}%</p>
                </div>
                <div className='row-info'>
                    <p>{t('TradingVolume')} </p>
                    <p>
                        {numberWithCommas(combinedItem?.quoteVolume)}
                        {language === "en" ? combinedItem?.quoteCurrencySymbol.en.toUpperCase() : combinedItem?.quoteCurrencySymbol.fa}
                    </p>
                </div>
            </div>
            <div className='back-to-homepage-container' >
                <p className='back-to-homepage' onClick={() => navigate(-1)}>
                    {t('Back')}
                </p>
            </div>
        </div>
    );
};

export default MarketDetailsPage;
