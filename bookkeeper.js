// bookkeeper.js

// Add const to handle HTML Elements:
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


// Show Modal; Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
};

// Event Lister -  Modal
// child Header element <h1> id="show-modal"
modalShow.addEventListener('click', showModal);

// child Icon element <i> class="far fa-times-circle close-icon" id="close-modal"
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));

// entire window to allow click anywhere on webpage to close Modal
// e = Event
// note where user clicks...only fire when Modal Overlay is target
//window.addEventListener('click', (e) => console.log(e.target));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));
