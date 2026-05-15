export const SCENARIOS = [
  {
    id: 'weather',
    context: 'The weather today is',
    baseLogits: [
      { word: 'sunny', logit: 8.5 },
      { word: 'cold', logit: 6.2 },
      { word: 'raining', logit: 5.8 },
      { word: 'perfect', logit: 7.1 },
      { word: 'unpredictable', logit: 4.5 },
      { word: 'beautiful', logit: 6.9 },
      { word: 'cloudy', logit: 6.0 },
      { word: 'hot', logit: 5.5 },
      { word: 'terrible', logit: 3.2 },
      { word: 'banana', logit: -5.0 }, // nonsense word to show filtering
    ]
  },
  {
    id: 'ai',
    context: 'Artificial Intelligence will help',
    baseLogits: [
      { word: 'humans', logit: 9.0 },
      { word: 'everyone', logit: 7.5 },
      { word: 'solve', logit: 8.2 },
      { word: 'create', logit: 7.8 },
      { word: 'automate', logit: 8.5 },
      { word: 'destroy', logit: 2.1 }, // controversial/rare
      { word: 'improve', logit: 8.8 },
      { word: 'change', logit: 8.3 },
      { word: 'replace', logit: 4.5 },
      { word: 'spaghetti', logit: -8.0 },
    ]
  },
  {
    id: 'story',
    context: 'Once upon a',
    baseLogits: [
      { word: 'time', logit: 10.0 }, // Very high probability
      { word: 'hill', logit: 4.2 },
      { word: 'distant', logit: 3.8 },
      { word: 'star', logit: 3.5 },
      { word: 'stormy', logit: 4.0 },
      { word: 'midnight', logit: 3.2 },
      { word: 'king', logit: 2.8 },
      { word: 'secret', logit: 2.5 },
      { word: 'forgotten', logit: 2.2 },
      { word: 'toaster', logit: -4.0 },
    ]
  }
];
