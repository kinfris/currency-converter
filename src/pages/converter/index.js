import {useEffect, useState} from "react";
import {CurrencyService} from "@/services/currency";
import styles from "./converter.module.css";
import {Button, OutlinedInput} from '@mui/material';

export default function Currency() {
    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [convertInfo, setConvertInfo] = useState(null);

    const handleInputChange = (e) => {
        setIsError("")
        setInputValue(e.currentTarget.value)
    }

    const handleButtonClick = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            setConvertInfo(null);
            const splitInputString = inputValue.split(' ');
            const convertFrom = splitInputString[1].toUpperCase();
            const convertTo = splitInputString[3].toUpperCase();
            const amount = splitInputString[0];
            if (convertFrom.length !== 3 || convertTo.length !== 3 || isNaN(+amount)) {
                setIsError("Wrong input schema");
                return;
            }

            const result = await CurrencyService.convertCurrency(convertFrom, convertTo, amount)
            setConvertInfo(result);
        } catch (e) {
            setIsError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.input_schema}>Write what you want convert like in this
                    example<br/> &quot;amount&quot;
                    &quot;convert from currency&quot; to &quot;convert to currency&quot;
                </div>
                <div className={styles.input_wrapper}>
                    <OutlinedInput value={inputValue} onChange={handleInputChange}/>
                    <Button onClick={handleButtonClick} variant="contained" disabled={isLoading}>Convert</Button>
                </div>
                {isError && <div className={styles.error_text}>{isError}</div>}
                {convertInfo && <div className={styles.convert_info}>rate: {convertInfo.info.rate},
                    amount: {convertInfo.result}</div>}
            </main>
        </>
    )
}
