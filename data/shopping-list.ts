export type ShoppingGroup =
  | 'Fruit & vegetables'
  | 'Fridge'
  | 'Freezer'
  | 'Cupboard'
  | 'Training supplies';
export type ItemStatus = 'check' | 'need' | 'have' | 'bought';

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: string;
  group: ShoppingGroup;
  checkFirst?: boolean;
  note?: string;
};

export const shoppingGroups: ShoppingGroup[] = [
  'Fruit & vegetables',
  'Fridge',
  'Freezer',
  'Cupboard',
  'Training supplies'
];

export const shoppingItems: ShoppingItem[] = [
  {
    id: 'bananas',
    name: 'Bananas',
    quantity: '5',
    group: 'Fruit & vegetables'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    quantity: '1',
    group: 'Fruit & vegetables',
    note: 'Half for the tuna pasta salad; use the rest in sandwiches or as a side.'
  },
  {
    id: 'yogurt',
    name: '0% Greek yogurt',
    quantity: '4 × 500 g tubs',
    group: 'Fridge',
    note: 'Enough for a 250 g breakfast and a 250 g snack each day. Choose your usual high-protein tub; check the label if substituting.'
  },
  {
    id: 'milk',
    name: 'Semi-skimmed milk',
    quantity: '4 pints',
    group: 'Fridge',
    note: 'Add more if making several milk-based shakes.'
  },
  {
    id: 'chicken',
    name: 'Chicken breast',
    quantity: '1 kg',
    group: 'Fridge',
    note: 'Four portions for chicken rice bowls or sandwiches.'
  },
  {
    id: 'mince',
    name: 'Turkey mince',
    quantity: '500 g',
    group: 'Fridge',
    note: 'For two portions of chilli. Beef mince is an alternative.'
  },
  {
    id: 'berries',
    name: 'Frozen berries / summer fruits',
    quantity: '2 × 500 g bags',
    group: 'Freezer'
  },
  {
    id: 'vegetables',
    name: 'Frozen mixed vegetables',
    quantity: '2 × 1 kg bags',
    group: 'Freezer'
  },
  {
    id: 'onions',
    name: 'Frozen diced onions',
    quantity: '500 g',
    group: 'Freezer'
  },
  {
    id: 'tuna',
    name: 'Tuna',
    quantity: '4 tins',
    group: 'Cupboard',
    note: 'Two tins for the pasta salad; keep two for extra meals.'
  },
  {
    id: 'sweetcorn',
    name: 'Tinned sweetcorn',
    quantity: '1 small tin (about 200 g)',
    group: 'Cupboard',
    note: 'For the tuna pasta salad.'
  },
  {
    id: 'tomatoes',
    name: 'Chopped tomatoes',
    quantity: '2 tins',
    group: 'Cupboard'
  },
  {
    id: 'kidney-beans',
    name: 'Kidney beans',
    quantity: '1 tin',
    group: 'Cupboard'
  },
  {
    id: 'oats',
    name: 'Porridge oats',
    quantity: '1 kg bag',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'honey',
    name: 'Honey',
    quantity: '1 bottle',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'pumpkin-seeds',
    name: 'Pumpkin seeds',
    quantity: '250 g bag',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'rice',
    name: 'Basmati rice',
    quantity: '1 kg dry',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'pasta',
    name: 'Pasta',
    quantity: '500 g',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'bread',
    name: 'Bread',
    quantity: '1 loaf',
    group: 'Cupboard',
    checkFirst: true,
    note: 'For toast and sandwiches; check the freezer too.'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    quantity: '6',
    group: 'Fridge',
    checkFirst: true
  },
  {
    id: 'cheddar',
    name: 'Cheddar',
    quantity: '1 small block',
    group: 'Fridge',
    checkFirst: true
  },
  {
    id: 'peanut-butter',
    name: 'Peanut butter',
    quantity: '1 jar',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'jam',
    name: 'Jam',
    quantity: '1 jar',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'butter',
    name: 'Butter',
    quantity: '1 pack',
    group: 'Fridge',
    checkFirst: true
  },
  {
    id: 'mayonnaise',
    name: 'Mayonnaise',
    quantity: '1 bottle / jar',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'granola',
    name: 'Granola',
    quantity: '1 bag',
    group: 'Cupboard',
    checkFirst: true,
    note: 'Optional breakfast topping.'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    quantity: 'Your usual pack',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'diluting-juice',
    name: 'Diluting juice',
    quantity: '1 bottle',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'beans-sausages',
    name: 'Baked beans & sausages',
    quantity: '1 tin',
    group: 'Cupboard',
    checkFirst: true,
    note: 'Quick backup meal.'
  },
  {
    id: 'noodle-pots',
    name: 'Noodle pots',
    quantity: '2 pots',
    group: 'Cupboard',
    checkFirst: true,
    note: 'Add chicken for a more substantial meal.'
  },
  {
    id: 'rice-pouches',
    name: 'Microwave rice',
    quantity: '2 pouches',
    group: 'Cupboard',
    checkFirst: true,
    note: 'Keep for rushed days.'
  },
  {
    id: 'oil',
    name: 'Cooking oil',
    quantity: '1 bottle',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'seasoning',
    name: 'Chilli seasoning',
    quantity: '1 packet / jar',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'sauce',
    name: 'Soy or stir-fry sauce',
    quantity: '1 bottle / pouch',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'whey',
    name: 'Whey protein',
    quantity: 'Check supply',
    group: 'Training supplies',
    checkFirst: true,
    note: 'Restock from your usual supplier if needed.'
  },
  {
    id: 'maltodextrin',
    name: 'Maltodextrin',
    quantity: 'Check supply',
    group: 'Training supplies',
    checkFirst: true,
    note: 'For your homemade carb mix; usual supplier.'
  },
  {
    id: 'fructose',
    name: 'Fructose',
    quantity: 'Check supply',
    group: 'Training supplies',
    checkFirst: true,
    note: 'For your homemade carb mix; usual supplier.'
  },
  {
    id: 'salt',
    name: 'Salt',
    quantity: 'Check supply',
    group: 'Cupboard',
    checkFirst: true
  },
  {
    id: 'flavouring',
    name: 'Bolero / carb-mix flavouring',
    quantity: 'Check supply',
    group: 'Training supplies',
    checkFirst: true,
    note: 'Restock from your usual supplier if needed.'
  }
];

