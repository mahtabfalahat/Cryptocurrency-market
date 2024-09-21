
export type Theme = "light" | "dark";

export type CustomInputProps = {
    placeholder: string;
    onChangeHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;
    language: 'en' | 'fa';
};

export type MarketItemProps = {
    itemName: string;
    itemPrice: string;
    itemCurrency: string;
    onClickHandle: () => void;
    language: 'en' | 'fa';
    logo: string;
};