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
        //const style={border: 'solid 1px', margin: `5px`}
        const { currencys } = this.props;
        const allCurrencys = currencys.allCurrencys;
        if (allCurrencys.length === 0) return null;

        const listOfCurrencys = allCurrencys.map((c) => [c, currencys.byCurrency[c]])
        return (
            <ul className='row row-cols-2 row-cols-sm-3 row-cols-md-5 row-cols-lg-6'>
                {listOfCurrencys.map(([name, currData]) => (
                    <div className='card bg-dark col'   key={name}>
                        <CurrencyItem name={name} rate={currData.rate} isFavorite={currData.isFavorite} />
                    </div>))}
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