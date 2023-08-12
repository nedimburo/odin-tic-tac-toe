const gameBoard=(()=>{
    let gameBoardArray=["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    const getArray=()=>gameBoardArray;
    return{
        getArray,
    }
})();

const displayController=(()=>{
    const generateGrid=()=>{
        let display=document.getElementById("game-container");
        let mainDiv=document.createElement("div");
        mainDiv.setAttribute("id", "grid-container");
        for (let i=0; i<gameBoard.getArray().length; i++){
            let gridItem=document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.textContent=gameBoard.getArray()[i];
            mainDiv.appendChild(gridItem);
        }
        display.appendChild(mainDiv);
    };
    const startGame=()=>{
        let startButton=document.getElementById("start-button");
        startButton.style.display="none";
        let display=document.getElementById("game-container");
        display.style.display="block";
        generateGrid()
    };
    return{
        startGame,
    }
})();

const Player=(name, marker)=>{
    this.name=name;
    this.marker=marker;
    this.getName=()=> name;
    this.getMarker=()=> marker;
    return{getName, getMarker};
};