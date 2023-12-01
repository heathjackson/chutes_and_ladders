import { SpaceType, Space } from "./space.js";
import { randomNumber } from "./utils.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { Avatar, Color } from "./avatar.js";
import { Die } from "./die.js";

//reset function - register player - reset players - set up game

export class Game {
  MAX_PLAYERS = 4;
  MIN_PLAYERS = 2;
  TOTAL = 100;
  SPAN = 40;
  COLUMNS = 10;
  available_avatars = [Color.GREEN, Color.BLUE, Color.PURPLE, Color.RED];
  special_array = [];
  unique_values = [];
  registered_players = [];

  constructor(ladders, chutes) {
    this.ladders = ladders;
    this.chutes = chutes;
    this.createChutesAndLadders();
    this.board = new Board(this.special_array, this.TOTAL, this.spaceMaker);
    this.dice = new Die(6);
  }

  chooseColor = (color) => {
    this.available_avatars = this.available_avatars.filter(
      (col) => col !== color
    );
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

  registerPlayer = (playerName, color) => {
    this.registered_players.length <= this.MAX_PLAYERS
      ? (this.registered_players.push(
          new Player(
            playerName,
            this.registered_players.length,
            new Avatar(color)
          )
        ),
        this.chooseColor(color))
      : console.log(`${playerName}, a max of four players are allowed`);
  };

  setUpGame = () => {
    this.registered_players.length >= this.MIN_PLAYERS
      ? this.registered_players.map((reg) => {
          this.board.start.land(reg.avatar);
        })
      : console.log("you need more players");
  };

  rollDice = () => {
    return this.dice.roll();
  };

  switchTurns = () => {
    this.registered_players.push(this.registered_players.shift());
  };

  playTurn = () => {
    let roll = this.rollDice();
    this.registered_players[0].avatar.move(roll);
    this.switchTurns();
  };

  checkForWinner = () => {
    this.registered_players.forEach((player) => {
      player.avatar.winner === true;
    });
  };

  playGame = () => {};
}

let game = new Game(5, 5);
game.registerPlayer("Heather", Color.BLUE);
game.registerPlayer("Matt", Color.PURPLE);
game.registerPlayer("Ace", Color.RED);
game.setUpGame();
game.board.print();
game.playTurn();
game.checkForWinner();

// console.log(game.registered_players[0].avatar.location.value);
// console.log(game.registered_players[1].avatar.location.value);
// console.log(game.registered_players[2].avatar.location.value);
// console.log(game.available_avatars);
