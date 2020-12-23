const baseURL = 'https://economia.awesomeapi.com.br/json/all';

const currencyAPI = () => fetch(baseURL).then((response) => response.json());

export default currencyAPI;
