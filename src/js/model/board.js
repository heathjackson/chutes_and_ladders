

export class Board  {

    #Avatars = [];

    show() {
            let total = 100;
            for (let i = 10; i >= 1; i--) {
                let row = []
                for (let j = 1; j<=10; j++) {
                    row.push(total--);
                }
                row = (i%2==0) ? row : row.reverse()
                console.log(row);
            }
    }

    get avatars() {
        return this.#Avatars
    }
}

const board = new Board();
board.show();