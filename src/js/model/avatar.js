import "./space.js";
import { SpaceType } from "./space.js";

// Add avatar implementations here
export class Color {
    static UNDEFINED = 0;
    static RED = 1;
    static BLACK = 2;
    static BROWN = 3;
    static BLUE = 4;
    static GREEN = 5;
    static PURPLE = 6;
    static WHITE = 7;
    static YELLOW = 8;
    static ORANGE = 9;
    static PINK = 10;
}

export class Avatar {
    #Location = null;
    #Name = "";
    #Color = Color.UNDEFINED;


    /**
     *
     * @param name the name of the avatar example: Car, Top Hat, Black Cat, etc
     * @param color the color of the avatar
     */
    constructor(name, color) {
        this.#Name = name;
        this.#Color = color;
    }

    get name() {
        return this.#Name
    }

    get location() {
        return this.#Location
    }

    get color() {
        return this.#Color;
    }

    set location(space) {
        this.#Location = space
    }

    move(numberOfSpaces) {
        let location = this.#Location

        if(numberOfSpaces > 0) {
            for(let i = 0; i < numberOfSpaces; i++){
                if(location.type === SpaceType.FINISH){
                    return location.land(this)

                }else{
                    location = location.next
                }
            }

        }else{
            for(let i = 0; i > numberOfSpaces; i--){
                if(location.type === SpaceType.START){
                    return location.land(this)
                }else{
                    location = location.back
                }
            }
        }

        return location.land(this)

         // TODO - Implement how an Avatar can move between spaces given that it knows it's own location
    }   
}