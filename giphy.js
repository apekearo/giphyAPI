$(document).ready(function(){

	//array of Elements
	var element=["Earth", "Fire", "Wind", "Water", "Love", "Dirt", "Plants", "Sun","Moon","Darkness", "Frequency", "Science"]

	//adds user input to element array
	$("#submit").on("click",function(){
		event.preventDefault();
		var newGif=$("#input").val().trim();
		element.push(newGif);
		gifButtons();
	})

	//creates button for all listed in element array
	function gifButtons(){
		$("#buttonArea").empty();
		for (var i=0; i<element.length; i++){
			var button=$("<button>"+element[i]+"</button>")
			button.addClass("gif");
			button.data("name", element[i]);
			$("#buttonArea").append(button);
		}
	}

	//function applies AJAX properties to pull and display gifs from giphy API
	function displayGif (){

		//clears gifArea div
		$("#gifArea").empty();

		var elementTitle = $(this).data("name");
		//replaces spaces in titles with + for easier searching

		elementTitle=elementTitle.replace(/ /g,'+')
		console.log(elementTitle);

		//url from where data is retrieved. Limit is set to 10 gifs
		var queryURL= "https://api.giphy.com/v1/gifs/search?q="+elementTitle+"&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method:"GET"

		//performs this function when ajax commands are complete			
		}).done(function(response){
			console.log(response);
			for (var i=0; i<response.data.length; i++){
				var holder = $("<div>");
				holder.addClass("holder");

				//stores rating data and initial image as still
				var rating=$("<div>"+"Rating: "+ response.data[i].rating + "</div>");
				var image=$("<img>").attr("src", response.data[i].images.fixed_height_still.url);
				image.addClass("image");
				image.attr("data-type", "still");

				//saves dynamic and static gif URLs
				image.attr("data-still", response.data[i].images.fixed_height_still.url);
				image.attr("data-dynamic", response.data[i].images.fixed_height.url);

				//appends rating info and still image to html
				holder.append(rating);
				holder.append(image);
				$("#gifArea").append(holder);
			}
			
			//initiates the moving gif once clicked
			$(".image").on("click",function(){
			console.log("click");
			var state=$(this).attr("data-type")
			console.log(state);

			//if the image is still, when it's clicked, change its src url to the dynamic link
			if (state==="still"){
				$(this).attr("src", $(this).attr("data-dynamic"));
				console.log($(this).attr("data-dynamic"));
				$(this).attr("data-type","dynamic");
			}
			//if the image is dynamic, when it's clicked, change its src url to the still link
			else{
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-type","still");
				}
			});
		});
	}
	//shows initial buttons when the page loads
	gifButtons();

	//Event Delegation so that when a button is clicked (including user additions), run the displayGif function
	$(document).on("click",".gif",displayGif);

})