//Aqui ira todo el codigo Javascript
//Autor: Dariel de Sosa

//Hacemos una funcion anonima para el tablero
(function(){

    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(ball);
            return elements;
        }
    }

})();

//Funcion para la Vista
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = this.board;
        this.ctx = canvas.getContext("2d");
    }
})();

//Se ejecuta la ventana lafuncion main
window.addEventListener("load",main);

//Funcion main
function main(){

    //Declaramos el tablero
    var board = new Board(800,400);
    var canvas = document.getElementById("canvas");
    var boardView = new BoardView(canvas,board);

}