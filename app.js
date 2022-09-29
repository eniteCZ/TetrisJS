document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    let timerID; 
    const ScoreDisplay = document.querySelector('#score');
    let StartBtn = document.querySelector('#start-btn');
    
    const lTetr = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width,width*2,width*2+1,width*2+2]
    ];

    const iTetr = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const sqTetr = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];

    const tTetr = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ];

    const zTetr = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ];

    const Tetrs = [lTetr,tTetr,sqTetr,iTetr,zTetr];

    let currentPos = 4;
    let currentRot = 0;
    let random = Math.floor(Math.random()*Tetrs.length);
    let currentTetr = Tetrs[random][currentRot];
    const displaySquares = document.querySelectorAll('.minigrid div');
    const displayWidth = 4;
    let displayIndex = 0;
    let nextRandom = 0;

    const upNext = [
        [1, displayWidth+1, displayWidth*2+1, 2],
        [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1],
        [0,1,displayWidth,displayWidth+1],
        [1,displayWidth,displayWidth+1,displayWidth+2],
        [0,displayWidth,displayWidth+1,displayWidth*2+1]
    ];

    //draw tetrimino
    function draw(){
        currentTetr.forEach(index=> {
            squares[currentPos+index].classList.add('tetr')
        })
    }

    function undraw(){
        currentTetr.forEach(index => {
            squares[currentPos+index].classList.remove('tetr')
        })
    }

    function moveDown() {
        undraw()
        currentPos += width
        draw()
        freeze()
    }

    function freeze(){
        if(currentTetr.some(index => squares[currentPos + index + width].classList.contains('taken'))) {
            currentTetr.forEach(index => squares[currentPos + index].classList.add('taken'))
            
            random = nextRandom
            nextRandom = Math.floor(Math.random()*Tetrs.length)
            currentTetr = Tetrs[random][currentRot]
            currentPos = 4
            draw()
            displayShape()
        }
    }

    function moveLeft(){
        undraw()
        let isAtLeftEdge = currentTetr.some(index => (currentPos + index ) % 10 === 0)
        if(!isAtLeftEdge) currentPos -=1
        if(currentTetr.some(index => squares[currentPos+index].classList.contains('taken'))){
            currentPos +=1
        }

        draw()
    }

    function moveRight(){
        undraw()
        let isAtRightEdge = currentTetr.some(index => (currentPos + index) % width === width - 1)
        if(!isAtRightEdge) currentPos +=1
        if(currentTetr.some(index => squares[currentPos+index].classList.contains('taken'))){
            currentPos -=1
        }

        draw()
    }

    function rotate() {
        undraw()
        currentRot ++
        if(currentRot === currentTetr.length){
            currentRot = 0
        }
        currentTetr = Tetrs[random][currentRot]
        draw()
    }

    function control(e){
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode ===38){
            rotate()
        } else if (e.keyCode === 39){
            moveRight()
        }else if (e.keyCode === 40){
            moveDown()
        }
    }

    function displayShape(){
        displaySquares.forEach( square =>{
            square.classList.remove('tetr')
        })
        upNext[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetr')
        })
    }

    //timerID = setInterval(moveDown, 1000);

    StartBtn.addEventListener('click', ()=>{
        if (timerID){
            clearInterval(timerID)
            timerID = null
        }else{
            draw()
            timerID = setInterval(moveDown,1000)
            nextRandom = Math.floor(Math.random()*Tetrs.length)
            displayShape()
        }
    })

    
    
    document.addEventListener('keyup', control);
})