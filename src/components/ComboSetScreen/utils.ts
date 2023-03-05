export const audioLengthInMiliseconds = 1000;

export const comboOptions = [
  {
    value: 1,
    audio: new Audio("/audio/1.mp3"),
  },
  {
    value: 2,
    audio: new Audio("/audio/2.mp3"),
  },
  {
    value: 3,
    audio: new Audio("/audio/3.mp3"),
  },
  {
    value: 4,
    audio: new Audio("/audio/4.mp3"),
  },
  {
    value: 5,
    audio: new Audio("/audio/5.mp3"),
  },
  {
    value: 6,
    audio: new Audio("/audio/6.mp3"),
  },
  {
    value: 7,
    audio: new Audio("/audio/7.mp3"),
  },
  {
    value: 8,
    audio: new Audio("/audio/8.mp3"),
  },
];

export const generateRandomIntegers = (count: number): number[] => {
  const result: number[] = [];
  const generatedNumbers: Set<number> = new Set();

  while (result.length < count) {
    const randomInteger = Math.floor(Math.random() * 8) + 1;

    if (!generatedNumbers.has(randomInteger)) {
      result.push(randomInteger);
      generatedNumbers.add(randomInteger);
    }
  }

  return result;
};

export const handlePlayAudio = (foundCombo: any) => {
  return new Promise((resolve, reject) => {
    foundCombo?.audio.play();
    setTimeout(() => {
      console.log(`Audio ${foundCombo?.value} has played`);
      resolve(`Audio ${foundCombo?.value} has played`);
    }, audioLengthInMiliseconds);
  });
};

export const handleChainOfComboAudioPromises = (
  randomCombo: number[],
  callbackFunction: () => void
) => {
  let promiseChain = Promise.resolve();
  for (let i = 0; i < randomCombo.length; i++) {
    const foundCombo = comboOptions.find((c) => c.value === randomCombo[i]);
    promiseChain = promiseChain
      .then(() => {
        return handlePlayAudio(foundCombo);
      })
      .then(() => {
        if (i === randomCombo.length - 1) {
          // end combo
          callbackFunction();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return promiseChain
    .then((result) => {})
    .catch((error) => {
      console.error(error);
    });
};
