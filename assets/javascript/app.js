
// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

$(document).ready(function(){

    var topics = ["Earth", "Space", "Supernova", "Asteroid", "Venus", "Jupiter", "Star", "Rocket", "Astronaut", "Comet"]
    
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
                var p = $("<p>").text("Rating: " + result[i].rating);
                var gifImg = $("<img>");
                gif_div.addClass("pictureBlock");
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
    
