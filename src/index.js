import {fetchApi, PERPAGE} from './js/api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    formEl: document.querySelector('.search-form'),
    boxEl: document.querySelector('.gallery'),
    buttonEl: document.querySelector('.load-more'),
}
let query = '';
let page = 1;
let totalPages = 1;

refs.formEl.addEventListener('submit', onSearchClick);
refs.buttonEl.addEventListener('click', onLoadMoreRender);

function onSearchClick (event) {
  refs.buttonEl.hidden = true;
    event.preventDefault(); 
    clearImgBox();  
    query = event.currentTarget.elements.searchQuery.value;
    if (!query) return;
    page = 1;
    fetchAndRender(query);
    refs.formEl.reset();
   
}


function onLoadMoreRender () {
    page+=1;

    if (page*PERPAGE > totalPages) return Notify.failure("We're sorry, but you've reached the end of search results.");
    fetchAndRender(query);
}


async function fetchAndRender (query) {
    try {const fetchData = await fetchApi(query, page);
        if (fetchData.total === 0) {return Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
        
        renderList(fetchData);       
        
        refs.buttonEl.hidden = false;}
    catch (error) {
        console.log(error.message);
    }   
}


function renderList ({hits, totalHits }) {
    totalPages = totalHits;
    const list = hits.map(
        ({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
         {return `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width='320' title="Beautiful Image">
            <div class="info">
              <p class="info-item">
                <b>Likes ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads ${downloads}</b>
              </p>
            </div>
            </div>`        }
      ).join(' ');
      
      refs.boxEl.insertAdjacentHTML('beforeend', list);      
    
}

function clearImgBox() {
    refs.boxEl.innerHTML = '';
}