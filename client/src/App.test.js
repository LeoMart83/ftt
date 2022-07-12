import { screen, fireEvent } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './test-utils';
import TickerRow from './components/TickerRow';
import { TickersSlice } from './store/reducers/TickersSlice';
import { setupStore } from './store/store';

const { setTickers, hideTicker } = TickersSlice.actions;

describe("App", () => {

  it('Should render App', () => {
    const { container } = renderWithProviders(<App />);
    const app = container.getElementsByClassName("app");
    expect(app.length).toBe(1);
  });

  it('Should render TickerRow', () => {

    const ticker = {
      shortName: 'AAPL',
      fullName: 'Apple',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
      last_trade_time: new Date()
    }

    renderWithProviders(<TickerRow ticker={ticker} />);
    const tickerRow = screen.getByText(ticker.shortName);
    expect(tickerRow).toBeInTheDocument();
  });

  it('Should render multiple tickers', () => {

    const store = setupStore()

    const tickers = [{
      shortName: 'AAPL',
      fullName: 'Apple',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }, {
      shortName: 'GOOG',
      fullName: 'Alphabet',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }, {
      shortName: 'MSFT',
      fullName: 'Microsoft',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }, {
      shortName: 'AMZN',
      fullName: 'Amazon',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }, {
      shortName: 'META',
      fullName: 'Facebook',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }, {
      shortName: 'TSLA',
      fullName: 'Tesla',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }]

    store.dispatch(setTickers(tickers))

    const { container } = renderWithProviders(<App />, { store });

    const tickersElements = container.getElementsByClassName('ticker-container');

    expect(tickersElements.length).toBe(6);

  });

  it('Should hide ticker when hide icon is clicked', () => {

    const store = setupStore()

    const tickers = [{
      shortName: 'AAPL',
      fullName: 'Apple',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }]

    store.dispatch(setTickers(tickers))

    const { container } = renderWithProviders(<App />, { store });

    fireEvent(
      screen.getByAltText('hide-icon'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    const hiddenElements = container.getElementsByClassName("hidden-ticker");
    expect(hiddenElements.length).toBe(1);
  });

  it('Should show ticker after click on it at the buttom ', () => {

    const store = setupStore()

    const tickers = [{
      shortName: 'AAPL',
      fullName: 'Apple',
      exchange: 'NASDAQ',
      price: 111,
      change: 50,
      change_percent: 1,
      dividend: 1,
      yield: 1,
    }]

    store.dispatch(setTickers(tickers))

    store.dispatch(hideTicker('AAPL'));

    const { container } = renderWithProviders(<App />, { store });

    fireEvent(
      screen.getByText(tickers[0].shortName),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )

    const tickersElements = container.getElementsByClassName("ticker-container");

    expect(tickersElements.length).toBe(1);

  })

})