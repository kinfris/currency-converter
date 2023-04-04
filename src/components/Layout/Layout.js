import {useContext, useEffect} from "react";
import {CurrentCurrencyContext} from "@/pages/_app";
import styles from "./layout.module.css"
import Link from "next/link";
import {Button, MenuItem, Select} from "@mui/material";
import {useRouter} from "next/router";
import {symbols} from "@/constants/currencySymbols";

export default function Layout({children}) {
    const {currency, setCurrency} = useContext(CurrentCurrencyContext);
    const router = useRouter();

    useEffect(() => {
        const currentCurrency = localStorage.getItem('currentCurrency');
        if (currentCurrency) {
            setCurrency(currentCurrency);
        }
    }, [])

    const buttonHandler = (value) => {
        const result = router.pathname.includes(value.toLowerCase())
        return (<Button variant={result ? "outlined" : "text"} disableElevation={result}>{value}</Button>)
    }

    const onSelectHandler = (e) => {
        setCurrency(e.target.value)
        localStorage.setItem('currentCurrency', e.target.value)
    }

    return (
        <>
            <div className={styles.header}>
                <div>
                    <Link href='/converter'>{buttonHandler('Converter')}</Link>
                    <Link href='/currency'>{buttonHandler('Currency')}</Link>
                </div>
                <div className={styles.currency_choose_block}>
                    <p>Chose currency</p>
                    <Select value={currency} autoComplete onChange={onSelectHandler}>
                        {symbols.map((symbol, index) => {
                            return (<MenuItem key={index} value={symbol}>{symbol}</MenuItem>)
                        })}
                    </Select>
                </div>
            </div>
            <main>{children}</main>
        </>
    )
}
