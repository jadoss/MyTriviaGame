var triviaArray = [{
	name: "Roquefort",
	description: "Roquefort is a sheep milk blue cheese from the south of France, and together with Bleu d'Auvergne, Stilton, and Gorgonzola is one of the world's best known blue cheeses.",
	img: "./assets/images/Roquefort.jpg",
	choices: ["Cheddar", "Swiss","Feta","Roquefort"],
	meal: "popular on salads and dressings",
},
{
	name: "Cheddar",
	description: "Cheddar cheese is a relatively hard, off-white, sometimes sharp-tasting, natural cheese. Originating in the English village of Cheddar in Somerset, cheeses of this style are produced beyond this region and in several countries around the world.",
	img: "./assets/images/cheddar.png",
	choices: ["Roquefort", "Swiss","Feta","Cheddar"],
	meal: "Sandwich Food... don't use for anything else",


},
{
	name: "Mozzarella",
	description: "Mozzarella is a traditionally southern Italian dairy product made from Italian buffalo's milk by the pasta filata method. Mozzarella received a Traditional Specialities Guaranteed certification from the European Union in 1998.",
	img: "./assets/images/mozzarella.jpg",
	choices: ["Roquefort", "Swiss","Mozzarella","Feta"],
	meal: "popular on the Margharita Pizza",
},
{
	name: "Camembert",
	description: "Camembert is a soft, creamy, surface-ripened cow's milk cheese. It was first made in the late 18th century at Camembert, Normandy, in northern France.",
	img: "./assets/images/camembert.jpg",
	choices: ["Roquefort", "Camembert","Mozzarella","Feta"],
	meal: "popular on pastas",
},
{
	name: "Cotija",
	description: "Cotija is a hard cow's milk cheese that originated from Mexico. It is named after the town of Cotija, Michoacán.",
	img: "./assets/images/cotija.jpg",
	choices: ["Cotija", "Swiss","Camembert","Feta"],
	meal: "Do you like taco's drop some cotija on that meat!",
},
{
	name: "Feta",
	description: "Feta is a brined curd white cheese made in Greece from sheep's milk, or from a mixture of sheep and goat's milk. Similar brined white cheeses produced in Europe are often made partly or wholly of cow's milk, and they are also sometimes called feta.",
	img: "./assets/images/feta.jpg",
	choices: ["Roquefort", "Swiss","Mozzarella","Feta"],
	meal: "Everything put it on everything!",
},
{
	name: "Chevre",
	description: "Goat cheese, goats' cheese, or chèvre, is cheese made from goat's milk.",
	img: "./assets/images/chevre.jpg",
	choices: ["Roquefort", "Chevre","Mozzarella","Feta"],
	meal: "Toast, Sandwiches, Melt it on Chicken It's Delicious!",
}
]

var originalTriviaArrayLength = triviaArray.length;

var targetCheese;

var cheeseIndex;

var wins = 0;

var cheeses = 1;

var number = 30; //timer

var counter;

var unanswered = 0;

function questionTimer(){
	counter = setInterval(decrement, 1000);
}

function stop(){
	clearInterval(counter);
}

//this is the function of the end-of-timer/game result
function decrement(){ 
	number--;
	$('#timer').html("<p><strong>" + number + " seconds left</strong></p>");
	if (number === 0) {
		stop();
		triviaArray.splice(cheeseIndex, 1);
		unanswered++;
		$("#instructions").html("<p>You didnt know the cheese?</p>");
		$("#timer").empty();
		$("#answerChoices").html("<p class='options'>" + targetCheese.description + "</p>");
		$("#eventButton").html("<button class='button'>Next Cheese</button>")
		if(triviaArray.length === 0){
			empty();
			$("#instructions").html("You answered " + wins + " out of " + originalTriviaArrayLength + " correctly.")
		}
	}
}
//when prompt populateQuestion will fill in the GameContent as the game begins
function populateQuestion(){
	targetCheese = triviaArray[Math.floor(Math.random()*triviaArray.length)];
	cheeseIndex = triviaArray.indexOf(targetCheese);
	$("#cheesesLeft").html(cheeses + "/" + originalTriviaArrayLength + " cheese.");
	$("#instructions").html("<p id='meal'>" + targetCheese.meal + "</p>");
	$("#image").html("<p><img class=cheeseImage src='" + targetCheese.img + "'></p>");
	//reset timer
	number = 30;
	//start timer
	questionTimer();
	//display timer
	for (var i = 0; i < targetCheese.choices.length; i++){
		$("#answerChoices").append("<p class='choices'>" + targetCheese.choices[i] + "</p>");
	}
	cheeses++;
}

function empty(){
	$("#instructions").empty();
	$("#image").empty();
	$("#answerChoices").empty();
	$("#timer").empty();
	$("#eventButton").empty();
	$("#scoreButton").empty();
}

function checkAnswer(){
	$(".choices").on('click', function(){
		var guessedName = $(this).text();
		triviaArray.splice(cheeseIndex, 1); //removes cheese so no duplicates
		stop();
		if (triviaArray.length > 0) {
			if (guessedName === targetCheese.name){
				wins++;
				$("#instructions").html("<p>Correct!</p>")
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetCheese.description + "</p>");
				$("#eventButton").html("<button class='button'>Next Cheese</button>");
			}
			else{
				$("#instructions").html("<p>Incorrect!</p>")
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetCheese.description + "</p>");
				$("#eventButton").html("<button id='nextButton' class='button'>Next Cheese</button>");
			}
		}

		if (triviaArray.length === 0) {
			if (guessedName === targetCheese.name){
				wins++;
				$("#instructions").html("<p>Correct!</p>");
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetCheese.description + "</p>");
				$("#eventButton").html("<button class='button'>See your score</button>");
			}
			else{
				$("#instructions").html("<p>Incorrect!</p>");
				$("#timer").empty();
				$("#answerChoices").html("<p>" + targetCheese.description + "</p>");
				$("#scoreButton").html("<button id='nextButton' class='button'>See your score</button>");
			}
		}
	});
}

$(document).ready(function(){
	$("#startButton").on('click', function(){
		populateQuestion();
		checkAnswer();
	});

	$("#eventButton").on('click', function(){
		empty();
		populateQuestion();
		checkAnswer();

	});

	$("#scoreButton").on('click', function(){
		empty();
		$("#cheesesLeft").empty();
		if (wins === 7) {
			$("instructions").html("You're super cheesy here's a video of ")
		}
		else {
		$("#instructions").html("You answered " + wins + " out of " + originalTriviaArrayLength + " correctly!<br><p>You left " + unanswered + " unanswered.")
		}
	});

});