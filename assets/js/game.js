// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// this creates a function named "fight"

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyNames) {

  while (playerHealth > 0 && enemyHealth > 0) {

    //ask player if they'd like to fight or run
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    //If player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP"){
      
      //confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      
      //If yes(true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        
        //Subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    
    //Remove enemy's health bt subtracting the amout set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    
    console.log(playerName + " attacked " + enemyNames + ". " + enemyNames + " now has " + enemyHealth + " health remaining.");


    //Check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyNames + " has died!");
    
      //Award player money for winning
      playerMoney = playerMoney + 20;
    
      //Leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyNames + " still has " + enemyHealth + " health left.");
    }
    
    //Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable
    playerHealth = playerHealth - enemyAttack;
  
    //Log a resulting message to the console so we know that it worked
    console.log(enemyNames + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
  
    //Check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
    

      //Leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  } //End of while loop
}; //End of fight function






//Function to start a new game
var startGame = function (){
 
  //Reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    
    if (playerHealth > 0) {
      //Let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    
    //Pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];
  
    //Reset enemyHealth before starting new fight
    enemyHealth = 50;
    
    //Use debugger to pause script from running and check what's going on at that moment in the code
  
    //Pass the pickedEnemyName variable's value into the fight function, where it will assume the the value of the enemyName parameter
    fight(pickedEnemyName);
    } else {
    window.alert("You have lost your robot in battle! Game Over!");
    break;
    }
  }
  endGame();
};

//Function to end the entire game
var endGame = function (){

  //If player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survided the game! You now have a score of " + playerMoney + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }

  //Ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {

    //Restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

//Start the game when the page loads
startGame();




