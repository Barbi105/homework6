
// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

$(document).ready(function(){

    var topics = ["tiger", "lion", "zebra", "elephant", "giraffe", "pig", "seal", "whale", "bear", "starfish", "goat"]
    
    function giphyGenerator(arg){
$("#giphy-view").empty();

        var animal = arg;
        console.log("Animal name: "+ animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";;
    
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var result = response.data;
            console.log(result);
            for(var i=0;i<result.length;i++){
                var gif_div = $("<div>");
                var p = $("<p>").text(result[i].rating);

                var gifImg = $("<img>");
                gifImg.attr("src", result[i].images.downsized_still.url);
                gifImg.attr("data-still", result[i].images.downsized_still.url);
                gifImg.attr("data-animate", result[i].images.downsized.url);
                gifImg.attr("data-state","still");
                gifImg.addClass("gif-style");
                gif_div.append(p);
                gif_div.append(gifImg);
                $("#giphy-view").append(gif_div);
            }
        });  
    }
    function renderButtons(){
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++){
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons").append(a);
        }
    }
    
    $("#add-button").on("click", function(event){
        event.preventDefault();
        var input = $("#button-input").val().trim();
        topics.push(input);
        console.log(topics);
        renderButtons();
    });
    
    renderButtons();
    
    $(document).on("click", ".animal", function(){
        var animal = $(this).attr("data-name");
        //console.log("Animal name in btn click: "+animal);
        giphyGenerator(animal);
    });

    $(document).on("click", ".gif-style", function(){
        var state = $(this).attr("data-state");
        if(state==="animate"){
            $(this).attr("src", $(this).data("still"));$(this).attr("data-state","still");
        }
        else{
            $(this).attr("src", $(this).data("animate"));$(this).attr("data-state","animate");
        }
    });

});
    

// // 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
// //    * We chose animals for our theme, but you can make a list to your own liking.
// $(document).ready(function(){

// var topics = ["tiger", "lion", "zebra", "elephant", "giraffe", "pig", "seal", "whale", "bear", "starfish", "goat"]

// function giphyGenerator(){

//     var animal = $(this).attr("data-name")
//     var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rMYHDql9o5y28pib9CqhwKMDWyazFYyK&q=" + animal + "&limit=10&offset=0&rating=PG&lang=en";


//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//     .then(function(response) {

//         // var results = response.data
//         // for (var i = 0; i <results.length; i++){
//         // var pic = $("<img>");
//         // console.log(results);

//         console.log(response);

   
//         //animate results here
//         $("#buttons").text(JSON.stringify(results.analytics.embed_url));
        
//     });
// function renderButtons(){
//     $("#buttons").empty();
//     for (var i = 0; i < topics.length; i++){
//         var a = $("<button>");
//         a.addClass("animal");
//         a.attr("data-name", topics[i]);
//         a.text(topics[i]);
//         $("#buttons").append(a);
//     }
// }

// $("#add-button").on("click", function(event){
//     event.preventDefault();
//     var input = $("#button-input").val().trim();
//     topics.push(input);
//     console.log(topics);
//     renderButtons();
// });


// renderButtons();

// $(document).on("click", ".animal", giphyGenerator);
// }
// })


// // 2. Your app should take the topics in this array and create buttons in your HTML.
// //    * Try using a loop that appends a button for each string in the array.

// // 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// // 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// // 5. Under every gif, display its rating (PG, G, so on).
// //    * This data is provided by the GIPHY API.
// //    * Only once you get images displaying with button presses should you move on to the next step.

// // 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// // 7. Deploy your assignment to Github Pages.

// // 8. **Rejoice**! You just made something really cool.
