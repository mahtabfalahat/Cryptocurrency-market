import React from 'react';
import { numberWithCommas } from './../../utils/utils';
import bitcoinIcon from './../../assets/bitcoinIcon.png';
import { MarketItemProps } from '../../types/types';
import './style.scss';

const MarketItem: React.FC<MarketItemProps> = ({ itemName, itemPrice, itemCurrency, onClickHandle, logo }) => {
    return (
        <div className='market-item' onClick={onClickHandle}>
            <div className='market-info-container name'>
                <img src={logo ? logo : bitcoinIcon} alt={`${itemName} icon`} className="item-icon" />
                <p>{itemName}</p>
            </div>
            <div className='market-info-container price'>
                <p>{numberWithCommas(itemPrice)}</p>
                <p className='currency-text'>{itemCurrency}</p>
            </div>
        </div>
    );
};

export default MarketItem;
