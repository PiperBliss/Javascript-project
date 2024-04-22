document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid')
    const flagsleft = document.querySelector('#flags-left')
    const result = document.querySelector('#result')
    const width = 10
    let bombAmount = 20
    let flags = 0
    let squares = []
    let isGameOver = false

    console.log(grid);

    //Create Board
    function createBoard() {
        flagsleft.innerHTML = bombAmount

        //get shuffled game array with random bombs
        const bombArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width * width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombArray)
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
        

        for (let i = 0;  i < width * width; i++){
             const square = document.createElement('div')
             square.id = i
             square.classList.add(shuffledArray[i])
             grid.appendChild(square)
             squares.push(square)
             
             //normal click
             square.addEventListener('click',function() {
                console.log("not gogo gaga")
                click(square)
             });

             //cntrl and left click
             square.addEventListener('contextmenu', function(event) {
                event.preventDefault();
                console.log("gogo gaga bitch")
                addFlag(square);
            });
        }

        //add numbers
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1)

            if (document.getElementById(i).classList.contains('valid')) {
                if ( i > 0 && !isLeftEdge && document.getElementById(i-1).classList.contains('bomb')) total++ 
                if ( i > 9 && !isRightEdge && document.getElementById(i+1-width).classList.contains('bomb')) total++
                if ( i > 10 && document.getElementById(i-width).classList.contains('bomb')) total++
                if ( i > 11 && !isLeftEdge && document.getElementById(i-width-1).classList.contains('bomb')) total++
                if ( i < 99 && !isRightEdge && document.getElementById(i+1).classList.contains('bomb')) total++
                if ( i < 90 && !isLeftEdge && document.getElementById(i-1+width).classList.contains('bomb')) total++
                if ( i < 88 && !isRightEdge && document.getElementById(i+1+width).classList.contains('bomb')) total++
                if ( i < 89 && document.getElementById(i+width).classList.contains('bomb')) total++
                document.getElementById(i).setAttribute("data",total)

            }
        }
    }
    createBoard()

    // add flag with right click
    function addFlag(square){
        if (isGameOver) {return} 
        if (!(square.classList.contains('flag')) && (flags <= bombAmount)) {
            console.log("level 1")
            if (!square.classList.contains('flag')) {
                console.log("Add Flag")
                flags++
                square.classList.contains('flag')
                square.innerHTML = '🚩'
                flagsleft.innerHTML = bombAmount - flags
                checkForWin()
            } }
        else 
        {
            console.log("Remove Flag")
            square.classList.remove('flag')
            flags--
            square.innerHTML = ' '
            flagsleft.innerHTML = bombAmount - flags
            return
        }
        
    }

    function click(square) {
        console.log(square)
        if (isGameOver || square.classList.contains('checked') || square.classList.contains('flag')) return

        if(square.classList.contains('bomb')){
            gameOver()
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                if (total == 1) square.classList.add('one')
                if (total == 2) square.classList.add('two')
                if (total == 3) square.classList.add('three')
                if (total == 4) square.classList.add('four')
                square.innerHTML = total
                return
            }
            checkSquare(square)
        }
        square.classList.add('checked')

    }

    function checkSquare(square) {
        const currentId = square.id
        const isLeftEdge = (square.id % width === 0)
        const isRightEdge = (square.id % width === width -1 )

        setTimeout(function() {
            if (currentId > 0 && !isLeftEdge){
                const newId = parseInt(currentId) - 1
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge){
                const newId = parseInt(currentId) + 1 - width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10){
                const newId = parseInt(currentId) - width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge){
                const newId = parseInt(currentId) - 1 - width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge){
                const newId = parseInt(currentId) + 1
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge){
                const newId = parseInt(currentId) - 1 + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge){
                const newId = parseInt(currentId) + 1 + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 99){
                const newId = parseInt(currentId) + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }


        }, 10)
    }

    function checkForWin(){
        let matches = 0
        for( let i = 0; i < squares.length; i++) {
            if (document.getElementById(i).classList.contains('flag') && document.getElementById(i).classList.contains('bomb')){
                matches++
            }
            if (matches == bombAmount) {
                result.innerHTML = 'You Win!'
                isGameOver = true
            }
        }
    }

    function gameOver() {
        result.innerHTML = 'Game Over!'
        isGameOver = true

        //show all the bombs
        squares.forEach(function(square) {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣'
                square.classList.remove('bomb')
                square.classList.add('checked')
            }
        })
    }

})