import { Die } from "../src/js/model/die.js";

describe("Test die class", () => {
  test("Test die class", () => {
    const d6 = new Die(6);
    for (let i = 0; i < 100; i++) {
      let rollValue = d6.roll();
      expect(rollValue).toBeGreaterThanOrEqual(1);
      expect(rollValue).toBeLessThanOrEqual(d6.sides);
    }
  });
});

test("will not create die with less than 4 sides", () => {
  expect(() => new Die(3)).toThrow("sides must be greater than or equal to 4");
});

test("Test the sum of rolling a 6-sided die 20 times lies between 20 and 120", () => {
  const d = new Die(6);
  const s = d.sumOfRolls(20);
  expect(s).toBeGreaterThanOrEqual(20);
  expect(s).toBeLessThanOrEqual(120);
});

test("Test summing the rolls of different dice, so the total sum lies between the min and max possible", () => {
  const d6 = new Die(6);
  const d4 = new Die(4);
  const s_1 = d6.sumOfRolls(20);
  const s_2 = d4.sumOfRolls(20);

  expect(s_1 + s_2).toBeGreaterThanOrEqual(40);
  expect(s_1 + s_2).toBeLessThanOrEqual(200);
});
