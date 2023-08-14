const gameBoard=(()=>{
    let playerOne;
    let playerTwo;
    let gameBoardArray=["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    let scoreLeft=0;
    let scoreRight=0;
    let roundCounter=1;
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
    }
})();

const displayController=(()=>{
    const generateGrid=()=>{
        let display=document.getElementById("game-container");
        display.innerHTML="";
        // For Grid
        let mainDiv=document.createElement("div");
        mainDiv.setAttribute("id", "grid-container");
        for (let i=0; i<gameBoard.getArray().length; i++){
            let gridItem=document.createElement("div");
            gridItem.classList.add("grid-item");
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
        console.log(gameBoard.getPlayerOne().getName()+" "+gameBoard.getPlayerOne().getMarker());
        console.log(gameBoard.getPlayerTwo().getName()+" "+gameBoard.getPlayerTwo().getMarker());
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
    return{
        startGame,
        getFormDetails,
    }
})();

const Player=(name, marker)=>{
    this.name=name;
    this.marker=marker;
    this.getName=()=> name;
    this.getMarker=()=> marker;
    return{getName, getMarker};
};