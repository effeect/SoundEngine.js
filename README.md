# SoundEngine.js
This is a little extension to p5.js that allows the user to tie their music files to bass, mids and treble with ease. This is achieved by using P5.dom.js and P5.sound. This extensions requires P5.js, P5.sound.js and P5.dom.js.

# What is it?
It's a quick and easy way to use any MP3 file in your system and use that data from the music to create sketches in p5.js. You can do something simple like a circle that reacts to bass to something that shifts color depending on treble values. Using the functions creates a HTML element that accepts audio files and plays it through the clients computer. The audio starts playing immediately after the file the user has submitted has been processed through JavaScript.

# How do I implement it?
Link the soundEngine.js file into your HTML
`<script src="soundEngine.js" type="text/javascript"></script>`

Next, call functions setupSound and drawSound in your sketch file like this :
`function setup()
{
    setupSound()
}`
and
`function draw()
{
    drawSound()
}`

# What values are available to me?
There are five main variables you can access that give out values, they spit out values between 0 and 255 :
    - `bass`
    - `lowMid`
    - `mid`
    - `highMid`
    - `treble`
    - `level (from 0 to 1)`


