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
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    
    //Remove enemy's health bt subtracting the amout set in the playerAttack variable
    //Generate random damage value based on player's attack power
    
    var damage = randomNumber(playerAttack - 3, playerAttack);

    enemyHealth = Math.max(0, enemyHealth - damage);
    
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
    var damage = randomNumber(enemyAttack - 3, enemyAttack);

    playerHealth = Math.max(0, playerHealth - damage);
  
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
    enemyHealth = randomNumber(40, 60);
    
    //Use debugger to pause script from running and check what's going on at that moment in the code
  
    //Pass the pickedEnemyName variable's value into the fight function, where it will assume the the value of the enemyName parameter
    fight(pickedEnemyName);

    //If player is still alive and we're not at the last enemy in the array
    if (playerHealth > 0 && i < enemyNames.length -1){
      
      //Ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      //If yes, take them to the shop() function
      if (storeConfirm){
      shop();
      }
    }

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

var shop = function(){
  //Ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
  "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  //Use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      if (playerMoney >= 7){
        window.alert("Refilling player's health by 20 for 7 dollars.");
  
        //Increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;

      } else {
        window.alert("You don't have enough money!");
      }
      break;

    case "UPGRADE":
    case "upgrade":
      if (playerMoney >= 7){
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        
        //Increase attack and decrease money
        playerAttack = playerAttack + 6; 
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;

    case "LEAVE":  
    case "leave":
      window.alert("Leaving the store.");

      //Do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      //Call shop() again to force player to pick a valid option
      shop();
      break;
  }

};

//Function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//Start the game when the page loads
startGame();




