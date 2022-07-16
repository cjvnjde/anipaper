export type RandomInRange = {
  next: () => { value: number; done: boolean }
}

export function createRandomInRange(min: number, max: number): RandomInRange {
  const buffer: number[] = [];

  return {
    next: () => {
      let isUniqueRandom: boolean;
      let randomNumber: number;
      do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        isUniqueRandom = buffer.includes(randomNumber);
        if (!isUniqueRandom) {
          buffer.push(randomNumber);
        }
      } while (isUniqueRandom);

      return {
        value: randomNumber,
        done: buffer.length - 1 >= max,
      };
    },
  };
}