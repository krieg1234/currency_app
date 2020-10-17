import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

//import updateCurrencyRates from '../updateCurrencyRates';

const sortCurrencyByFavorite = (currencys) => (curr1, curr2) => {
    if (currencys[curr1].isFavorite === currencys[curr2].isFavorite) return 0;
    if (currencys[curr1].isFavorite) return -1;
    if (currencys[curr2].isFavorite) return 1;
};


const defaultCurrencys = {
    byCurrency: {},
    allCurrencys: []
};
const currencys = handleActions({
    [actions.updateRatesSuccess]: (state, action) => {
        const newCurrencys = action.payload;
        const allCurrencys = Object.keys(newCurrencys);
        const mappedCurrencys = {
            byCurrency: {},
            allCurrencys
        };
        allCurrencys.forEach((c) => {
            mappedCurrencys.byCurrency[c] = {
                rate: newCurrencys[c],
                isFavorite: (state.byCurrency[c]) ? state.byCurrency[c].isFavorite : false
            }
        });
       mappedCurrencys.allCurrencys.sort(sortCurrencyByFavorite(mappedCurrencys.byCurrency));
        return mappedCurrencys;
    },
    [actions.markFavorite]: (state, action) => {
        const { currName } = action.payload;
        const newCurrData = state.byCurrency[currName];
        newCurrData.isFavorite = !newCurrData.isFavorite;
        const newByCurrency = { ...state.byCurrency, [currName]: newCurrData };

        const sortedCurrs = state.allCurrencys.sort(sortCurrencyByFavorite(newByCurrency));
        return {
            ...state,
            allCurrencys: sortedCurrs,
            byCurrency: newByCurrency
        };
    }

}, defaultCurrencys);

const baseCurrency = handleActions({
    [actions.switchBaseCurrency]: (state, action) => {
        return action.payload.baseCurrency;
    }
}, 'USD');

const defaultUI = {
    inputValue: '',
    targetCurrency: 'USD'
}
const UI = (state = defaultUI, action) => {
    switch (action.type) {
        case 'INPUT_EDIT': {
            return { ...state, inputValue: action.payload.text };
        }
        case 'TARGET_SELECT': {
            return { ...state, targetCurrency: action.payload.currName };
        }
        default: return state;
    };
};


/*const ratesUpdateState = handleActions({
    [actions.updateRatesRequest]() {
        return 'requested';
    },
    [actions.updateRatesFailure]() {
        return 'failed';
    },
    [actions.updateRatesSuccess]() {
        return 'finished';
    },
}, 'none');*/

export default combineReducers({
    currencys,
    baseCurrency,
    UI,
    //ratesUpdateState
});
