function setup()
{
    createCanvas(512,512)
    setupSound()
}

function draw()
{
    soundDraw()
    background(0)
    ellipse(256,256,bass,bass)
}