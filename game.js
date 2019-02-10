//GAME ENGINE CODE HERE
//game-wide commands
//save the keycode for enter
const ENTER = 13;
const NONE = "";

const NO = "no";
const YES = "yes";
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
const commandDisplay = window.document.getElementById("commandDisplay");
//used for computer generated speech
const synthesis = window.speechSynthesis;

//keeps track of where the player is
let currentLocation;


let inventory = [];
let usedInventory = [];

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
  commandDisplay.innerHTML = `<h3>${newMessage}</h3>`;
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
  write("After years of waiting you finally saved enough money to get a ticket to Hawaii. Unfortunately you got on the wrong plane and now you are in a mysterious land.");
  beach();
}


function beach(command = ""){
  currentLocation = beach;
  switch (command) {
    case EAST:
      bridge();
      break;
    case "get chicken":
    case "get rubber chicken":
        write("You reach down and hastily grab the rubber chicken. It's amazing that you got the chance to have something so valuable in your possession.");
        inventory.push("rubber chicken");
      break;
    case NONE:
      write("Waves lap up onto the beach in this peaceful lagoon. There is a road that goes off to the east.");
      //items
      if (inventory.includes("rubber chicken")&&!usedInventory.includes("rubber chicken")){
        write("A beautiful rubber chicken lays on the ground peering at its own reflection in a tidal pool.")
      }
      break;
    default:
      checkCommand(command);
      break;
  }
}


function bridge(command = ""){
  currentLocation = bridge;
  switch (command) {
    case SOUTH:
      town();
      break;
    case WEST:
      beach();
      break;
    case "":
      write("You are standing on a bridge, there is a deep river. If you happened to fall off this bridge, you are sure it would be the last trip you ever take. The road goes back to west and south.");
      break;
    default:
      checkCommand(command);
      break;
  }
}


function town(command = ""){
  currentLocation = town;
  //check for commands
  switch(command){
    case SOUTH:
      shop();
      break;
    case EAST:
      cave();
      break;
      case NORTH:
      bridge();
      break;
    case SOUTH:
      shop();
      break;
    case WEST:
      bank();
      break;
    case "":
      write("You arrive at a small town there is a lovely fountain with a statue of a chicken in the town square. To the west there is a large impressive building. To the south there is a shopping area. In the east you see a long road going towards the mountains. There is a river in the distance to the north.");
      break;
    case "look chicken":
    case "look at chicken statue"
    case "look at statue":
        write  ("You look into the tender eyes of the chicken statue. It feels like they are staring into the depths of your soul. They also appear to be looking to the west.")
    default:
      checkCommand(command);
      break;
  }
}


function bank(command = ""){

//    
//    answer = input("Will you accept the offer?").lower()
//    if(answer=="yes" or answer=="y"):
//      inventory.append("diamond")
//      inventory.remove("rubber chicken")
//      usedInventory.append("rubber chicken")
//      print("\nThank you, Thank you, you've made me so happy!")
//    else:
//      print("\nI hope you reconsider. That rubber chicken is simply divine!")
//  else:
//    print("\nA bank employee approaches and says, I am sorry but this bank is for account holders only.")
//  command = getCommand()
//    
    

  currentLocation = bank;
  switch (command) {
    case NONE:
//      setMessage("Be careful dude! This place is dangerous.");
      write("You are at a bank; impressive marble columns rise above holding up the massive vaulted ceiling. The exit is to the east.");
      if(inventory.contains("rubber chicken")){
        write("A bank official approached you and says, \"What a magnificent rubber chicken! I must have it. Will you accept this diamondAfter years of waiting you finally saved enough money to get a ticket to Hawaii. Unfortunately you got on the wrong plane and now you are in a mysterious land. for it?\"");
        setMessage("Will you accept the offer?");
      }
      break;
    case YES:
      inventory.push("diamond");
//      inventory.remove("rubber chicken");
      usedInventory.push("rubber chicken");
        write("Thank you, Thank you, you've made me so happy!");
        setMessage();
        break;
    case NO:
        write("I hope you reconsider. That rubber chicken is simply divine!");
        setMessage();
        break;
    case EAST:
      town();
      break;
    default:
      checkCommand(command);
      break;
  }
}


function shop(command = ""){
    currentLocation = shop;
    switch (command) {
        case "":
          write("You enter a shop and see many beautiful wares. There are no other customers around.");
            if(inventory.contains("sword")){
                write("You notice a beautiful sword on display. You stare at it in silence for a while and the shop keeper comes over. \"Like the sword do ya? That's pure titanium with mother of pearl inlay on the handle. It's so sharp you could cut the hair off a peach with it. Got anything of value? I do consider trades.")  
            }
          break;
        case "give chicken":
        case "give rubber chicken":
             if(inventory.contains("rubber chicken" in inventory)){
                write("While that is nice I am afraid I am going to have to pass; I have a latex allergy.")
             }else{
                write("What are you talking about?")
             }
        
        case "give diamond":
        case "offer diamond":
            write("That's quite a rock! It will make a great toy for my dragon to play with. She loves shiny things! The sword is yours!")
            inventory.push("sword");
        //    inventory.remove("diamond")
            usedInventory.push("diamond");
          break;
        case NORTH:
          town();
          break;
        default:
          checkCommand(command);
          break;
  }
}

function cave(command = ""){
    currentLocation = cave;
    switch (command) {
        case WEST:
          town();
          break;
        case "":
          write("You arrive at the entrance to a terrible cave. There is an old woman sitting on a rock who looks at you and says, \"If I were you, I wouldn't go in there without a sword. Then she falls asleep.\"");
          break;
        case "enter cave":
        case "cave":
        case "go in":
        case "go in cave":
            write("You reluctantly enter the cave. It has a musky smell and you hear the faint sound of breathing. Out of no where a large horned monster jumps out at you.");
            if(inventory.contains("sword")){
                write("You think this might be the end and then suddenly you remember you have a sword. You get your deadly sword and offer it as a present to the monster. \"What a beautiful sword! you are a very kind person indeed! I would love to be your friend! You become good friends and together you win the game through the power of friendship. :D");
            }else{
               write("The monster looks at you with surprise. \"What are you doing in my house!\" The frightened monster hits you with a broom. You begin to run but slip on the damp cave floor. You start to slide and before you know it you shoot off of the side of a cliff. Luckily there are lots of pillows below. Unluckily, that is because there is another monster sleeping at the bottom of the cliff. Your timing is bad and instead of landing on the pillows, you land right in the monster's mouth. Having someone suddenly fall into its mouth wakes the monster. It coughs and accidentally swallows you whole. Looks like it wasn't your luck day. Game over :("); 
            }
            //game ends
        default:
          checkCommand(command);
          break;
        }
}


function gameOver(command = ""){
  currentLocation = gameOver;
}


printVoices();
//start the actual game
startGame();
