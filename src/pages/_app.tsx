import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { userDataContext, UserDataType } from '@/context/userData.context';
import { useEffect, useState } from 'react';

const myFont = localFont({ src: '../../public/myFonts/FuzzyBubbles-Regular.ttf' });

export default function App({ Component, pageProps }: AppProps) {
    const userDataState = useState<UserDataType>(null);

    useEffect(()=>{
        userDataState[1](localStorage.getItem('name'));
    },[])

    return (
        <main className={myFont.className}>
            <userDataContext.Provider value={userDataState}>
                <Component {...pageProps} />
            </userDataContext.Provider>
        </main>
    );
}
