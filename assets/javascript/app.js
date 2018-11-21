// Initial array of characters
var topics = ["Santa", "The Grinch", "Rudolph", "Clark Griswold Christmas"];

// displayCharacterInfo function re-renders the HTML to display the appropriate content
function displayCharacterInfo() {

    var character = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=4O3RWoZw084z2KGkXGc5V5DB9koMIIdv&limit=10";

    // Creating an AJAX call for the specific character button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        // Creating a div to hold the gif
        var characterDiv = $("<div class='character'>");

        // Looping through the response object to retrieve the 10 ratings and gifs URLs
        for (var i = 0; i < 10; i++) {

            // Retrieving the URLs for the images
            var stillImgURL = response.data[i].images.original_still.url;

            var animImgUrl = response.data[i].images.original.url;

            // Creating an element to hold the still image and add attributes so the click image animate / still toggle works
            var image = $("<img>").attr({ "src": stillImgURL, "data-state": "still", "data-animate": animImgUrl, "data-still": stillImgURL, "class": "gif" });

            // Appending the image to the character dive created above
            characterDiv.append(image);

            // Storing the rating data
            var rating = response.data[i].rating;
            // console.log("Rating: " + rating);

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            characterDiv.append(pOne);

            // Putting the the new gifs requested above the last ones
            $("#character-view").prepend(characterDiv);
        }

        // On click function to toggle between a still and animated gif

        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

    });

}

// Function for displaying gif data
function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each gif in the array
        var a = $("<button>");
        // Adding a class of character-btn to our button
        a.addClass("character-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events when a gif button is clicked
$("#add-character").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var character = $("#search-input").val().trim();

    // Adding gif from the textbox to our array
    topics.push(character);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "character-btn"
$(document).on("click", ".character-btn", displayCharacterInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
