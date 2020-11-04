
import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import CurrencyList from './CurrencyList';
import CoverterForm from './ConverterForm';
import { updateRates, switchBaseCurrency } from './actions/index';

const mapStateToProps = (state) => {
  const props = {
    baseCurrency: state.baseCurrency
  };
  return props;
};

class App extends React.Component {
  componentDidMount() {
    const { dispatch, baseCurrency } = this.props;
    dispatch(updateRates(baseCurrency));
    dispatch(switchBaseCurrency({baseCurrency}));
  }

  render() {

    return (
      <div className="App">
        <header className="App-header container">
          <CoverterForm />
          <CurrencyList />
        </header>
      </div>
    );
  }


}

export default connect(mapStateToProps)(App);
