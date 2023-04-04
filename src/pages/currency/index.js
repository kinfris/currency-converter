import styles from "./currency.module.css"
import {Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {CurrencyService} from "@/services/currency";
import {CurrentCurrencyContext} from "@/pages/_app";


export default function Currency() {
    const [currencyList, setCurrencyList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {currency} = useContext(CurrentCurrencyContext);


    useEffect(() => {
        const asyncFunc = async () => {
            try {
                setIsLoading(true);
                const response = await CurrencyService.getLatest(currency);
                setCurrencyList(response);
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false);
            }

        }
        asyncFunc()
    }, [currency])

    return (
        <>
            <main className={styles.main}>
                {
                    isLoading && currencyList.length === 0 ? <div>Loading...</div> :
                        <TableContainer component={Paper} style={{ width: 'fit-content' }}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    {currencyList.map((currency) => (
                                        <TableRow
                                            key={currency.name}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {currency.name}
                                            </TableCell>
                                            <TableCell align="right">{currency.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
            </main>
        </>
    )
}
