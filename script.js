var playing = false;
var score;
var trialsleft;
var step; 
var action; 
var fruits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; 

$(function () {
  $("#front").show();
  $("#startReset").click(function () {
    if (playing == true) {
      
      location.reload(); 
    } else {
      $("#front").hide();
      $("#score").show();
      playing = true;
      score = 0;
      $("#scoreValue").html(score);

      $("#trialsleft").show();
      trialsleft = 3;
      addhearts();
      $("#gameOver").hide();
      $("#startReset").html("Reset Game");

      startAction();
    }
  });
  $("#fruit1").mouseover(function () {
    score++;
    $("#scoreValue").html(score);


    $("#slicesound")[0].play();

  
    clearInterval(action);

  
    $("#fruit1").hide("explode", 500); //slice fruit

    //send new fruit
    setTimeout(startAction, 500);
  });

  //functions

  //addhearts
  function addhearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsleft; i++) {
      $("#trialsleft").append(
        '<img src="https://raw.githubusercontent.com/Saumya-07/Fruit-Slicer/master/images/wrong.png" , class="life">'
      );
    }
  }

  //start action
  function startAction() {
    //generate random fruit
    $("#fruit1").show();

    //choose random fruit
    chooseRandom();
    //random position
    $("#fruit1").css({
      left: Math.round(550 * Math.random()),
      top: -50,
    });
    //generate random step
    step = 1 + Math.round(5 * Math.random()); //change steps
    //descend fruits down by 10ms
    action = setInterval(function () {
      //move fruit by one step
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      //check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitcontainer").height() - 50) {
        //yes it is low
        // check trails left
        if (trialsleft > 1) {
          //generate a fruit
          $("#fruit1").show();
          //choose random fruit
          chooseRandom();
          //random position
          $("#fruit1").css({
            left: Math.round(550 * Math.random()),
            top: -50,
          });
          //generate random step
          step = 1 + Math.round(5 * Math.random()); //change steps

          //reduce trials by one
          trialsleft--;
          //populate trails left box by one
          addhearts();
        } else {
          //game over
          playing = false; //we are ot playing any more
          $("#score").hide();
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trialsleft").hide();
          stopAction(); //stops Action
        }
      }
    }, 10);
  }

  //choose random fruits
  function chooseRandom() {
    $("#fruit1").attr(
      "src",
      "https://raw.githubusercontent.com/Saumya-07/Fruit-Slicer/master/images/" +
        fruits[Math.round(9 * Math.random())] +
        ".png"
    );
  }
  // Stop Action
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
