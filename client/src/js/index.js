import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
// import { initdb } from './database';

// window.addEventListener('load', function () {
//   initdb();
// })

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  // const workboxSW = new Workbox('/src-sw.js');
  // workboxSW.register('./service-worker.js');
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker');
  })
} else {
  console.error('Service workers are not supported in this browser.');
}


