import { ReactNode } from 'react';
import { Theme } from './types';

export interface ListItem {
    id: number;
    name: {
        en: string;
        fa: string;
    };
    sell: string;
    quote_currency_symbol: {
        en: string;
        fa: string;
    };
    logo: string;
}

export interface ListApiResponse {
    data: ListItem[][];
}


export interface ErrorProps {
    message?: string;
}
export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export interface ThemeProviderProps {
    children: ReactNode;
}

export interface UseFetchDataProps<T> {
    data: T | null;
    error: string | null;
    loading: boolean
}

export interface SelectedItem {
    id: number;
    name: {
        en: string;
        fa: string;
    };
    sell: string;
    quote_currency_symbol: {
        en: string;
        fa: string;
    };
    logo: string;
    base_currency_id: string;
    buy: string;
    financial: {
        last24h: {
            base_volume: number,
            change_percent: number,
            close: number,
            highest: number,
            lowest: number,
            open: number,
            quote_volume: number
        }
    }
}

export interface SelectedItemType {
    selectedItem: SelectedItem | null;
    setSelectedItem: (item: SelectedItem) => void;
}
export interface CustomButtonProps {
    label: string;
    onClick: () => void;
    icon?: string;
    iconPosition?: 'left' | 'right';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}
export interface DetailItemApiResponse {
    data: {
        logo: string;
        name: string;
        persian_name: string;
    };
}