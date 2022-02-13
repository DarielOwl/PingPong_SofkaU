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
            //elements.push(this.ball);
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
        this.speed = 20;
    }

    self.Bar.prototype = { //Creamos un JSON
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        } 
        /*toString: function(){
            return "x: "
        }*/
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
        
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },

        draw: function(){ //Dibuja las barras del juego
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];
                draw(this.ctx,el); 
            };
        }
    }

    function draw(ctx,element){
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
        }
    }

})();

//Declaramos el tablero
var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board);
var bar2 = new Bar(740,100,40,100,board);
var canvas = document.getElementById("canvas");
var boardView = new BoardView(canvas,board);

//Configurar el movimiento de las barras
document.addEventListener("keydown",function(ev){
    
    ev.preventDefault();

    if(ev.keyCode == 38){ //Flecha arriba
        bar.up();
    }
    else if(ev.keyCode == 40){ //Flecha abajo
        bar.down();
    }
    else if(ev.keyCode == 87){ //W
        bar2.up();
    }
    else if(ev.keyCode == 83){ //S
        bar2.down();
    }
});

//Animacion para que se mueva las barras
window.requestAnimationFrame(controller);

//Funcion main
function controller(){ //Controlador

    //Limpiar los cuadros que quedan atras
    boardView.clean();

    //Dibujar los objetos
    boardView.draw();

    //Animacion para que se mueva las barras
    window.requestAnimationFrame(controller);
}

