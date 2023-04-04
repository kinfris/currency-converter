import axios from "axios";
import {symbols} from "@/constants/currencySymbols";

const $api = axios.create({
    baseURL: `https://api.apilayer.com/exchangerates_data`,
    withCredentials: true,
    headers: {
        "apikey": "m1pjtm1ckSfQpYLyJQZv3lUzPrXHBKEU"
    }
})

export const CurrencyService = {
    async convertCurrency(convertFrom, convertTo, amount) {
        const response = await $api(`/convert?to=${convertTo}&from=${convertFrom}&amount=${amount}`)
        return response.data;
    },

    async getLatest(base) {
        const symbolsQuery = symbols.join('%2C');
        const response = await $api(`/latest?symbols=${symbolsQuery}&base=${base}`);
        const myArr = Object.entries(response.data.rates).map(([key, value]) => ({name: key, value: value}));
        return myArr.filter(currency => currency.name !== base);
    }
}
