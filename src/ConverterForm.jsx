import React from 'react';
import { connect } from 'react-redux';
import { editInputValue, selectTargetCurrency } from './actions';

const mapStateToProps = (state) => {
    const props = {
        baseCurrency: state.baseCurrency,
        currencys: state.currencys,

        inputValue: state.UI.inputValue,
        targetCurrency: state.UI.targetCurrency
    };

    return props;
};

class CoverterForm extends React.Component {
    makeConverting = () => {
        const { inputValue, targetCurrency, currencys } = this.props;
        if (inputValue === '' || targetCurrency === '') return 0;
        return (inputValue * currencys.byCurrency[targetCurrency].rate).toFixed(2);
    };

    inputHandler = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(editInputValue(e.target.value));
    };

    selectTargetCurr = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(selectTargetCurrency(e.target.value));
    };

    buildCurrList = () => {
        const { allCurrencys } = this.props.currencys;
        const { targetCurrency } = this.props;
        if (allCurrencys.length === 0) return <select>No data</select>;
        return (
            <select onChange={this.selectTargetCurr} value={targetCurrency}>
                {allCurrencys.map((c) => <option key={c}>{c}</option>)}
            </select>
        );
    }

    render() {
        const { baseCurrency } = this.props;
        const { inputValue } = this.props;
        return (
            <form>
                <p>Конвертер валют</p>
                <p>
                    <input onChange={this.inputHandler} value={inputValue}></input>
                    {this.buildCurrList()}
                    <span> = {this.makeConverting()} {baseCurrency}</span>
                </p>

            </form>
        )
    };
};

export default connect(mapStateToProps)(CoverterForm);