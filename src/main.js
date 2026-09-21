import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
showLoadMoreButton,
 hideLoadMoreButton
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('input[type="text"]');
const loadMore = document.querySelector(".js-btn")

loadMore.addEventListener("click", onLoadMore)
let page = 1;
let currentQuery = '';
let totalLoadedImages = 0;

form.addEventListener('submit', handSearch);

async function handSearch(event) {
    event.preventDefault();

    currentQuery = input.value.trim().toLowerCase();
    if (!currentQuery) {
    return;
    }
    
    page = 1;
    totalLoadedImages = 0;

    showLoader();
    hideLoadMoreButton()
    clearGallery()
    
    try {
        const data = await getImagesByQuery(currentQuery, page)
            if (data.hits.length > 0) {
                createGallery(data.hits)
                totalLoadedImages = data.hits.length;
                if (totalLoadedImages < data.totalHits) {
                    showLoadMoreButton()
                } else {
                    hideLoadMoreButton()
                    iziToast.info({
                        message: "We're sorry, but you've reached the end of search results.",
                    });
                }
            } else {
                iziToast.error({
                    title: "Error",
                    message: "Sorry, there are no images matching your search query. Please try again!",
                });
            }
        
    }
    catch { iziToast.error({
            title: "Error",
            message: `Please try again!`
                
        })
    }
    finally { hideLoader()}
    }

async function onLoadMore() {
    page += 1;
    hideLoadMoreButton()
    showLoader();
    try { 
        const data = await getImagesByQuery(currentQuery, page);
        createGallery(data.hits)
        
        totalLoadedImages += data.hits.length;
        if (totalLoadedImages  >= data.totalHits) {
            hideLoadMoreButton()
            iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        });
        } else { 
            showLoadMoreButton();
        }

        const card = document.querySelector(".gallery-item")
        if (card) {
            const cardHeight = card.getBoundingClientRect().height
            window.scrollBy({
                left: 0,
                top: cardHeight * 2,
                behavior: "smooth"
            })
        }

    } catch {
        iziToast.error({
                        title: "Error",
                        message: `Sorry, there are no images matching your search query. Please try again!`
                    });
    } finally {
        hideLoader()
    }
}

