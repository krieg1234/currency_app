import React from 'react';
import { connect } from 'react-redux';
import CurrencyItem from './CurrencyItem';

const mapStateToProps = (state) => {

    const props = {
        currencys: state.currencys,
        baseCurrency: state.baseCurrency
    };
    return props;
};

class CurrencyList extends React.Component {

    buildCurrList() {
        const { currencys } = this.props;
        const allCurrencys = currencys.allCurrencys;
        if (allCurrencys.length === 0) return null;

        const listOfCurrencys = allCurrencys.map((c) => [c, currencys.byCurrency[c]])
        return (
            <ul>
                {listOfCurrencys.map(([name, currData]) => (
                    <li key={name}>
                        <CurrencyItem name={name} rate={currData.rate} isFavorite={currData.isFavorite} />
                    </li>))}
            </ul>
        );
    }

    render() {
        return (
            <div>
                {this.buildCurrList()}
            </div>
        )
    }
};

export default connect(mapStateToProps)(CurrencyList);