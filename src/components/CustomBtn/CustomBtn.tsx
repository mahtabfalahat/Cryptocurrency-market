import React from 'react';
import { CustomButtonProps } from './../../types/interfaces';
import './style.scss';

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    icon,
    iconPosition = 'left',
    type = 'button',
    className = '',
    disabled = false,
}) => {
    return (
        <button
            className={`custom-button ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {icon && iconPosition === 'left' && (
                <img src={icon} alt="icon" className="button-icon left" />
            )}
            <span className="button-label">{label}</span>
            {icon && iconPosition === 'right' && (
                <img src={icon} alt="icon" className="button-icon right" />
            )}
        </button>
    );
};

export default CustomButton;
