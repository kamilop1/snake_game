const cols = 22; //settings:
const rows = 22;
const game_speed = 400;


let snek, push;
let current_direction = "right";
let running = false;

window.addEventListener("load", evt => {grid_setup()} )
const grid_setup = () => {
    const main = document.querySelector(".main")
    main.setAttribute("style",`grid-template-columns: repeat(${cols},1fr); grid-template-rows: repeat(${rows},1fr)`)
    for(let i=0;i<cols*rows;i++){
        let div = document.createElement("div");
        div.setAttribute("id",`div${i}`);
        main.appendChild(div);
    }
    let center_ish=rows*Math.floor(cols/2)+Math.floor(cols/3)
    snek = new Snake([center_ish,center_ish+1,center_ish+2,center_ish+3,center_ish+4]); // default snake
    snek.update()
    snek.detection();
    document.body.addEventListener("keydown", evt => {
        if(running==false){
            setInterval(() => {
                snek.move(snek.current_direction);
                snek.update();
            }, game_speed);
            running = true 
        }
    })
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
                push = this.chunks[this.chunks.length-1]-rows
                if(push < 0){push += cols*rows}
                this.chunks.push(push);
                break;
            case "down":
                push = this.chunks[this.chunks.length-1]+rows
                if(push > cols*rows){push -= cols*rows}
                this.chunks.push(push);
                break;
            case "left":
                push = this.chunks[this.chunks.length-1]
                if(push%cols == 0){
                    push += cols
                }
                this.chunks.push(push-1);
                break;
            case "right":
                push = this.chunks[this.chunks.length-1]
                if((push+1)%cols == 0){
                    push -= cols
                }
                this.chunks.push(push+1);
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