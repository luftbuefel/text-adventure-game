//GAME ENGINE CODE HERE
//game-wide commands
//save the keycode for enter
const ENTER = 13;
const NONE = "";

const NORTH="north";
const SOUTH="south";
const EAST="east";
const WEST="west";
const DIRECTIONS = [NORTH, SOUTH, EAST, WEST];
const HELP ="help";
const LOOK = "look";
const INVENTORY = "inventory";

//UI controls
const textDisplay = window.document.getElementById("gameDisplay");
const actionButton = window.document.getElementById("actionButton");
actionButton.onclick = performCommand;
const actionText = window.document.getElementById("actionText");
actionText.onkeypress = catchKeypress;

//used for computer generated speech
const synthesis = window.speechSynthesis;

//keeps track of where the player is
let currentLocation;


function startGame(){
  textDisplay.value="";
  welcome();
}


function catchKeypress(e){
  if(e.keyCode==ENTER){
    e.preventDefault();
    performCommand();
  }
}


function performCommand(){
  //extract the command text and validate it
  let command = validateCommand(actionText.value);
  console.log("command "+command);
  //erase the old text from the action text area
  actionText.value = "";
  //do the command at the currentLocation
  currentLocation(command, false);
}


function write(textMessage, speakText = true){
  textDisplay.value+=textMessage+"\n\n";
  //move the scrollbar to the bottom so the new text is visible
  textDisplay.scrollTop = textDisplay.scrollHeight;
  if(speakText){
    return;
    speak(textMessage);
  }
}


function speak(message){
  var utterance = new SpeechSynthesisUtterance(message);
  synthesis.speak(utterance);
}


function printVoices(){
  let voices = synthesis.getVoices();
  console.log(JSON.stringify(voices));
}


function setMessage(newMessage = "What would you like to do?"){
  command.innerHTML = `<h3>${newMessage}</h3>`;
}


function validateCommand(command){
  command = command.toLowerCase();
  //apply any shortcuts and ensure the commands are always lowercase
  switch (command) {
    case "i":
      command = INVENTORY;
      break;
    case "l":
      command=LOOK
      break;
    case "n":
      command=NORTH;
      break;
    case "s":
      command=SOUTH;
      break;
    case "e":
      command=EAST;
      break;
    case "w":
      command=WEST;
      break;
    default:
      break;
  }
  return command;
}


function checkCommand(command){
  // console.log(command);
  if(command==LOOK){
    currentLocation();
  } else if(DIRECTIONS.indexOf(command)>-1){
    write("You cannot go "+command);
  }else if (command==HELP){
    write("Commands you can use include "+NORTH+", "+ SOUTH+", "+ EAST+", "+ WEST+", "+ HELP+", "+ LOOK+", and "+ INVENTORY);
  }else{
    write("I'm not going to "+command);
  }
}


//Game specific code goes below here
//
//
//locations
function welcome(){
  currentLocation = welcome;
  write("You recently won a trip on a gameshow. The trip was to fabulous Maui. Unfortunately your plane experienced some complications and crashed into the sea. Luckily you were able to hold on to your seat, using it as a floatation device. After several long hours you wash up on the beach of a mysterious island.", false);
  beach();
}


function beach(command = ""){
  currentLocation = beach;
  switch (command) {
    case NORTH:
      volcano();
      break;
    case WEST:
      forest();
      break;
    case NONE:
      write("You are standing on a sandy beach. Tiny animals skutter too and fro. A large looming mountain lies to the north. A friendly sea lion playfully splashes in the waves. There seems to be a path leading into the forest to the west.", true);
      break;
    default:
      checkCommand(command);
      break;
  }
}


function forest(command = ""){
  currentLocation = forest;
  switch (command) {
    case NORTH:
      abandonedVillage();
      break;
    case EAST:
      beach();
      break;
    case "":
      write("Without hesitation you boldly march into the forest. Thick tendrils of vines hang from the canopy. The path continues north. The way you came lies to the east.");
      break;
    default:
      checkCommand(command);
      break;
  }
}


function abandonedVillage(){
  currentLocation = abandonedVillage;
  //check for commands
  switch(command){
    case SOUTH:
      forest();
      break;
    case "":
      write("Wow, it looks like you have arrived at an abandoned village. I bet there is some good stuff here!");
      break;
    default:
      checkCommand(command);
      break;
  }
}


function volcano(){
// alert("volcano"+command);

  currentLocation = volcano;
  switch (command) {
    case NONE:
      // setMessage("Be careful dude! This place is dangerous.");
      write("Oh dang! You are at the top of a scary volcano.");
      break;
    case SOUTH:
      beach();
      break;
    default:
      checkCommand(command);
      break;
  }
}


function gameOver(){
  currentLocation = gameOver;
}


printVoices();
// speak("It is working");
//start the actual game
startGame();
