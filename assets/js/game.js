// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// this creates a function named "fight"

var fightOrSkip = function (){
  //Ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

  promptFight = promptFight.toLowerCase();

  //Conditional recursive function call
  if (promptFight === "" || promptFight === null){
    window.alert("You need to provide a valid answer! Please try agian.");
    return fightOrSkip();
  }

  //If player picks "SKIP" confirm and then stop the loop
  if (promptFight === "skip") {

    //Confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //If yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");

      //Subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      shop();
    }
  }

  //If yes (true), leave fight
  if (confirmSkip){
    window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");

    //Subtract money from playerInfo.money for skipping, but don't let them go into the negative 
    playerInfo.money = Math.max(0, playerInfo.money -10);

    //Return true if player wants to leave
    return true;
  }

}

var fight = function (enemy) {
  //Keep track of who goes first
  var isPlayerTurn = true;

  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  //Repeat and execute as long as the enemy-robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) { 
    if (isPlayerTurn){
      
      //Ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        //if true, leave fight by breaking loop
        break;
      }
      
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
    
    
      //Remove enemy's health bt subtracting the amout set in the playerInfo.attack variable
      //Generate random damage value based on player's attack power
    
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);
    
      console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");


      //Check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
    
        //Award player money for winning
        playerInfo.money = playerInfo.money + 20;
    
        //Leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      
      //player gets attack first
    } else {
      //Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      
      //Remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      
      //Log a resulting message to the console so we know that it worked
      console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
  
      //Check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
    

        //Leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    } 
    //Switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
}; //End of fight function








//Function to start a new game
var startGame = function (){
 
  //Reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    
    if (playerInfo.health > 0) {
      //Let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    //Pick new enemy to fight based on the index of the enemy.name array
    var pickedEnemyObj = enemyInfo[i];
  
    //Reset enemy.health before starting new fight
    pickedEnemyObj.health = randomNumber(40, 60);
    
    //Use debugger to pause script from running and check what's going on at that moment in the code
  
    //Pass the pickedenemy.name variable's value into the fight function, where it will assume the the value of the enemy.name parameter
    fight(pickedEnemyObj);

    //If player is still alive and we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length -1){
      
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

  window.alert("The game has now ended. Let's see how you did!");

  //Check local storage for high score, if it's not there, use 0

  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  //If player has more money than the high score, plater has new high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  } else {
    alert(playerInfo.name + "did not beat the high score of " + highScore + ". Maybe next time!");
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);
  //Use switch to carry out action
  switch (shopOptionPrompt) {
    
    case 1:
      playerInfo.refillHealth();
      break;

    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      window.alert("Leaving the store.");

      //Do nothing, so function will end
      break;
    default:
      window.alert("Please pick an integer number only.Try again.");
 
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

//Function to set name
var getPlayerName = function(){
  var name = "";

  while(name === "" || name === null){
    name = prompt("What is your robot's name?");
  }

  console.log("your robot's name is " + name);
  return name;
};


var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, //comma!
  refillHealth: function(){

    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
      
    } else {
      window.alert("You don't have enough money!");
    }
  }, //comma
  upgradeAttack: function(){
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14),
  },

  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },

  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];


//Start the game when the page loads
startGame();




