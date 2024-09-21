import React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorProps } from '../../types/interfaces';
import './style.scss';


const CustomError: React.FC<ErrorProps> = ({ message }) => {
    const { t } = useTranslation();

    return (
        <div className="error-container">
            <h2>{t('Error')}</h2>
            <p>{message || t('An unexpected error occurred. Please try again later.')}</p>
        </div>
    );
};

export default CustomError;