type MealIdea = {
  name: string;
  ingredients: string;
  recipe?: {
    servings: string;
    time: string;
    ingredients: string[];
    steps: string[];
  };
};

export const mealIdeas: MealIdea[] = [
  {
    name: 'Usual breakfast',
    ingredients:
      'Greek yogurt, oats, berries or banana, honey and pumpkin seeds.'
  },
  {
    name: 'Chicken rice bowls',
    ingredients:
      'Chicken, rice, frozen vegetables and your chosen sauce. Make tomorrow’s lunch alongside dinner.'
  },
  {
    name: 'Turkey & bean chilli',
    ingredients: 'A simple one-pan chilli with rice. Beef mince works too.',
    recipe: {
      servings: '2 portions',
      time: 'About 35 minutes',
      ingredients: [
        '500 g turkey mince',
        '150 g frozen diced onions',
        '1 × 400 g tin chopped tomatoes',
        '1 × 400 g tin kidney beans, drained and rinsed',
        'Chilli seasoning — the packet amount for 500 g mince',
        '1 tsp cooking oil',
        '100 ml water, plus a splash more if needed',
        '200 g dry basmati rice, to serve'
      ],
      steps: [
        'Heat the oil in a large saucepan over a medium heat. Add the frozen onions and cook for about 5 minutes, stirring, until softened.',
        'Add the mince. Break it up with a spoon and cook for 8–10 minutes, stirring regularly, until browned all over.',
        'Stir in the chilli seasoning, tomatoes, drained kidney beans and water. Bring to a gentle bubble, then simmer for 15–20 minutes. Stir occasionally and add a splash of water if it gets too thick. The mince should be cooked through and the chilli piping hot throughout.',
        'While the chilli simmers, cook the rice following the packet instructions. Divide the rice and chilli between two portions.'
      ]
    }
  },
  {
    name: 'Tuna pasta salad',
    ingredients:
      'Tuna, sweetcorn and cucumber with a quick yogurt-and-mayo dressing.',
    recipe: {
      servings: '2 portions',
      time: 'About 20 minutes',
      ingredients: [
        '200 g dry pasta',
        '2 tins tuna (about 100–120 g drained per tin), drained',
        '1 small tin sweetcorn (about 200 g), drained',
        '½ cucumber, diced',
        '2 tbsp mayonnaise',
        '2 tbsp Greek yogurt',
        'A small pinch of salt, if needed'
      ],
      steps: [
        'Cook the pasta following the packet instructions. Drain, rinse under cold running water until cool, then drain well again.',
        'While the pasta cooks, drain the tuna and sweetcorn and dice the cucumber.',
        'Mix the mayonnaise and yogurt in a large bowl. Flake in the tuna, then add the sweetcorn and cucumber.',
        'Fold in the cooled pasta until everything is coated. Taste, add a little salt only if needed, and divide into two portions.'
      ]
    }
  }
];
