"use client"

import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './store';

interface StoreProviderProps {
    children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }: StoreProviderProps) => {
    return (
        <Provider store={Store}>
            {children}
        </Provider>
    );
}

export default StoreProvider;