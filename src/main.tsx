import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {MantineProvider} from '@mantine/core';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import {theme} from "./config/theme.ts";
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MantineProvider theme={theme} defaultColorScheme="dark">
                    <App/>
                </MantineProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
