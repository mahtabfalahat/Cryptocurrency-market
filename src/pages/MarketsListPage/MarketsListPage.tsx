import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../../contexts/ThemeContext';
import { useSelectedItem } from '../../contexts/SelectedMarketContext';
import useDebounce from '../../hooks/useDebounce';
import CustomInput from '../../components/CustomInput/CustomInput';
import MarketItem from '../../components/MarketItem/MarketItem';
import Loading from '../../components/Loading/Loading';
import CustomError from '../../components/CustomError/CustomError';
import CustomButton from './../../components/CustomBtn/CustomBtn';
import sortIcon from '../../assets/sortIcon.svg';
import useFetchData from '../../hooks/useFetchData';
import { ListApiResponse } from '../../types/interfaces';
import { marketDetailsPage } from '../../routes/Paths';
import './style.scss';

const MarketsListPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { setSelectedItem } = useSelectedItem();
    const { data, loading, error } = useFetchData<ListApiResponse>('/v1.0/exchange/pairs', 20000);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<'name' | 'price'>('name');
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [language, setLanguage] = useState<'en' | 'fa'>('en');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const navigate = useNavigate();

    const flattenedData = useMemo(() => {
        return data?.data?.flat() || [];
    }, [data]);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'fa' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    const itemDetailHandle = (item: any) => {
        setSelectedItem(item);
        navigate(`${marketDetailsPage}/${item.base_currency_id}`);
    };

    const filteredItems = useMemo(() => {
        return flattenedData
            .filter(item => {
                const itemName = language === 'en' ? item.name.en : item.name.fa;
                return itemName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            })
            .sort((a, b) => {
                if (sortField === 'name') {
                    const nameA = language === 'en' ? a.name.en : a.name.fa;
                    const nameB = language === 'en' ? b.name.en : b.name.fa;
                    return isSortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
                }
                return isSortAsc ? parseFloat(a.sell) - parseFloat(b.sell) : parseFloat(b.sell) - parseFloat(a.sell);
            });
    }, [flattenedData, debouncedSearchTerm, sortField, isSortAsc, language]);

    if (loading) return <Loading />;
    if (error) return <CustomError message={error} />;

    return (
        <div className={`markets-list-page ${theme}`}>
            <div className='market-list-page-container'>
                <div className='header-container'>
                    <CustomButton className='theme-btn' onClick={toggleTheme} label={theme === 'light' ? '🌙' : '☀️'} />
                    <CustomButton className='lng-btn' onClick={toggleLanguage} label={language === 'en' ? 'FA' : 'EN'} />
                    <CustomInput
                        placeholder={t('SearchMarket')}
                        language={language}
                        value={searchTerm}
                        onChangeHandle={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className='filter-container'>
                    <CustomButton label={t('LastPrice')} icon={sortIcon} iconPosition="right"
                        onClick={() => {
                            setSortField('price');
                            setIsSortAsc(!isSortAsc);
                        }}
                    />
                    <CustomButton label={t('Name')} icon={sortIcon} iconPosition="right"
                        onClick={() => {
                            setSortField('name');
                            setIsSortAsc(!isSortAsc);
                        }}
                    />
                </div>

                <div className='market-item-container'>
                    {filteredItems.map(item => (
                        <MarketItem
                            key={uuidv4()}
                            itemName={language === 'en' ? item.name.en : item.name.fa}
                            itemPrice={item.sell}
                            itemCurrency={language === 'en' ? item.quote_currency_symbol.en : item.quote_currency_symbol.fa}
                            onClickHandle={() => itemDetailHandle(item)}
                            language={language}
                            logo={item.logo}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketsListPage;
