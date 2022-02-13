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
        this.playing = false; //para poner pausa el juego
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }
    }

})();

//Configurar Pelota
(function(){
    
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;

        board.ball = this;
        this.kind = "circle";
    }

    //Crear metodo para que se mueva la pelota
    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
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
        },

        play: function(){
            if(this.board.playing){ //Si el juego sale de pausa, reanuda
                
                //Limpiar los cuadros que quedan atras
                this.clean();

                //Dibujar los objetos
                this.draw();

                //Movimiento de la pelota en el tablero
                this.board.ball.move();
            }
        }
    }

    function draw(ctx,element){
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y,element.radius,0,7);
                ctx.fill();
                ctx.closePath();
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
var ball = new Ball(350,100,10,board);

//Configurar el movimiento de las barras
document.addEventListener("keydown",function(ev){
    
    //ev.preventDefault();

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
    else if(ev.keyCode == 32){
        ev.preventDefault();
        board.playing = !board.playing;
    }
});

boardView.draw();

//Animacion para que se mueva las barras
window.requestAnimationFrame(controller);

//Funcion main
function controller(){ //Controlador

    //Start the Game
    boardView.play();

    //Animacion para que se mueva las barras
    window.requestAnimationFrame(controller);
}

