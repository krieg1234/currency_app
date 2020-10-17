import React from 'react';
import { connect } from 'react-redux';
import { markFavorite, switchBaseCurrency, updateRates } from './actions';

const mapStateToProps = (state) => {

    const props = {
        baseCurrency: state.baseCurrency
    };
    return props;
};

class CurrencyItem extends React.Component {
    makeFavoriteHandler = (currName) => () => {
        const { dispatch } = this.props;
        dispatch(markFavorite({ currName }));
    };

    makeBaseHandler = (currName) => () => {
        const { dispatch } = this.props;
        dispatch(switchBaseCurrency({ baseCurrency: currName }));
        dispatch(updateRates(currName));
    };

    render() {
        const { name, rate, isFavorite, baseCurrency } = this.props;
        const isBase = baseCurrency === name;
        return (
            <div >
                <p style={isBase?{color:'red'}:null}>
                    {name}
                </p>
                <p>{rate.toFixed(2)} {baseCurrency}</p>
                <p>
                    <button onClick={this.makeFavoriteHandler(name)} style={isFavorite ? { background: 'pink' } : null}>favorite</button>
                    <button onClick={this.makeBaseHandler(name)} disabled={isBase}>base</button>
                </p>
            </div>
        );
    }
};

export default connect(mapStateToProps)(CurrencyItem);