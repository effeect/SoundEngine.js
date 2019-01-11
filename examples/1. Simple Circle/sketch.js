/*
Hello there!

This is a simple example of a circle that reacts to bass.
*/

function setup()
{
    setupSound()
    createCanvas(500,500)
}

function draw()
{
    drawSound()
    background(0)
    
    ellipse(width/2,height/2,bass,bass)
    console.log(bass)
    console.log(mid)
    console.log(treble)
}