import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '27678833-7153b16b322f2af48ae42bf6d';
export const PERPAGE = 40;

export function fetchApi (query, page) {
 return axios.get(`${URL}?key=${KEY}&q=${query}&per_page=${PERPAGE}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(({data}) => data)};