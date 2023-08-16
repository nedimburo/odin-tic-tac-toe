const gameBoard=(()=>{
    let playerOne;
    let playerTwo;
    let gameBoardArray=["", "", "", "", "", "", "", "", ""];
    let scoreLeft=0;
    let scoreRight=0;
    let roundCounter=1;
    let roundInSession=false;
    let playersTurn;
    const getArray=()=>gameBoardArray;
    const setPlayerOne=player=>playerOne=player;
    const getPlayerOne=()=>playerOne;
    const setPlayerTwo=player=>playerTwo=player;
    const getPlayerTwo=()=>playerTwo;
    const increaseScoreLeft=()=>++scoreLeft;
    const increaseScoreRight=()=>++scoreRight;
    const getScoreLeft=()=>scoreLeft;
    const getScoreRight=()=>scoreRight;
    const increaseRound=()=>++roundCounter;
    const getRound=()=>roundCounter;
    const toggleRoundStatus=()=>{
        (roundInSession) ? roundInSession=false : roundInSession=true;
    };
    const getRoundStatus=()=>roundInSession;
    const setFirstTurn=()=>playersTurn=playerOne;
    const togglePlayersTurn=()=>{
        (playersTurn==playerOne) ? playersTurn=playerTwo : playersTurn=playerOne;
    };
    const getPlayersTurn=()=>playersTurn;
    const checkGameBoard=()=>{
        let gridValue="";
        // Checking Rows
        for (let i=0; i<=6; i+=3){
            for (let j=i; j<=i+2; j++){
                gridValue+=getArray()[j];
            }
            if (gridValue=="XXX"){
                increaseScoreLeft();
                toggleRoundStatus();
                displayController.endOfRoundDisplay(getPlayerOne().getName());
            }
            if (gridValue=="OOO"){
                increaseScoreRight();
                toggleRoundStatus();
                displayController.endOfRoundDisplay(getPlayerTwo().getName());
            }
            gridValue="";
        }
        // Checking Columns
        for (let i=0; i<=2; i++){
            for (let j=i; j<=i+6; j+=3){
                gridValue+=getArray()[j];
            }
            if (gridValue=="XXX"){
                increaseScoreLeft();
                toggleRoundStatus();
                displayController.endOfRoundDisplay(getPlayerOne().getName());
            }
            if (gridValue=="OOO"){
                increaseScoreRight();
                toggleRoundStatus();
                displayController.endOfRoundDisplay(getPlayerTwo().getName());
            }
            gridValue="";
        }
        // Checking Diagonals
        gridValue=getArray()[0]+getArray()[4]+getArray()[8];
        if (gridValue=="XXX"){
            increaseScoreLeft();
            toggleRoundStatus();
            displayController.endOfRoundDisplay(getPlayerOne().getName());
        }
        if (gridValue=="OOO"){
            increaseScoreRight();
            toggleRoundStatus();
            displayController.endOfRoundDisplay(getPlayerTwo().getName());
        }
        gridValue="";
        gridValue=getArray()[2]+getArray()[4]+getArray()[6];
        if (gridValue=="XXX"){
            increaseScoreLeft();
            toggleRoundStatus();
            displayController.endOfRoundDisplay(getPlayerOne().getName());
        }
        if (gridValue=="OOO"){
            increaseScoreRight();
            toggleRoundStatus();
            displayController.endOfRoundDisplay(getPlayerTwo().getName());
        }
        gridValue="";
    };
    const nextRound=()=>{
        gameBoardArray=["", "", "", "", "", "", "", "", ""];
        playersTurn=playerOne;
        toggleRoundStatus();
        increaseRound();
        displayController.generateGrid();
        displayController.updateNextRound();
    };
    const restartGame=()=>{
        gameBoardArray=["", "", "", "", "", "", "", "", ""];
        playersTurn=playerOne;
        scoreLeft=0;
        scoreRight=0;
        roundCounter=1;
        toggleRoundStatus();
        displayController.generateGrid();
        displayController.clearWinner();
    };
    const cancelGame=()=>{
        playerOne=undefined;
        playerTwo=undefined;
        gameBoardArray=["", "", "", "", "", "", "", "", ""];
        scoreLeft=0;
        scoreRight=0;
        roundCounter=1;
        roundInSession=false;
        playersTurn=undefined;
        displayController.restartScreen();
    };
    return{
        getArray,
        setPlayerOne,
        getPlayerOne,
        setPlayerTwo,
        getPlayerTwo,
        increaseScoreLeft,
        increaseScoreRight,
        getScoreLeft,
        getScoreRight,
        increaseRound,
        getRound,
        toggleRoundStatus,
        getRoundStatus,
        setFirstTurn,
        togglePlayersTurn,
        getPlayersTurn,
        checkGameBoard,
        nextRound,
        restartGame,
        cancelGame,
    }
})();

