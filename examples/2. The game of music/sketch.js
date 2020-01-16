//function preload() {
//    sound = loadSound("sound.mp3") //The song for the sketch is Radiohead - Climbing up the Walls. I chose this song because of it's unique amp values throughout the song.
//}

var cells = []; //Array of cells

//Values for cell generation
var sz = 128;
var wsz = 512;

//Fill Values :
var i = 0;
var j = 0;

//Music Related Functions
var sound;
var amplitude;
var level;
var levelMapped;
var levelMapped2;

var onOff = true;

//UI/UX Related functions :
var numberLimitSlider;
var fileInput;
var show = true;

function setup() {
    createCanvas(wsz, wsz);

    //Array Creator!
    for (var x = 0; x < sz; x++) {
        cells[x] = [];
        for (var y = 0; y < sz; y++) {
            cells[x][y] = round(random(0, 1));
        }
    }

    //Music Related Functions
    amplitude = new p5.Amplitude(); //This function creates an object that can read amp functions inside P5.
    amplitude.setInput(sound) //Setting the input of this file as the variable "sound" which is where our MP3 sound is located

    //UI/UX related functions :
    //I decided to create a slider which allows the user to change the amp limit, which is the moment where the cells react and create new cells according to the amp. I've put this in because all MP3 files and songs which have widely diffirent amps so this is more of a debug feature than a UI feature
    numberLimitSlider = createSlider(1, 5, 1) //The third number means that it defaults to 1, the first two are the range of the slider.
    numberLimitSlider.position(400, 510)
    numberLimitSlider.style('width', '100px')

    //File Input functions :
    input = createFileInput(handleFile)

}


function handleFile(file) //This function handles the audio transfer from the computer to the program and back to the computer. Note : the nature of this function means that it will take a few seconds for the sound file to become available to play through the mousePressed function. This function is local so it doesn't require a direct connection to the server
{
    if (file.type === 'audio') {
        console.log("Sound Loading")
        sound = loadSound(file.data)
        console.log(file)
    }
}


function draw() {
    //Music Related Variables
    level = amplitude.getLevel() //This function gets us the level between 0 and 1 of the total amp of the song

    //Mapped Variables 
    levelMapped = map(level, 0, 1, 255, 0)
    levelMapped2 = map(level, 0, 1, 0, 6)

    //    background(0);
    //Target Array
    var target = []; //Creating a temp array, used for cells later.

    // Run the simulation for each cell in the grid
    for (var x = 0; x < sz; x++) {
        target[x] = []
        for (var y = 0; y < sz; y++) {

            target[x][y] = CA(x, y);
        }
    }

    cells = target;
    var valueSlider = numberLimitSlider.value()
    var numberLimit = map(valueSlider,1,5,0.2,1.5)
    var textinfo = "Use the slider to choose the amp value, and press '1' to start playing the song.\nClick 'choose file' to add any music file of your choice.\nPlease give the program 10 seconds to load in the sound file.\nIf you don't have a MP3 uncomment the preload function in the code.\n\nPress h to hide all text."
    
    console.log("Amp True Value : " + levelMapped2
               )

    //This is where the generation of new cells of the sketch happens, there is a boolean value to make sure its not spammed which from testing seems to crash the sketch. Instead, the boolean acts as a switch and the sketch can only generate new cells if the amp goes below the numberlimit beforehand.
    if (levelMapped2 > numberLimit && onOff) {
        for (var x = 0; x < sz; x++) {
            cells[x] = [];
            for (var y = 0; y < sz; y++) {
                cells[x][y] = round(random(0, 1));
            }
        }

        onOff = false;
    } else if (levelMapped2 < numberLimit) {
        onOff = true;
    }

    var rsz = wsz / sz; //Size for Rects, can be overidden

    noStroke() //Attempting this with stroke will result in an extremely low framerate.

    if (levelMapped2 > numberLimit) {
        i++
        j++
    }

    //Creating a modulao loop for the fill values, partly inspired by my previous sketch.
    if (i == 255) {
        i = 0;
    }
    if (j == 200) {
        j = 0
    }

    for (var x = 0; x < sz; x++) {
        for (var y = 0; y < sz; y++) {
            var c = cells[x][y] * levelMapped //This bit allow
            fill(c, i, j);
            rect(x * rsz, y * rsz, rsz, rsz);
        }
    }

    //UI AND UX STUFF
    //Text values and functions
    if (show) {
        fill(255)
        stroke(0)
        text(textinfo, 10, 20)
        text("Amp Limit (Goes to 6) : " + numberLimit, 350, 500)
        var rounded = round(levelMapped2, 2)
        text("Current Amp : " + rounded, 350, 480)
    }

}


function CA(x, y) { //CA, AKA Celluar Automata

    var V = cells[x][y]; // the current value of the cell
    var N = getVonNeumannNegheibourhood(x, y); // the Moore neighbourhood (8)

    if ((V + N) == 3 || (V * (V + N)) == 4) { //This rule allows the cells to be in a standstill, which means the genration of new cells is much more noticable.
        return 1;
    } else {
        return 0;
    }
}

function getVonNeumannNegheibourhood(x, y) { //Taken from this example : https://www.openprocessing.org/sketch/517328
    //This method is based on the Von Neumann method, I've added a statement below that changes the cell values based on the levelmapping variable which is tied to the music
    var value = 0;
    value += getCellValue(x, y, 0, -1);
    value += getCellValue(x, y, -1, 0);
    value += getCellValue(x, y, 1, 0);
    value += getCellValue(x, y, 0, 1);

    value += getCellValue(x, y, levelMapped, levelMapped2); //This value creates the stopping of the cells which allows for the generation of new cells to be more noticeable

    return value;
}

function getCellValue(x, y, mx, my) { //Taken from this example : https://www.openprocessing.org/sketch/517328
    var res = 0;
    x += mx;
    y += my;
    if (x >= 0 && x <= sz - 1 && y >= 0 && y <= sz - 1) {
        res = cells[x][y];
    }
    return res;
}

function keyPressed() //Key pressed function that allows for the file to be played
{
    switch (key) {
        case '1':
            sound.play()
            break;
        case 'H':
            if (show == false) {
                show = true;
            } else if (show) {
                show = false
            }
    }
}

//Function for rounding for UI/UX expercience, taken from : http://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}