// Change to your public marvel key.
var marvelApiKey = '0283a5777660227fbb1d7d136564ec70'

$('#character-input-form').submit(handleSubmit)

function handleSubmit(event){
    event.preventDefault()

    var characterName = $('#character-input').val()
    var requestUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&apikey=${marvelApiKey}`

    fetch(requestUrl)
    .then(function(response){
        // Basic error handling, needs refinement based on return code.
        if (response.status !== 200) {
            console.log('Error, check response for more info')
            console.log(response)
            return 
        }
        return response.json()
    })
    // Placeholder for next step in the chain.
    .then(function(data){
        console.log(data)
        // Triggers if the data recieved from request has no matching entries.
        if (data.data.count === 0) {
            console.log("No entires by that name, check spelling and try again.")
        }
        renderCharBio(data)
        return data
    })
}


// Function 'renderCharBio' -> This function will accept the data object from the fetch request & will pull out and display relevant bio data to the '#character-bio' div.
function renderCharBio(data) {

    // Declare element variable element to append to
    var charBioEl = $('#character-bio');

    // Declare relevant varaibles from object
    var charBioData = data.data.results[0];
    var charName = charBioData.name;
    var charBio = charBioData.description;
    var comicCount = charBioData.comics.available
    console.log(comicCount);

    // Create template literal to append
    var charBioContent = $(`
        <!-- Hero Section to display character name -->
        <section class="hero is-danger">
        <div class="hero-body">
        <p class="title">
            ${charName}
        </p>
        <p class="subtitle">
            ${charBio}
        </p>
        </div>
    </section>

    `);

    // Append to page
    charBioEl.append(charBioContent);
};

// ===========================================================================================
// make an api call to the amazon price api 
// refrain from using this as much as possible and use the getAmazonTest() function
function getAmazonApi(str){
    str = str.trim();
    var api = "https://amazon-price1.p.rapidapi.com/search?marketplace=US&keywords=" + str;

    fetch(api, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "06a5507a5emsh840791a7a3fd071p1e73d1jsn1809fb7fcf9b",
            "x-rapidapi-host": "amazon-price1.p.rapidapi.com"
        }
    })
    .then(function (response) {
        return response.json(); // add error handling
    })
    .then(function (data) {
        // renderMerch(data); pass the json data into the render function
    });
};

// test search term is "Spider-Man" use this to test 
function getAmazonTest() {
    var api = "./assets/js/response.json";

    fetch(api)
     .then(function (response) {
        return response.json();
     })
     .then(function (data) {
        console.log(data);
        renderMerch(data)
     });

};

// takes json data from getAmazonApi function
function renderMerch(data) {
    for (var i=0; i<5; i++) {
        var container = $("#merchandiseArea"); // html element reference
        var imageUrl = data[i].imageUrl; 
        var price = data[i].price;
        var title = data[i].title;

        // if the title is very long, shortens it
        if (title.length > 25) {
            title = title.slice(0,25) + "...";
        };
        
        // render the title, price and thumbnail into the element
        container.append(`
            <div class="column is-one-fifth">
                <div class="tile has-background-success">
                    <p class="title is-5">${title} \n ${price}</p>
                    <img src="${imageUrl}">
                </div>
            </div>
        `);
    };

    
}

getAmazonTest();
