import './App.css';
import io from 'socket.io-client'
import React, { useEffect } from "react";
import TickerRow from './components/TickerRow';
import { TickersSlice } from './store/reducers/TickersSlice';
import { useAppDispatch, useAppSelector } from './store/redux-hooks';

const socket = io.connect('http://localhost:4000');

const App = () => {

  const { setTickers, addDataToChart, showTicker } = TickersSlice.actions;
  const dispatch = useAppDispatch();
  const { tickers, hiddenTickers } = useAppSelector((state) => state.tickersReducer);

  useEffect(() => {
    socket.emit('start');
    socket.on('ticker', (data) => {
      dispatch(setTickers(data));
      dispatch(addDataToChart(data));
    });
  }, []);

  const shownTickers = tickers.filter(({ shortName }) =>
    !hiddenTickers.includes(shortName)).map(ticker => <TickerRow key={ticker.shortName} ticker={ticker} />)

  const hiddenTickersToDisplay = hiddenTickers.map(ticker =>
    <div className="hidden-ticker" key={ticker} onClick={() => dispatch(showTicker(ticker))}>{ticker}</div>)

  return (<div className="app">
    Tickers:
    {shownTickers}
    {!!hiddenTickers.length && <div className="hidden-tickers-container">
      {hiddenTickersToDisplay}
    </div>}
  </div>)
}

export default App;