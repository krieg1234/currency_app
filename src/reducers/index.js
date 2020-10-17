import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

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
                isFavorite: (localStorage.favorites)?localStorage.favorites.includes(c):false
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
        localStorage.setItem('baseCurrency',action.payload.baseCurrency);
        return action.payload.baseCurrency;
    }
}, (localStorage.baseCurrency)?localStorage.baseCurrency:'USD');

const favorites=handleActions({
    [actions.markFavorite]:(state, action)=>{
        const {currName}=action.payload;
        let newFavorites=[];
        if (state.includes(currName)) {
            newFavorites=state.filter((c)=>c!==currName);            
        } else {
            newFavorites=[...state, action.payload.currName];
        };
        localStorage.setItem('favorites', newFavorites);
        return newFavorites;
    }
},(localStorage.favorites)?localStorage.favorites.split(','):[]);

const defaultUI = {
    inputValue: '',
    targetCurrency: (localStorage.targetCurrency)?localStorage.targetCurrency:'USD'
}
const UI = (state = defaultUI, action) => {
    switch (action.type) {
        case 'INPUT_EDIT': {            
            return { ...state, inputValue: action.payload.text };
        }
        case 'TARGET_SELECT': {
            localStorage.setItem('targetCurrency', action.payload.currName);
            return { ...state, targetCurrency: action.payload.currName };
        }
        default: return state;
    };
};

export default combineReducers({
    currencys,
    baseCurrency,
    UI,
    favorites
});
