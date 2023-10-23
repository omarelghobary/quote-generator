let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const xBtn= document.getElementById('x');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden =false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden =true;

}

// show new quote
function newQuote() {
    showLoadingSpinner()
    let quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // check if author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown ';
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine 
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set a quote and hide the loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
    } catch(error) {
        // Catch the error 
    }
}

// Post

function postQuote(){
    const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl, '_blank')
}

xBtn.addEventListener('click', postQuote);
newQuoteBtn.addEventListener('click', getQuotes);

// On load
getQuotes();


