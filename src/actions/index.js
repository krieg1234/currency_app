import { createAction } from 'redux-actions';
import updateCurrencyRates from '../updateCurrencyRates';
  
  export const editInputValue=(text)=>({
      type: 'INPUT_EDIT',
      payload: {
          text
      }
  });

  export const selectTargetCurrency=(currName)=>({
    type: 'TARGET_SELECT',
    payload: {
        currName
    }
  });

  export const markFavorite=createAction('FAVORITE_MARK');
  export const switchBaseCurrency=createAction('BASE_SWITCH');

  export const updateRatesRequest = createAction('RATES_UPDATE_REQUEST');
  export const updateRatesSuccess = createAction('RATES_UPDATE_SUCCESS');
  export const updateRatesFailure = createAction('RATES_UPDATE_FAILURE');

  export const updateRates=(baseCurr)=>async (dispatch)=>{
    dispatch(updateRatesRequest());
    try {
        const currencys=await updateCurrencyRates(baseCurr);
        dispatch (updateRatesSuccess(currencys));
    } catch (e) {
        dispatch (updateRatesFailure());
    }
  }
  // END
  