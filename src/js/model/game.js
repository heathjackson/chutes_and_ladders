import { SpaceType, Space } from "./space.js";
import { randomNumber } from "./utils.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { Avatar, Color } from "./avatar.js";
import { Die } from "./die.js";

//reset function - register player - reset players - set up game

export class Game {
  MAX_PLAYERS = 4;
  MIN_PLAYERS = 1;
  TOTAL = 100;
  SPAN = 40;
  COLUMNS = 10;
  special_array = [];
  unique_values = [];
  registered_players = [];

  constructor(ladders, chutes) {
    this.ladders = ladders;
    this.chutes = chutes;
    this.board = new Board(this.special_array, this.TOTAL, this.spaceMaker);
    this.dice = new Die(6);
  }

  playersLessThanMax = () => {
    return this.registered_players.length < this.MAX_PLAYERS;
  };

  playersGreaterThanMin = () => {
    return this.registered_players.length > this.MIN_PLAYERS;
  };

  colorNotChosen = (color) => {
    let colorNotChosen = true;
    for (let i = 0; i < this.registered_players.length; i++) {
      if (this.registered_players[i].avatar.color === color) {
        colorNotChosen = false;
      }
    }
    return colorNotChosen;
  };

  printColorOptions = () => {
    const colorOptions = Object.keys(new Color().constructor);
    colorOptions.map((col) => {
      console.log(col);
    });
  };

  registerPlayer = (playerName, color) => {
    if (this.playersLessThanMax() && this.colorNotChosen(color)) {
      this.registered_players.push(
        new Player(
          playerName,
          this.registered_players.length,
          new Avatar(color)
        )
      );
    } else if (!this.playersLessThanMax()) {
      console.log(`${playerName}, a max of four players are allowed`);
    } else {
      console.log(`${playerName}, please choose a color not already taken`);
    }
  };

  spaceMaker = (startValue, type) => {
    return new Space(startValue, type);
  };

  verifyUniqueValue = (array, value) => {
    return array.indexOf(value) === -1;
  };

  verifySpan = (startSpace, endSpace) => {
    return Math.abs(startSpace - endSpace) < this.SPAN;
  };

  endMin = (type, start) => {
    return type === SpaceType.LADDER ? start + this.COLUMNS : 2;
  };

  endMax = (type, start) => {
    return type === SpaceType.LADDER ? this.TOTAL - 1 : start - this.COLUMNS;
  };

  createSpecialSpaces = (startMin, startMax, type, total) => {
    let i = 0;
    while (i < total) {
      const specialStart = randomNumber(startMin, startMax);
      const endMin = this.endMin(type, specialStart);
      const endMax = this.endMax(type, specialStart);
      const specialEnd = randomNumber(endMin, endMax);

      if (
        this.verifySpan(specialStart, specialEnd) &&
        this.verifyUniqueValue(this.unique_values, specialStart) &&
        this.verifyUniqueValue(this.unique_values, specialEnd)
      ) {
        const specialS = this.spaceMaker(specialStart, type);
        const specialE = this.spaceMaker(specialEnd, SpaceType.NORMAL);
        specialS.special = specialE;
        this.special_array.push(specialS, specialE);
        this.unique_values.push(specialStart, specialEnd);
        i++;
      } else {
        continue;
      }
    }
  };

  createChutesAndLadders = () => {
    this.createSpecialSpaces(
      2,
      this.TOTAL - this.COLUMNS,
      SpaceType.LADDER,
      this.ladders
    );

    this.createSpecialSpaces(
      this.COLUMNS + 1,
      this.TOTAL - 1,
      SpaceType.CHUTE,
      this.chutes
    );
  };

  // game_validator = () => {
  //   return (this.)
  // }

  startGame = () => {
    this.createChutesAndLadders();
    this.registered_players.map((reg) => {
      reg.avatar.location = SpaceType.START;
    });
  };
}

const game = new Game(5, 5);
game.registerPlayer("Heather", Color.BLUE);
game.registerPlayer("Matt", Color.BROWN);
game.registerPlayer("Ace", Color.RED);
game.registerPlayer("Bob", Color.GREEN);
game.registerPlayer("Sarah", Color.YELLOW);
game.startGame();

console.log(game.registered_players[0].avatar.location);
console.log(game.registered_players[1].avatar.location);
console.log(game.registered_players[4].avatar.location);
