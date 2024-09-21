import React, { createContext, useState, ReactNode, useContext } from 'react';
import { SelectedItemType, SelectedItem } from './../types/interfaces';


const SelectedItemContext = createContext<SelectedItemType | undefined>(undefined);

export const SelectedItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

    return (
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SelectedItemContext.Provider>
    );
};

export const useSelectedItem = (): SelectedItemType => {
    const context = useContext(SelectedItemContext);
    if (!context) {
        throw new Error('useSelectedItem must be used within a SelectedItemProvider');
    }
    return context;
};
