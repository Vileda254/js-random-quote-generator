// Wrap private functionality in a quoteGenerator module.
var quoteGenerator = (function(global) {

  // Array of quote objects.
  var quote_objects = [
    {
      quote: "People who think they know everything are a great annoyance to those of us who do.",
      source: "Isaac Asimov",
      citation: "www.brainyquote.com",
      year: 1985,
      category: "funny quotes"
    },
    {
      quote: "Always remember that you are absolutely unique. Just like everyone else.",
      source: "Margaret Mead",
      citation: "www.brainyquote.com",
      category: "funny quotes"
    },
    {
      quote: "Do not take life too seriously. You will never get out of it alive.",
      source: "Elbert Hubbard",
      citation: "www.brainyquote.com",
      category: "funny quotes"
    },
    {
      quote: "I'm sorry, if you were right, I'd agree with you.",
      source: "Robin Williams",
      citation: "www.brainyquote.com",
      category: "funny quotes"
    },
    {
      quote: "Get your facts first, then you can distort them as you please.",
      source: "Mark Twain",
      citation: "www.brainyquote.com",
      category: "funny quotes"
    },
    {
      quote: "Life is really simple, but we insist on making it complicated.",
      source: "Confucius",
      citation: "www.brainyquote.com",
      category: "life quotes"
    },
    {
      quote: "Life is ten percent what happens to you and ninety percent how you respond to it.",
      source: "Lou Holtz",
      citation: "www.brainyquote.com",
      category: "life quotes"
    },
    {
      quote: "The purpose of life is a life of purpose.",
      source: "Robert Byrne",
      citation: "www.brainyquote.com",
      category: "life quotes"
    }
  ];

  // Array for temporarily storing quote objects from quoteObjects array.
  var quote_objects_temp = [];

  // Generate a random body and load quote button background colors.
  function changeColor () {
    // Get a random RGB color value up to 200, so the white font is always visible.
    var randColor = function generator() {
      return Math.floor(Math.random() * 200);
    };
    var red = randColor();
    var green = randColor();
    var blue = randColor();
    var final_color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

    // Assing generated RGB color to body and load quote button.
    body.style.backgroundColor = final_color;
    load_quote_btn.style.backgroundColor = final_color;
  }

  function getRandomQuote () {
    // Generate a random quoteObjects index.
    var rand = Math.floor(Math.random() * quote_objects.length);

    // If the quoteObjects array isn't empty remove one quote object from it, append it to the quoteObjectsTemp array and then return it.
    if (quote_objects.length > 0) {
      var quote = quote_objects.splice(rand, 1)[0];
      quote_objects_temp.push(quote);
      return quote;
    } else {
      // Else if quoteObjects array is empty transfer all quote objects from the quoteObjectsTemp array back into the quoteObject array, empty the quoteObjectsTemp array and rerun the function to return a new quote object.
      quote_objects = quote_objects_temp;
      quote_objects_temp = [];
      return getRandomQuote();
    }
  }

  function printQuote () {
    // Get a random quote object
    var quote_obj = getRandomQuote();

    // Append mandatory object keys to the quoteStr string.
    var quoteStr = '<p class="quote">' + quote_obj.quote + '</p><p class="source">' + quote_obj.source;

    // If given key exists on the quote object append it to the quoteStr string.
    quoteStr += quote_obj.citation ? '<span class="citation">' + quote_obj.citation + '</span>' : '' ;
    quoteStr += quote_obj.year ? '<span class="year">' + quote_obj.year + '</span>' : '';
    quoteStr += quote_obj.category ? '<span class="category">' + quote_obj.category + '</span></p>' : '</p>';

    // Use quoteStr as the html of the quote-box element.
    document.getElementById('quote-box').innerHTML = quoteStr;

    // Change body background and load quote button colors to a random color.
    changeColor();
  }

  // Assign public functions to the API.
  var public_API = {
    printQuote: printQuote
  };

  // Run the printQuote function every 30 seconds.
  global.setInterval(printQuote, 30000);

  // Return the public API object.
  return public_API;

}(window));

// DOM elemnt variables
var body = document.body;
var load_quote_btn = document.getElementById('loadQuote');

// event listener to respond to clicks on the page
// when user clicks anywhere on the page, the "makeQuote" function is called
load_quote_btn.addEventListener("click", quoteGenerator.printQuote, false);
