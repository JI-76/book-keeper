// bookkeeper.js

// Add const to handle HTML Elements:
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// global variable
// Array of Objects to store Bookmarks
let bookmarks = [];

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

// Build Bookmarks DOM
function buildBookmarks() {

    // Remove all bookmark elements
    bookmarksContainer.textContent = '';

    // Build Items - 1 per bookmark
    bookmarks.forEach((bookmark) => {
        // destructure array
        const {name, url} = bookmark;
        // console.log(name, url);

        // create <div> class="item"
        const item = document.createElement('div');
        item.classList.add('item');

        // Close Icon
        // create <i> class="far fa-times-circle" id="delete-bookmark" 
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('far', 'fa-times-circle');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        
        // Favicon / Link Container
        // create <div> class="name"
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');

        // create <img> alt="Favicon"
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://www.google.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon')

        // create <a> Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        // Append all to <div> class="container" id="bookmarks-container">
        // use .append() to append multiple items (vs 1 item with .appendChild())
        // start at lowest child level element and roll up to parent element
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
};

// Fetch bookmarks from local storage (if available)
function fetchBookmarks() {

    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in local storage with 1 item
        bookmarks = [
            {
                name: 'Jacinto Design',
                url: 'https://www.',
            },
        ];

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };

    // console.log(JSON.stringify(bookmarks));
    buildBookmarks();
};

// Delete Bookmark
function deleteBookmark(url) {
    // console.log('Delete url: ', url);

    // iterate through bookmarks
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        };

        // Update bookmarks array in localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        // repopulate DOM
        fetchBookmarks();
    });
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

    //console.log(nameValue, urlValue);

    // validate Form data.
    if (!validateForm(nameValue, urlValue)) {
        return false;
    };

    // bookmark object
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };

    // pass Bookmark Object to Array of Objects
    bookmarks.push(bookmark);
    // console.log(JSON.stringify(bookmarks));

    // persist to local storage cache
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // load bookmarks from local storage
    fetchBookmarks();

    // reset Form
    bookmarkForm.reset();

    // return focus on Website name
    websiteNameEl.focus();
};

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();