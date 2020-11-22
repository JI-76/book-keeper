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
// note where user clicks...only fire when Modal Overlay is click target
//window.addEventListener('click', (e) => console.log(e.target));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate Form data and return either true or false
function validateForm(nameValue, urlValue) {
    // Regex to validate a url
    // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    const regex = new RegExp(expression);

    // validate both website name and url are entered.
    if (!nameValue || !urlValue) {
        alert('Please submit values for both fields.');
        return false;
    };

    // validate url format
    // Dev test to see if match occur for valid url
    // if (urlValue.match(regex)) {
    //     alert('match');
    // };

    if (!urlValue.match(regex)) {
        alert('Please provide a valid url.');
        return false;
    };

    //  Valid Form input
    return true;
};

// Handle Form data
function storeBookmark(e) {
    // prevent Form from submitting a network event
    e.preventDefault();

    // console.log(e);
    // capture Modal Form user input
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    
    // verify that url is formatted as an actual link
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    };

    console.log(nameValue, urlValue);

    // validate Form data.
    if (!validateForm(nameValue, urlValue)) {
        return false;
    };
};

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);