const displayController=(()=>{
    const inputMarker=element=>{
        if (gameBoard.getArray()[element.getAttribute("grid-position")]=="" && gameBoard.getRoundStatus()){
            gameBoard.getArray()[element.getAttribute("grid-position")]=gameBoard.getPlayersTurn().getMarker();
            gameBoard.checkGameBoard();
            gameBoard.togglePlayersTurn();
        }
        else{
            if (!gameBoard.getRoundStatus()){
                alert("Round has finished.");
                return;
            }
            else{
                alert("Marker is already placed in selected field.");
                return;
            }
        }
        generateGrid();
    }
    const generateGrid=()=>{
        let display=document.getElementById("game-container");
        display.innerHTML="";
        // For Grid
        let mainDiv=document.createElement("div");
        mainDiv.setAttribute("id", "grid-container");
        for (let i=0; i<gameBoard.getArray().length; i++){
            let gridItem=document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.setAttribute("grid-position", `${i}`);
            gridItem.setAttribute("onclick", "displayController.inputMarker(this)");
            gridItem.textContent=gameBoard.getArray()[i];
            mainDiv.appendChild(gridItem);
        }
        display.appendChild(mainDiv);
        // For Scoreboard
        let scoreBoard=document.createElement("div");
        scoreBoard.setAttribute("id", "score-board-container");
        let scoreTitle=document.createElement("h2");
        scoreTitle.setAttribute("id", "score-board-title");
        scoreTitle.textContent="SCORE";
        display.appendChild(scoreTitle);
        let roundInfo=document.createElement("p");
        roundInfo.setAttribute("id", "round-info");
        roundInfo.textContent="Round: "+gameBoard.getRound();
        display.appendChild(roundInfo);
        scoreBoard.innerHTML=`<p class="score-info">${gameBoard.getPlayerOne().getName()}: ${gameBoard.getScoreLeft()}</p><br>
                                <p class="score-info">${gameBoard.getPlayerTwo().getName()}: ${gameBoard.getScoreRight()}</p>`;
        display.appendChild(scoreBoard);
    };
    const getFormDetails=()=>{
        let playersName=document.getElementById("username").value;
        if (playersName=="") return;
        if (gameBoard.getPlayerOne()==undefined){
            let player=Player(playersName, "X");
            gameBoard.setPlayerOne(player);
            createForm();
        }
        else{
            let player=Player(playersName, "O");
            gameBoard.setPlayerTwo(player);
            gameBoard.setFirstTurn();
            gameBoard.toggleRoundStatus();
            generateGrid();
        }
    };
    const createForm=()=>{
        let display=document.getElementById("game-container");
        display.innerHTML="";
        if (gameBoard.getPlayerOne()==undefined){
            display.innerHTML=`<div id=form-container>
                             <form id="user-input-form">
                                <label for="username">Enter first player name:</label><br>
                                <input type="text" name="username" id="username">
                             </form>
                             <div id="form-button-container">
                                <button onclick="displayController.getFormDetails()" class="submit-button">Submit</button>
                             </div>
                           </div>`;
        }
        else{
            display.innerHTML=`<div id=form-container>
                             <form id="user-input-form">
                                <label for="username">Enter second player name:</label><br>
                                <input type="text" name="username" id="username">
                             </form>
                             <div id="form-button-container">
                                <button onclick="displayController.getFormDetails()" class="submit-button">Submit</button>
                             </div>
                           </div>`;
        }
    };
    const startGame=()=>{
        let startButton=document.getElementById("start-button-container");
        startButton.style.display="none";
        let display=document.getElementById("game-container");
        display.style.display="block";
        createForm();
    };
    const endOfRoundDisplay=playerName=>{
        let display=document.getElementById("game-info-container");
        display.style.display="block";
        let roundInfo=document.getElementById("round-winner-info");
        roundInfo.textContent=`${playerName} is the winner of the round.`;
        let scoreBoardUpdate=document.getElementById("score-board-container");
        scoreBoardUpdate.innerHTML=`<p class="score-info">${gameBoard.getPlayerOne().getName()}: 
                                        ${gameBoard.getScoreLeft()}</p><br>
                                        <p class="score-info">${gameBoard.getPlayerTwo().getName()}: 
                                        ${gameBoard.getScoreRight()}</p>`;
        if (gameBoard.getScoreLeft()==3){
            let winnerDisplay=document.getElementById("game-info-container");
            let winnerOfGame=document.createElement("p");
            winnerOfGame.setAttribute("id", "game-winner");
            winnerOfGame.textContent="Winner of the game: "+gameBoard.getPlayerOne().getName();
            winnerDisplay.appendChild(winnerOfGame);
            // For Buttons
            let buttonsDisplay=document.getElementById("game-control-button-container");
            buttonsDisplay.style.display="flex";
            let restartGameButton=document.createElement("button");
            let cancelGameButton=document.createElement("button");
            restartGameButton.textContent="Restart Game";
            cancelGameButton.textContent="Cancel";
            restartGameButton.classList.add("game-control-button");
            cancelGameButton.classList.add("game-control-button");
            restartGameButton.setAttribute("onclick", "gameBoard.restartGame()");
            cancelGameButton.setAttribute("onclick", "gameBoard.cancelGame()");
            buttonsDisplay.appendChild(restartGameButton);
            buttonsDisplay.appendChild(cancelGameButton);
        }
        else if(gameBoard.getScoreRight()==3){
            let winnerDisplay=document.getElementById("game-info-container");
            let winnerOfGame=document.createElement("p");
            winnerOfGame.setAttribute("id", "game-winner");
            winnerOfGame.textContent="Winner of the game: "+gameBoard.getPlayerTwo().getName();
            winnerDisplay.appendChild(winnerOfGame);
            // For Buttons
            let buttonsDisplay=document.getElementById("game-control-button-container");
            buttonsDisplay.style.display="flex";
            let restartGameButton=document.createElement("button");
            let cancelGameButton=document.createElement("button");
            restartGameButton.textContent="Restart Game";
            cancelGameButton.textContent="Cancel";
            restartGameButton.classList.add("game-control-button");
            cancelGameButton.classList.add("game-control-button");
            restartGameButton.setAttribute("onclick", "gameBoard.restartGame()");
            cancelGameButton.setAttribute("onclick", "gameBoard.cancelGame()");
            buttonsDisplay.appendChild(restartGameButton);
            buttonsDisplay.appendChild(cancelGameButton);
        }
        else{
            let buttonsDisplay=document.getElementById("game-control-button-container");
            buttonsDisplay.style.display="flex";
            let nextRoundButton=document.createElement("button");
            let cancelGameButton=document.createElement("button");
            nextRoundButton.textContent="Next Round";
            cancelGameButton.textContent="Cancel";
            nextRoundButton.classList.add("game-control-button");
            cancelGameButton.classList.add("game-control-button");
            nextRoundButton.setAttribute("onclick", "gameBoard.nextRound()");
            cancelGameButton.setAttribute("onclick", "gameBoard.cancelGame()");
            buttonsDisplay.appendChild(nextRoundButton);
            buttonsDisplay.appendChild(cancelGameButton);
        }
    };
    const updateNextRound=()=>{
        let winnerDisplay=document.getElementById("game-info-container");
        winnerDisplay.style.display="none";
        let buttonsDisplay=document.getElementById("game-control-button-container");
        buttonsDisplay.innerHTML="";
        buttonsDisplay.style.display="none";
    };
    const restartScreen=()=>{
        let gameDisplay=document.getElementById("game-container");
        gameDisplay.style.display="none";
        let winnerDisplay=document.getElementById("game-info-container");
        let removeWinnerInfo=document.getElementById("game-winner");
        winnerDisplay.removeChild(removeWinnerInfo);
        winnerDisplay.style.display="none";
        let buttonsDisplay=document.getElementById("game-control-button-container");
        buttonsDisplay.innerHTML="";
        buttonsDisplay.style.display="none";
        let startButton=document.getElementById("start-button-container");
        startButton.style.display="flex";
    };
    const clearWinner=()=>{
        let winnerDisplay=document.getElementById("game-info-container");
        let removeWinnerInfo=document.getElementById("game-winner");
        winnerDisplay.removeChild(removeWinnerInfo);
        winnerDisplay.style.display="none";
        let buttonsDisplay=document.getElementById("game-control-button-container");
        buttonsDisplay.innerHTML="";
        buttonsDisplay.style.display="none";
    };
    return{
        startGame,
        generateGrid,
        getFormDetails,
        inputMarker,
        endOfRoundDisplay,
        restartScreen,
        updateNextRound,
        clearWinner,
    }
})();

const Player=(name, marker)=>{
    this.name=name;
    this.marker=marker;
    this.getName=()=> name;
    this.getMarker=()=> marker;
    return{getName, getMarker};
};