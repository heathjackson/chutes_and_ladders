
// The rules file contains rules and validation functions for the game.
import { LinkedSpace, SpaceType } from "./model";
/**
 * 
 * @param {LinkedSpace} space the space to validate
 * @returns true if valid, false otherwise
 */
const FirstSpaceValidator = (space) => {
    return space != undefined && space.type == SpaceType.START && space.next != undefined
}
const LastSpaceValidator = (space) => {
  return space != undefined && space.type == SpaceType.FINISH && space.back != undefined
}

export default {LastSpaceValidator, FirstSpaceValidator}

