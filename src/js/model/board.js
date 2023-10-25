import { Space } from "./space.js";


export class Board  {
//in tests this needs to be set to before all
//create avatars
//has set up 
//start with just 20
    #Avatars = [];

    show() {
            let total = 20
            let array = []

            
            for (let i = 2; i >= 1; i--) {
                let row = []
                for (let j = 1; j<=10; j++) {
                    row.push(new Space)
                }
                row = (i%2==0) ? row : row.reverse()
                array.push(row);
            }
            console.log(array)
    }

    get avatars() {
        return this.#Avatars
    }
}

const board = new Board();
board.show();