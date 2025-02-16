import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import furnitureSlice from './store/furnitureSlice';
import './styles.css';
import './UnUsed/ImageSlider/imageSlider.css'


const store = configureStore({
    reducer: {
        furniture: furnitureSlice,
    },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
