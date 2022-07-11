const main = document.querySelector(".main")
const cols = 22;
const rows = 22;
const game_speed = 200;
let snek;
let current_direction = "right";

window.addEventListener("load", evt => {grid_setup()} )
const grid_setup = () => {
    main.setAttribute("style",`grid-template-columns: repeat(${cols},1fr); grid-template-rows: repeat(${rows},1fr)`)
    for(let i=0;i<cols*rows;i++){
        let div = document.createElement("div");
        div.setAttribute("id",`div${i}`);
        main.appendChild(div);
    }
    let center_ish=rows*Math.floor(cols/2)+Math.floor(cols/3)
    snek = new Snake([center_ish,center_ish+1,center_ish+2]);
    snek.update()
    document.body.addEventListener("keydown", evt => {snek.detection()})
    setInterval(() => {
        snek.move(snek.current_direction);
        snek.update();
    }, game_speed);
}
class Snake{
    current_direction = "right";
    constructor(chunks) {
        this.chunks = chunks;
      }
    move(direction){
        this.chunks.shift();
        switch(direction){
            case "up":
                this.chunks.push(this.chunks[this.chunks.length-1]-rows);
                console.log("movin up")
                break;
            case "down":
                this.chunks.push(this.chunks[this.chunks.length-1]+rows);
                console.log("movin down")
                break;
            case "left":
                this.chunks.push(this.chunks[this.chunks.length-1]-1);
                console.log("movin left")
                break;
            case "right":
                this.chunks.push(this.chunks[this.chunks.length-1]+1);
                console.log("movin right")
                break;
        }
        snek.update();
    }
    update(){
        document.querySelectorAll(".snake").forEach(el => {
            el.classList.remove("snake")
        });
        this.chunks.forEach(el => {
            let chunk = document.querySelector(`#div${el}`);
            chunk.classList.add("snake");
        });
    }
    detection(){
        document.body.addEventListener("keydown", evt => {
            switch(evt.key){
                case "ArrowUp":
                    this.current_direction = "up";
                    break;
                case "ArrowDown":
                    this.current_direction = "down";
                    break;
                case "ArrowLeft":
                    this.current_direction = "left";
                    break;
                case "ArrowRight":
                    this.current_direction = "right";
                    break;
            }
        });
    }
}