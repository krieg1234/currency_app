import axios from 'axios';

const getRate = async (base='USD') =>{
    const {data}=await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
    return data.rates;
  };
  
  export default getRate;