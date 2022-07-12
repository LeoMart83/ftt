import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    tickers: [],
    chartData: [
        { name: 'Apple', data: [] },
        { name: 'Alphabet', data: [] },
        { name: 'Microsoft', data: [] },
        { name: 'Amazon', data: [] },
        { name: 'Facebook', data: [] },
        { name: 'Tesla', data: [] },
    ],
    hiddenTickers: []
}

export const TickersSlice = createSlice({
    name: "tickers",
    initialState,
    reducers: {
        setTickers(state, action) {
            state.tickers = action.payload;
        },
        addDataToChart(state, action) {
            state.chartData = state.chartData.map(chart =>
            ({
                name: chart.name,
                data: [...chart.data, {
                    date: action.payload.find(el => el.fullName === chart.name).last_trade_time || null,
                    price: +action.payload.find(el => el.fullName === chart.name).price
                }]
            }))
        },
        hideTicker(state, action) {
            state.hiddenTickers = [...state.hiddenTickers, action.payload];
        },
        showTicker(state, action) {
            state.hiddenTickers = state.hiddenTickers.filter( ticker => ticker !== action.payload)
        }
    }
})

export default TickersSlice.reducer;