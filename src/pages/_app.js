import '@/styles/globals.css'
import Layout from "@/components/Layout/Layout";
import {createContext, useState} from "react";

export const CurrentCurrencyContext = createContext(null);

export default function App({Component, pageProps}) {
    const [currency, setCurrency] = useState("BYN");
    return (
        <CurrentCurrencyContext.Provider value={{currency, setCurrency}}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CurrentCurrencyContext.Provider>
    )

}
