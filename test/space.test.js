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

import { Space, SpaceType } from "../src/js/model/space.js";
import { Avatar } from "../src/js/model/avatar.js";

describe("#land(avatar)", () => {
  test("test space", () => {
    const start_1 = new Space(1, SpaceType.START);
    const normal_2 = new Space(2, SpaceType.NORMAL);
    const normal_3 = new Space(3, SpaceType.NORMAL);
    const ladder_4 = new Space(4, SpaceType.LADDER);
    const chute_5 = new Space(5, SpaceType.CHUTE);
    const normal_6 = new Space(6, SpaceType.NORMAL);
    const finish_7 = new Space(7, SpaceType.FINISH);

    start_1.next = normal_2;
    normal_2.next = normal_3;
    normal_3.next = ladder_4;
    ladder_4.next = chute_5;
    ladder_4.special = normal_6;
    chute_5.next = normal_6;
    chute_5.special = normal_2;
    normal_6.next = finish_7;
    finish_7.next = null;

    finish_7.back = normal_6;
    normal_6.back = chute_5;
    chute_5.back = ladder_4;
    ladder_4.back = normal_3;
    normal_3.back = normal_2;
    normal_2.back = start_1;
    start_1.back = null;

    const Heather = new Avatar("red");
    const Jane = new Avatar("blue");

    start_1.land(Heather);
    expect(Heather.location.value).toEqual(1);

    start_1.land(Jane);
    expect(Jane.location.value).toEqual(1);

    Jane.move(1);
    expect(Jane.location.value).toEqual(2);

    Heather.move(1);
    expect(Heather.location.value).toEqual(2);
    expect(Jane.location.value).toEqual(3);

    Jane.move(1);
    expect(Jane.location.value).toEqual(6);

    Heather.move(3);
    expect(Heather.location.value).toEqual(2);
    expect(Jane.location.value).toEqual(6);

    Jane.move(-3);
    expect(Jane.location.value).toEqual(3);

    Heather.move(-10);
    expect(Heather.location.value).toEqual(1);

    Heather.move(100);
    expect(Heather.location.value).toEqual(7);
  });
});
