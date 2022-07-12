
const state = {
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

export const testUseAppSelector = (f) => f(state);