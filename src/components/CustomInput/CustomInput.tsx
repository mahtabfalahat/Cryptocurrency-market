import React from 'react';
import searchIcon from './../../assets/searchIcon.png';
import { CustomInputProps } from '../../types/types';
import './style.scss';

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, onChangeHandle, value, type = 'text', language }) => {
    return (
        <div className={`custom-input-container ${language}`}>
            <img src={searchIcon} alt="Search" className="search-icon" />
            <input
                type={type}
                className={`custom-input ${language}`}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandle}
            />
        </div>
    );
};

export default CustomInput;
