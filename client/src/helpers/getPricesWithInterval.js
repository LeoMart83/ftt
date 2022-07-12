

export const getPricesWithInterval = (prices, interval) => {

    if (interval === 'max') {
        return prices;
    }

    return prices.filter(({ date }) => new Date(date).getTime() - new Date().getTime() >= -interval);
}