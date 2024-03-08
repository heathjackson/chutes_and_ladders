import { SpaceType, Space } from "./space.js";
import { randomNumber } from "./utils.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { Avatar, Color } from "./avatar.js";
import { Die } from "./die.js";

class Game {
  MAX_PLAYERS = 4;
  MIN_PLAYERS = 2;
  TOTAL = 100;
  SPAN = 40;
  COLUMNS = 10;
  availableAvatars = [Color.GREEN, Color.BLUE, Color.PURPLE, Color.RED];
  specialSpaces = [];
  uniqueValues = [];
  registeredPlayers = [];
  board;
  dice;

  constructor(ladders, chutes) {
    this.ladders = ladders;
    this.chutes = chutes;
    this.initializeGame();
  }

  initializeGame() {
    this.createChutesAndLadders();
    this.board = new Board(this.specialSpaces, this.TOTAL, this.createSpace);
    this.dice = new Die(6);
  }

  chooseColor(color) {
    this.availableAvatars = this.availableAvatars.filter(
      (col) => col !== color
    );
  }

  createSpace(startValue, type) {
    return new Space(startValue, type);
  }

  isUniqueValue(array, value) {
    return array.indexOf(value) === -1;
  }

  isWithinSpan(startSpace, endSpace) {
    return Math.abs(startSpace - endSpace) < this.SPAN;
  }

  calculateEnd(type, start) {
    return type === SpaceType.LADDER
      ? start + this.COLUMNS
      : start - this.COLUMNS;
  }

  createSpecialSpaces(startMin, startMax, type, total) {
    let i = 0;
    while (i < total) {
      const specialStart = randomNumber(startMin, startMax);
      const endMin = this.calculateEnd(type, specialStart);
      const endMax = this.calculateEnd(type, specialStart);
      const specialEnd = randomNumber(endMin, endMax);

      if (
        this.isWithinSpan(specialStart, specialEnd) &&
        this.isUniqueValue(this.uniqueValues, specialStart) &&
        this.isUniqueValue(this.uniqueValues, specialEnd)
      ) {
        const specialS = this.createSpace(specialStart, type);
        const specialE = this.createSpace(specialEnd, SpaceType.NORMAL);
        specialS.special = specialE;
        this.specialSpaces.push(specialS, specialE);
        this.uniqueValues.push(specialStart, specialEnd);
        i++;
      }
    }
  }

  createChutesAndLadders() {
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
  }

  registerPlayer(playerName, color) {
    if (this.registeredPlayers.length < this.MAX_PLAYERS) {
      const player = new Player(
        playerName,
        this.registeredPlayers.length,
        new Avatar(color)
      );
      this.registeredPlayers.push(player);
      this.chooseColor(color);
    } else {
      console.log(`${playerName}, a max of four players are allowed`);
    }
  }

  setUpGame() {
    if (this.registeredPlayers.length >= this.MIN_PLAYERS) {
      this.registeredPlayers.forEach((player) => {
        this.board.start.land(player.avatar);
        player.avatar.winner = false;
      });
    } else {
      console.log("You need more players");
    }
  }

  resetGame() {
    this.specialSpaces = [];
    this.uniqueValues = [];
    this.createChutesAndLadders();
    this.board = new Board(this.specialSpaces, this.TOTAL, this.createSpace);
    this.switchTurns();
    this.setUpGame();
  }

  rollDice() {
    return this.dice.roll();
  }

  switchTurns() {
    this.registeredPlayers.push(this.registeredPlayers.shift());
  }

  playTurn(roll) {
    const player = this.registeredPlayers[0];
    player.avatar.move(roll);
    if (this.checkForWinner(player)) {
      this.resetGame();
    } else {
      this.switchTurns();
    }
  }

  checkForWinner(player) {
    return player.avatar.winner;
  }
}

export { Game };
