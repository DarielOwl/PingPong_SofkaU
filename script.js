//Aqui ira todo el codigo Javascript
//Autor: Dariel de Sosa

//Hacemos una funcion anonima para el tablero
(function(){ //Modelo para el Tablero

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
            elements.push(this.ball);
            return elements;
        }
    }

})();

//Creamos las barras laterales (o sea las paletas de cada jugador)
(function(){
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this); //Insertar la barra en el tablero
        this.kind = "rectangle"; //Decimos que es
    }

    self.Bar.prototype = { //Creamos un JSON
        down: function(){

        },
        up: function(){

        } 
    }
})();

//Funcion para la Vista
(function(){

    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];
                draw(this.ctx,el); //Dibuja lo que toma del array y el contexto
            };
        }
    }

    function draw(ctx,element){

        //Hacemos que el elemento kind tenga un tipo y no sea null
        if(element !== null && element.hasOwnProperty("kind")){
            
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
            }
        }

    }

})();

//Se ejecuta la ventana lafuncion main
window.addEventListener("load",main);

//Funcion main
function main(){ //Controlador

    //Declaramos el tablero
    var board = new Board(800,400);
    var bar = new Bar(20,100,40,100,board);
    var bar = new Bar(740,100,40,100,board);
    var canvas = document.getElementById("canvas");
    var boardView = new BoardView(canvas,board);

    //Dibujar los objetos
    boardView.draw();
}

