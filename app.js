document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-btn')

    const lTetr = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width,width*2,width*2+1,width*2+2]
    ]

    const iTetr = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const sqTetr = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const tTetr = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const Tetrs = [lTetr,tTetr,sqTetr,iTetr]

    let currentPos = 4
    let currentRot = 0
    let random = Math.floor(Math.random()*Tetrs.length)
    let currentTetr = Tetrs[random][currentRot]

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
            
            random = Math.floor(Math.random()*Tetrs.length)
            currentTetr = Tetrs[random][currentRot]
            let currentPos = 4
            draw()
        }
    }

    timerID = setInterval(moveDown, 1000)
})