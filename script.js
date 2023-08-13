const gameBoard=(()=>{
    let playerOne;
    let playerTwo;
    let gameBoardArray=["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    const getArray=()=>gameBoardArray;
    const setPlayerOne=player=>playerOne=player;
    const getPlayerOne=()=>playerOne;
    const setPlayerTwo=player=>playerTwo=player;
    const getPlayerTwo=()=>playerTwo;
    return{
        getArray,
        setPlayerOne,
        getPlayerOne,
        setPlayerTwo,
        getPlayerTwo,
    }
})();

const displayController=(()=>{
    const generateGrid=()=>{
        let display=document.getElementById("game-container");
        display.innerHTML="";
        let mainDiv=document.createElement("div");
        mainDiv.setAttribute("id", "grid-container");
        for (let i=0; i<gameBoard.getArray().length; i++){
            let gridItem=document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.textContent=gameBoard.getArray()[i];
            mainDiv.appendChild(gridItem);
        }
        display.appendChild(mainDiv);
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
                             </form>;
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
                             </form>;
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