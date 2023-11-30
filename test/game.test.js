// Copyright 2023 YOUR NAME HERE
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Game } from "../src/js/model/game";
import { Color } from "../src/js/model/avatar";
describe("#registerPlayer - make sure creates a new player and adds them to the array in the correct order", () => {
  const game = new Game(10, 10);
  game.registerPlayer("Heather", Color.RED);
  game.registerPlayer("Carly", Color.BLUE);
  test("registerPlayer order and array", () => {
    expect(game.registered_players.length).toEqual(2);
    expect(game.registered_players[0].order).toEqual(0);
    expect(game.registered_players[0].name).toEqual("Heather");
    expect(game.registered_players[0].avatar.color).toEqual(Color.RED);
    expect(game.registered_players[1].order).toEqual(1);
    expect(game.registered_players[1].name).toEqual("Carly");
    expect(game.registered_players[1].avatar.color).toEqual(Color.BLUE);
  });
});
