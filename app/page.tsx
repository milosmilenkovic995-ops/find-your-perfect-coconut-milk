'use client';

import { useMemo, useState } from 'react';

type Answer = {
  id: string;
  title: string;
  desc: string;
  icon: string;
};

type Question = {
  id: string;
  title: string;
  answers: Answer[];
};

type ProductSize = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  badges: string[];
  url: string;
};

type Recipe = {
  id: string;
  title: string;
  imageType: 'drink' | 'cooking' | 'dessert' | 'bowl';
  time: string;
  intro: string;
  ingredients: string[];
  steps: string[];
};

const productSizes: ProductSize[] = [
  {
    id: 'coconutMilkPowder1lb',
    name: 'Organic Coconut Milk Powder – 1 lb',
    subtitle: 'Perfect for everyday pantry use',
    description:
      'A creamy, versatile pantry staple that works beautifully in smoothies, oats, sauces, desserts, and everyday recipes.',
    image: '/images/coconut-milk-1lb.png',
    badges: ['1 lb Size', 'Everyday Use', 'Pantry-Friendly'],
    url: 'https://www.znaturalfoods.com/products/coconut-milk-powder-organic',
  },
  {
    id: 'coconutMilkPowderBulk',
    name: 'Organic Coconut Milk Powder – 33 lb',
    subtitle: 'Great for bulk purchasing and larger prep needs',
    description:
      'The same core product in a larger format for heavier use, larger prep needs, or bulk-style purchasing.',
    image: '/images/coconut-milk-33lb.png',
    badges: ['33 lb Size', 'Larger Format', 'Same Core Product'],
    url: 'https://www.znaturalfoods.com/products/coconut-milk-powder-organic',
  },
];

const recipeSets: Record<string, Recipe[]> = {
  drinks_quick: [
    {
      id: 'quick-coconut-berry-smoothie',
      title: 'Quick Coconut Berry Smoothie',
      imageType: 'drink',
      time: '4 min',
      intro: 'Fastest option — quick, creamy, and easy to blend.',
      ingredients: [
        '1 cup cold water or milk',
        '2 tbsp **Organic Coconut Milk Powder**',
        '1 cup mixed berries',
        '1/2 banana',
        'A few ice cubes',
      ],
      steps: [
        'Add the cold water or milk to a blender first, then add the berries, banana, and ice so everything blends more evenly.',
        'Add 2 tablespoons of **Organic Coconut Milk Powder** and blend for about 30 to 45 seconds, until the texture looks smooth and creamy.',
        'Taste and adjust if needed. Add a splash more liquid for a thinner smoothie, then pour into a glass and serve right away.',
      ],
    },
    {
      id: 'iced-coconut-matcha',
      title: 'Iced Coconut Matcha',
      imageType: 'drink',
      time: '8 min',
      intro: 'A little more involved, with a smoother café-style feel.',
      ingredients: [
        '1 cup cold water or milk',
        '2 tbsp **Organic Coconut Milk Powder**',
        '1 tsp matcha',
        'Ice',
        'Optional sweetener',
      ],
      steps: [
        'Whisk the matcha with a small amount of liquid until smooth so it blends cleanly without clumps.',
        'In a separate glass, mix the remaining liquid with **Organic Coconut Milk Powder** until creamy.',
        'Add ice, pour the matcha mixture over the coconut base, and stir gently before serving.',
      ],
    },
    {
      id: 'frozen-coconut-frappe',
      title: 'Frozen Coconut Frappé',
      imageType: 'drink',
      time: '12 min',
      intro: 'The most involved drink recipe, but still easy to make at home.',
      ingredients: [
        '1 cup cold brew or milk',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Ice',
        '1 frozen banana',
        'Optional cocoa or sweetener',
      ],
      steps: [
        'Add the liquid, frozen banana, and ice to a blender as the base for the frappé texture.',
        'Blend in **Organic Coconut Milk Powder** until the mixture becomes thick, creamy, and evenly combined.',
        'Taste, adjust sweetness if desired, then pour into a chilled glass and serve immediately.',
      ],
    },
  ],
  drinks_daily: [
    {
      id: 'coconut-coffee-cooler',
      title: 'Coconut Coffee Cooler',
      imageType: 'drink',
      time: '4 min',
      intro: 'Fastest option — simple and easy for a daily routine.',
      ingredients: [
        'Cold coffee',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Ice',
        'Optional sweetener',
      ],
      steps: [
        'Fill a glass with cold coffee and ice.',
        'Stir or shake in **Organic Coconut Milk Powder** until the texture looks lightly creamy and even.',
        'Sweeten if desired and serve immediately.',
      ],
    },
    {
      id: 'coconut-protein-shake',
      title: 'Coconut Protein Shake',
      imageType: 'drink',
      time: '7 min',
      intro: 'A more filling option for a busier day.',
      ingredients: [
        '1 cup milk of choice',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Protein powder',
        'Ice',
        '1/2 banana',
      ],
      steps: [
        'Add the milk, banana, and ice to a blender first.',
        'Add the protein powder and **Organic Coconut Milk Powder**, then blend until smooth and evenly creamy.',
        'Pour into a glass and serve right away.',
      ],
    },
    {
      id: 'blended-coconut-breakfast-drink',
      title: 'Blended Coconut Breakfast Drink',
      imageType: 'drink',
      time: '11 min',
      intro: 'The most involved drink set here, but still very practical.',
      ingredients: [
        '1 cup milk of choice',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Rolled oats',
        'Frozen fruit',
        'Ice',
      ],
      steps: [
        'Blend the milk, oats, and frozen fruit first so the base starts to smooth out.',
        'Add **Organic Coconut Milk Powder** and blend again until creamy and fully combined.',
        'Let it sit for a minute if needed, then blend once more briefly and serve cold.',
      ],
    },
  ],
  cooking_light: [
    {
      id: 'creamy-coconut-rice',
      title: 'Creamy Coconut Rice',
      imageType: 'cooking',
      time: '20 min',
      intro: 'Fastest cooking option — comforting and easy to prepare.',
      ingredients: [
        '1 cup rice',
        '2 tbsp **Organic Coconut Milk Powder**',
        '2 cups water',
        'Pinch of salt',
        'Optional fresh herbs for serving',
      ],
      steps: [
        'Rinse the rice, then add it to a pot with the water and a pinch of salt. Bring it to a gentle boil over medium heat.',
        'Whisk a small amount of hot cooking liquid with **Organic Coconut Milk Powder** until smooth, then return it to the pot.',
        'Cover and cook until the rice is tender and fluffy, then rest for a few minutes before serving.',
      ],
    },
    {
      id: 'creamy-coconut-soup-base',
      title: 'Creamy Coconut Soup Base',
      imageType: 'cooking',
      time: '24 min',
      intro: 'A more involved savory option with extra depth and warmth.',
      ingredients: [
        '3 cups broth',
        '3 tbsp **Organic Coconut Milk Powder**',
        'Vegetables of choice',
        'Garlic or ginger',
        'Salt and pepper',
      ],
      steps: [
        'Start by sautéing the garlic, ginger, or aromatics briefly to build flavor at the base of the soup.',
        'Add broth and vegetables, then simmer until the vegetables are tender but not overcooked.',
        'Whisk **Organic Coconut Milk Powder** with a little hot broth separately, then stir it into the soup and simmer gently before serving.',
      ],
    },
    {
      id: 'creamy-coconut-curry-bowl',
      title: 'Creamy Coconut Curry Bowl',
      imageType: 'cooking',
      time: '30 min',
      intro: 'The most involved savory recipe here, with the richest finished result.',
      ingredients: [
        'Vegetables or protein of choice',
        '1 1/2 cups water',
        '3 tbsp **Organic Coconut Milk Powder**',
        'Curry seasoning',
        '1 tbsp oil',
      ],
      steps: [
        'Cook your vegetables or protein in a pan with a little oil until lightly browned and aromatic.',
        'In a separate bowl, whisk the water with **Organic Coconut Milk Powder** and curry seasoning until fully smooth.',
        'Pour the coconut curry mixture into the pan and let it simmer until slightly thickened and glossy, then serve over rice or grains.',
      ],
    },
  ],
  cooking_rich: [
    {
      id: 'creamy-coconut-pasta-sauce',
      title: 'Creamy Coconut Pasta Sauce',
      imageType: 'cooking',
      time: '18 min',
      intro: 'Fastest rich cooking option — creamy and easy for weeknights.',
      ingredients: [
        'Cooked pasta',
        '2 tbsp **Organic Coconut Milk Powder**',
        '1 cup warm water',
        'Garlic',
        'Seasoning of choice',
      ],
      steps: [
        'Cook the pasta and reserve a little warm pasta water before draining.',
        'Whisk **Organic Coconut Milk Powder** with the warm water until smooth, then add it to a pan with garlic and seasoning.',
        'Toss the pasta in the sauce until lightly coated and creamy, then serve warm.',
      ],
    },
    {
      id: 'creamy-coconut-vegetable-skillet',
      title: 'Creamy Coconut Vegetable Skillet',
      imageType: 'cooking',
      time: '24 min',
      intro: 'A more involved pan meal with a richer finish.',
      ingredients: [
        'Mixed vegetables',
        '3 tbsp **Organic Coconut Milk Powder**',
        '1 1/4 cups water',
        'Seasoning',
        '1 tbsp oil',
      ],
      steps: [
        'Cook the vegetables in a skillet with oil until they begin to soften and lightly brown.',
        'Whisk **Organic Coconut Milk Powder** with water and seasoning until smooth.',
        'Pour the coconut mixture into the skillet and cook gently until it thickens slightly and coats the vegetables.',
      ],
    },
    {
      id: 'creamy-coconut-bake',
      title: 'Creamy Coconut Bake',
      imageType: 'cooking',
      time: '32 min',
      intro: 'The most involved rich cooking recipe, great for a fuller meal.',
      ingredients: [
        'Cooked grains or vegetables',
        '3 tbsp **Organic Coconut Milk Powder**',
        '1 1/2 cups water',
        'Seasoning',
        'Optional topping',
      ],
      steps: [
        'Arrange your cooked base ingredients in a baking dish so everything is ready before adding the sauce.',
        'Whisk **Organic Coconut Milk Powder** with water and seasoning until smooth and creamy.',
        'Pour over the dish, add any topping, and bake until hot and lightly golden on top.',
      ],
    },
  ],
  desserts_fruit: [
    {
      id: 'coconut-chia-pudding',
      title: 'Coconut Chia Pudding',
      imageType: 'dessert',
      time: '10 min prep + chill time',
      intro: 'Fastest dessert option — simple to prep and chill.',
      ingredients: [
        '1 cup water',
        '3 tbsp **Organic Coconut Milk Powder**',
        '3 tbsp chia seeds',
        '1 to 2 tsp maple syrup if desired',
        'Fresh fruit for topping',
      ],
      steps: [
        'Whisk together the water and **Organic Coconut Milk Powder** until smooth and fully combined.',
        'Stir in the chia seeds and maple syrup, then let the mixture rest briefly before stirring again.',
        'Refrigerate until thickened, then finish with fruit and serve chilled.',
      ],
    },
    {
      id: 'coconut-mango-dessert-cup',
      title: 'Coconut Mango Dessert Cup',
      imageType: 'dessert',
      time: '14 min',
      intro: 'A layered dessert with a bit more assembly and texture.',
      ingredients: [
        '3 tbsp **Organic Coconut Milk Powder**',
        '1/2 cup water',
        'Fresh mango',
        'Crushed topping of choice',
        'Optional honey or maple syrup',
      ],
      steps: [
        'Whisk **Organic Coconut Milk Powder** with water until smooth and creamy, then sweeten lightly if desired.',
        'Dice the mango and prepare the topping so the dessert is ready to assemble cleanly.',
        'Layer the coconut mixture, mango, and topping in a glass or bowl, then chill briefly before serving.',
      ],
    },
    {
      id: 'coconut-fruit-parfait',
      title: 'Coconut Fruit Parfait',
      imageType: 'dessert',
      time: '20 min',
      intro: 'The most involved fruit dessert here, with more layering and texture.',
      ingredients: [
        '3 tbsp **Organic Coconut Milk Powder**',
        'Yogurt or soft base',
        'Fresh fruit',
        'Granola',
        'Optional sweetener',
      ],
      steps: [
        'Mix **Organic Coconut Milk Powder** into the yogurt or soft base until smooth and creamy.',
        'Prepare the fruit and granola so everything is ready for layering.',
        'Layer the coconut mixture, fruit, and granola in a glass, then chill briefly or serve right away.',
      ],
    },
  ],
  desserts_treats: [
    {
      id: 'coconut-mug-treat',
      title: 'Coconut Mug Treat',
      imageType: 'dessert',
      time: '6 min',
      intro: 'Fastest sweet option — quick and easy for a small treat.',
      ingredients: [
        '3 tbsp **Organic Coconut Milk Powder**',
        'Soft base or batter ingredients',
        'Sweetener',
        'Optional cocoa',
      ],
      steps: [
        'Mix the base ingredients and **Organic Coconut Milk Powder** in a mug or small bowl until smooth.',
        'Add a little cocoa or sweetener if desired and stir again.',
        'Heat or finish as desired, then serve warm.',
      ],
    },
    {
      id: 'no-bake-coconut-bars',
      title: 'No-Bake Coconut Bars',
      imageType: 'dessert',
      time: '22 min',
      intro: 'A more involved dessert recipe, but still easy enough for home prep.',
      ingredients: [
        'Oats or crushed base',
        '3 tbsp **Organic Coconut Milk Powder**',
        'Nut butter',
        'Sweetener',
        'Optional shredded coconut',
      ],
      steps: [
        'Combine the base ingredients, nut butter, sweetener, and **Organic Coconut Milk Powder** in a bowl until the texture comes together.',
        'Press the mixture evenly into a lined pan so the bars hold their shape once chilled.',
        'Chill until firm, then slice into bars and serve cold or slightly cool.',
      ],
    },
    {
      id: 'coconut-slice-squares',
      title: 'Coconut Slice Squares',
      imageType: 'dessert',
      time: '28 min',
      intro: 'The most involved sweet-treat recipe, with more prep and cleaner slices.',
      ingredients: [
        'Base ingredients of choice',
        '3 tbsp **Organic Coconut Milk Powder**',
        'Sweetener',
        'Optional topping',
      ],
      steps: [
        'Mix the base ingredients with **Organic Coconut Milk Powder** until the texture is even and easy to press.',
        'Spread the mixture into a lined pan and smooth the top carefully.',
        'Chill or bake as needed until set, then cool fully before slicing into squares.',
      ],
    },
  ],
  balanced_bowls: [
    {
      id: 'quick-coconut-oats',
      title: 'Quick Coconut Oats',
      imageType: 'bowl',
      time: '6 min',
      intro: 'Fastest balanced option — quick, warm, and easy.',
      ingredients: [
        'Oats',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Water or milk',
        'Fruit topping',
      ],
      steps: [
        'Cook the oats using your preferred method until nearly done.',
        'Stir in **Organic Coconut Milk Powder** near the end so the texture becomes creamy and smooth.',
        'Transfer to a bowl, top with fruit, and serve warm.',
      ],
    },
    {
      id: 'coconut-yogurt-bowl',
      title: 'Coconut Yogurt Bowl',
      imageType: 'bowl',
      time: '9 min',
      intro: 'A little more assembled, with a fresh and balanced feel.',
      ingredients: [
        'Yogurt of choice',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Fresh fruit',
        'Granola or seeds',
      ],
      steps: [
        'Mix **Organic Coconut Milk Powder** into the yogurt until the texture is evenly creamy.',
        'Spoon the mixture into a bowl and arrange the fruit over the top.',
        'Finish with granola or seeds for texture and serve immediately.',
      ],
    },
    {
      id: 'baked-coconut-breakfast-cups',
      title: 'Baked Coconut Breakfast Cups',
      imageType: 'bowl',
      time: '26 min',
      intro: 'The most involved balanced recipe, great for make-ahead prep.',
      ingredients: [
        'Oats',
        '3 tbsp **Organic Coconut Milk Powder**',
        'Egg or binder of choice',
        'Fruit',
        'Optional sweetener',
      ],
      steps: [
        'Mix the oats, binder, fruit, sweetener, and **Organic Coconut Milk Powder** in a bowl until evenly combined.',
        'Portion the mixture into a muffin tray or small baking cups so each portion bakes evenly.',
        'Bake until set and lightly golden, then cool slightly before serving.',
      ],
    },
  ],
  balanced_mealprep: [
    {
      id: 'coconut-overnight-oats',
      title: 'Coconut Overnight Oats',
      imageType: 'bowl',
      time: '7 min prep + chill time',
      intro: 'Fastest meal-prep option — easy to mix ahead.',
      ingredients: [
        'Oats',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Milk or water',
        'Fruit or seeds',
      ],
      steps: [
        'Stir the oats, liquid, and **Organic Coconut Milk Powder** together until smooth.',
        'Add fruit or seeds if desired and mix again.',
        'Cover and refrigerate until ready to eat.',
      ],
    },
    {
      id: 'coconut-prep-bowl',
      title: 'Coconut Prep Bowl',
      imageType: 'bowl',
      time: '12 min',
      intro: 'A more assembled option that still fits make-ahead routines.',
      ingredients: [
        'Cooked grains or oats',
        '2 tbsp **Organic Coconut Milk Powder**',
        'Fruit',
        'Seeds or granola',
      ],
      steps: [
        'Mix **Organic Coconut Milk Powder** into the base so it becomes evenly creamy.',
        'Portion into a bowl or storage container and top with fruit.',
        'Finish with seeds or granola and serve or chill for later.',
      ],
    },
    {
      id: 'coconut-batch-breakfast-bake',
      title: 'Coconut Batch Breakfast Bake',
      imageType: 'bowl',
      time: '30 min',
      intro: 'The most involved balanced prep recipe, great for multiple servings.',
      ingredients: [
        'Oats or grain base',
        '3 tbsp **Organic Coconut Milk Powder**',
        'Binder of choice',
        'Fruit',
        'Optional sweetener',
      ],
      steps: [
        'Combine the base ingredients, binder, fruit, and **Organic Coconut Milk Powder** until fully mixed.',
        'Transfer to a baking dish and spread evenly so it cooks consistently.',
        'Bake until set and lightly golden, then cool slightly before portioning.',
      ],
    },
  ],
};

const recipeImages = {
  drink: {
    'quick-coconut-berry-smoothie':
      'https://images.unsplash.com/photo-1553530666-ba11a90bb918?auto=format&fit=crop&w=1200&q=80',
    'iced-coconut-matcha':
      'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=1200&q=80',
    'frozen-coconut-frappe':
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
    'coconut-coffee-cooler':
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80',
    'coconut-protein-shake':
      'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1200&q=80',
    'blended-coconut-breakfast-drink':
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80',
  },
  cooking: {
    'creamy-coconut-rice':
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    'creamy-coconut-soup-base':
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    'creamy-coconut-curry-bowl':
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
    'creamy-coconut-pasta-sauce':
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
    'creamy-coconut-vegetable-skillet':
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    'creamy-coconut-bake':
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  },
  dessert: {
    'coconut-chia-pudding':
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    'coconut-mango-dessert-cup':
      'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=1200&q=80',
    'coconut-fruit-parfait':
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    'coconut-mug-treat':
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
    'no-bake-coconut-bars':
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80',
    'coconut-slice-squares':
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80',
  },
  bowl: {
    'quick-coconut-oats':
      'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=80',
    'coconut-yogurt-bowl':
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    'baked-coconut-breakfast-cups':
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    'coconut-overnight-oats':
      'https://plus.unsplash.com/premium_photo-1668615554420-d37c385d3a9d?auto=format&fit=crop&w=1200&q=80',
    'coconut-prep-bowl':
      'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=80',
    'coconut-batch-breakfast-bake':
      'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=80',
  },
};

const questions: Question[] = [
  {
    id: 'useCase',
    title: 'How do you most like to use coconut milk?',
    answers: [
      {
        id: 'smoothies',
        title: 'Smoothies & drinks',
        desc: 'A quick, creamy option for blending',
        icon: '🥤',
      },
      {
        id: 'cooking',
        title: 'Cooking & everyday recipes',
        desc: 'A pantry option for regular kitchen use',
        icon: '🍲',
      },
      {
        id: 'desserts',
        title: 'Desserts & richer recipes',
        desc: 'A fuller texture for more indulgent ideas',
        icon: '🍨',
      },
      {
        id: 'allAround',
        title: 'A bit of everything',
        desc: 'I want the most flexible fit overall',
        icon: '🥥',
      },
    ],
  },
  {
    id: 'priority',
    title: 'What matters most to you right now?',
    answers: [
      {
        id: 'pantry',
        title: 'Pantry convenience',
        desc: 'A product that is easy to keep on hand',
        icon: '🧺',
      },
      {
        id: 'richness',
        title: 'Extra creamy texture',
        desc: 'A richer option for fuller recipes',
        icon: '🥛',
      },
      {
        id: 'versatility',
        title: 'Versatility',
        desc: 'Something that works across several uses',
        icon: '✨',
      },
      {
        id: 'routine',
        title: 'A quick daily routine fit',
        desc: 'An easy option for everyday use',
        icon: '📅',
      },
    ],
  },
  {
    id: 'format',
    title: 'What sounds most appealing to you?',
    answers: [
      {
        id: 'light-creamy',
        title: 'A clean, creamy everyday add-in',
        desc: 'Great for drinks, oats, and simple recipes',
        icon: '🥥',
      },
      {
        id: 'richer-base',
        title: 'A richer recipe base',
        desc: 'Better for sauces, desserts, and fuller texture',
        icon: '🍮',
      },
      {
        id: 'grab-go',
        title: 'An easy pantry-style option',
        desc: 'A convenient choice for busy days',
        icon: '⚡',
      },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Which option sounds most like your routine?',
    answers: [
      {
        id: 'meal-prep',
        title: 'I cook regularly',
        desc: 'I use pantry staples in everyday meals',
        icon: '🍽️',
      },
      {
        id: 'dessert-lover',
        title: 'I like richer recipes',
        desc: 'I want more body and creaminess',
        icon: '🍰',
      },
      {
        id: 'busy',
        title: 'I need quick options',
        desc: 'Convenience matters most in my day',
        icon: '🏃',
      },
      {
        id: 'balanced',
        title: 'I want a balanced all-rounder',
        desc: 'I want something flexible and easy to use',
        icon: '🙂',
      },
    ],
  },
];

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div
        className="px-4 py-2 text-[12px] text-gray-600"
        style={{ backgroundColor: '#f7f8fa' }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <span>📦 Free shipping for orders within the contiguous US over $75</span>
          <span>🕘 Mon–Fri 9AM–5:30PM EST</span>
          <span>📞 (888) 963-6637</span>
        </div>
      </div>

      <div
        className="px-4 py-2 text-center text-sm font-bold text-white"
        style={{ backgroundColor: '#208b47' }}
      >
        Be Sure to Check Out All of Our Specials!
      </div>

      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-5">
          <img
            src="/images/logo.png"
            alt="Z Natural Foods"
            className="h-[44px] w-auto object-contain"
          />
          <nav className="flex flex-wrap items-center gap-7 text-[15px] font-medium text-gray-900">
            <a href="https://www.znaturalfoods.com/collections/all-products">Categories</a>
            <a href="https://www.znaturalfoods.com/pages/health-concerns">Health Concerns</a>
            <a
              href="https://www.znaturalfoods.com/specials"
              className="font-bold text-green-700"
            >
              🔥 Specials
            </a>
            <a href="https://www.znaturalfoods.com/blogs/articles">Articles</a>
            <a href="https://www.znaturalfoods.com/pages/bulk">Bulk</a>
            <a href="https://www.znaturalfoods.com/pages/about-us">About</a>
          </nav>
          <div className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-400">
            🔎 Search
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const colTitle = 'mb-3 text-[15px] font-bold text-white';
  const link = 'mb-1.5 block text-sm leading-6 text-gray-300';

  return (
    <footer className="mt-20 bg-slate-700 text-white">
      <div className="mx-auto max-w-7xl px-7 py-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <img
              src="/images/logo.png"
              alt="Z Natural Foods"
              className="mb-4 h-[42px] w-auto object-contain"
            />
            <p className="max-w-xs text-sm leading-7 text-gray-300">
              Z Natural Foods is dedicated to bringing you the finest quality in
              hard-to-find whole, all natural and organic foods.
            </p>
          </div>

          <div>
            <div className={colTitle}>CATALOG</div>
            <a href="https://www.znaturalfoods.com/collections/all-products" className={link}>
              All Products
            </a>
            <a href="https://www.znaturalfoods.com/pages/bulk" className={link}>
              Wholesale, Bulk & Custom Blends
            </a>
            <a
              href="https://https://www.znaturalfoods.com/specials"
              className={link}
            >
              Specials
            </a>
            <a href="https://www.znaturalfoods.com/collections/new-products" className={link}>
              New Products
            </a>
            <a href="https://www.znaturalfoods.com/pages/reviews" className={link}>
              Reviews
            </a>
          </div>

          <div>
            <div className={colTitle}>MY ACCOUNT</div>
            <a href="https://www.znaturalfoods.com/account/register" className={link}>
              Register
            </a>
            <a href="https://www.znaturalfoods.com/account/addresses" className={link}>
              My Address
            </a>
            <a href="https://www.znaturalfoods.com/account" className={link}>
              Order History
            </a>
            <a href="https://www.znaturalfoods.com/account" className={link}>
              Recurring Deliveries
            </a>
            <a href="https://www.znaturalfoods.com/pages/join-rewards-program" className={link}>
              Rewards Program
            </a>
          </div>

          <div>
            <div className={colTitle}>INFORMATION</div>
            <a href="https://www.znaturalfoods.com/pages/about-us" className={link}>
              About Us
            </a>
            <a href="https://www.znaturalfoods.com/pages/contact-us" className={link}>
              Contact Us
            </a>
            <a href="https://www.znaturalfoods.com/pages/faqs" className={link}>
              FAQs
            </a>
            <a href="https://www.znaturalfoods.com/pages/legal#tab-7" className={link}>
              Shipping
            </a>
            <a href="https://www.znaturalfoods.com/blogs/articles" className={link}>
              News & Media
            </a>
            <a href="https://www.znaturalfoods.com/pages/vendors" className={link}>
              Vendors
            </a>
          </div>

          <div>
            <div className={colTitle}>POLICIES</div>
            <a href="https://www.znaturalfoods.com/pages/legal#tab-1" className={link}>
              Privacy Policy
            </a>
            <a href="https://www.znaturalfoods.com/pages/legal#tab-9" className={link}>
              California Prop65
            </a>
            <a
              href="https://www.znaturalfoods.com/pages/legal-notice-disclaimer"
              className={link}
            >
              Legal Notice Disclaimer
            </a>
            <a href="https://www.znaturalfoods.com/pages/legal#tab-1" className={link}>
              Terms of Use
            </a>
            <a
              href="https://https://www.znaturalfoods.com/pages/legal#tab-5"
              className={link}
            >
              Your Privacy Choices
            </a>
            <a href="https://www.znaturalfoods.com/pages/legal#tab-8" className={link}>
              Accessibility
            </a>
          </div>
        </div>

        <div className="mt-9 border-t border-white/20 pt-4 text-[13px] leading-6 text-gray-300">
          * Disclaimer: Comments, reviews, testimonials, ratings, and social media
          posts reflect individual customer experiences and opinions only. They do
          not constitute guarantees, typical results, medical claims, or
          representations that any person will achieve the same outcome.
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-gray-300">
          <div>Copyright © 2026, Z Natural Foods, LLC. | ® All Rights Reserved.</div>
          <div className="flex flex-wrap gap-3 text-xs text-white">
            <span className="rounded bg-white px-3 py-2 text-slate-700">VISA</span>
            <span className="rounded bg-white px-3 py-2 text-slate-700">PayPal</span>
            <span className="rounded bg-white px-3 py-2 text-slate-700">AMEX</span>
            <span className="rounded bg-white px-3 py-2 text-slate-700">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Progress({ step }: { step: number }) {
  const items = [1, 2, 3, 4, 5];

  return (
    <div className="mt-6 flex items-center justify-center">
      {items.map((item, i) => {
        const active = item <= step;
        const isEmail = item === 5;

        return (
          <div key={item} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                active
                  ? 'border-green-700 bg-green-700 text-white'
                  : 'border-gray-300 bg-white text-gray-400'
              }`}
            >
              {isEmail ? '✉' : item}
            </div>
            {i < items.length - 1 && (
              <div
                className={`h-[2px] w-12 ${
                  item < step ? 'bg-green-700' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function QuestionCard({
  question,
  step,
  onAnswer,
}: {
  question: Question;
  step: number;
  onAnswer: (questionId: string, answerId: string) => void;
}) {
  return (
    <div className="relative z-10 mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
      <div className="mb-4 text-xs font-extrabold tracking-[0.18em] text-green-700">
        QUESTION {step} OF 4
      </div>
      <h2 className="mb-7 text-3xl font-extrabold text-slate-900 md:text-4xl">
        {question.title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {question.answers.map((answer) => (
          <button
            type="button"
            key={answer.id}
            onClick={() => onAnswer(question.id, answer.id)}
            className="relative z-10 flex w-full cursor-pointer select-none items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-green-600 hover:shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
              {answer.icon}
            </div>
            <div>
              <div className="mb-1 text-[17px] font-bold text-slate-900">
                {answer.title}
              </div>
              <div className="text-sm text-gray-500">{answer.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function EmailGate({
  firstName,
  setFirstName,
  email,
  setEmail,
  onSubmit,
  isSubmitting,
  submitError,
  submitSuccess,
}: {
  firstName: string;
  setFirstName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string;
  submitSuccess: string;
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
      <div className="mb-4 text-5xl">🥥</div>
      <h2 className="mx-auto mb-5 max-w-[700px] text-center text-[42px] font-extrabold leading-[1.15] text-slate-900">
        <span className="font-extrabold">Your recipes are ready!</span>
        <br />
        <span className="mt-2 inline-block font-normal">Surprise&nbsp;</span>
        <span className="font-extrabold">GIFT</span>
        <span className="font-normal"> — you got </span>
        <span className="font-extrabold">$10 OFF</span>
      </h2>
      <p className="mx-auto mb-7 max-w-[460px] text-center text-[17px] leading-8 text-gray-500">
        Subscribe to get your coupon code and 3 coconut milk recipe ideas matched to your routine.
      </p>
      <div className="mx-auto max-w-md space-y-3">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base outline-none transition focus:border-green-700"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base outline-none transition focus:border-green-700"
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-[58px] w-full max-w-md items-center justify-center rounded-xl px-8 text-[18px] font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
        style={{ backgroundColor: '#208b47' }}
      >
        {isSubmitting ? 'Submitting...' : 'Get My $10 OFF Code'}
      </button>

      {submitError ? <div className="mt-3 text-[13px] text-red-600">{submitError}</div> : null}
      {submitSuccess ? <div className="mt-3 text-[13px] text-green-700">{submitSuccess}</div> : null}

      <div className="mt-4 text-sm text-gray-400">
        🔒 By entering your email and clicking this button, you agree to receive marketing emails from Z Natural Foods. You can unsubscribe at any time.
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: ProductSize }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex min-h-[420px] items-center justify-center bg-[#f6f7f8] p-8">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-[340px] w-auto object-contain"
        />
      </div>
      <div className="flex flex-col items-center p-7 text-center">
        <div className="mb-2 text-sm text-gray-400">{product.subtitle}</div>
        <div className="mb-3 text-[28px] font-extrabold leading-tight text-slate-900">
          {product.name}
        </div>
        <p className="mb-5 max-w-[520px] text-[15px] leading-7 text-gray-500">
          {product.description}
        </p>
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-green-700 px-3 py-1 text-[12px] font-semibold text-green-700"
            >
              {badge}
            </span>
          ))}
        </div>
        <a
          href={product.url}
          className="inline-flex min-h-[52px] items-center justify-center rounded-xl px-6 text-base font-bold text-white"
          style={{ backgroundColor: '#208b47' }}
        >
          Shop Now →
        </a>
      </div>
    </div>
  );
}

function formatBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function getRecipeImage(recipe: Recipe) {
  const imageGroup = recipeImages[recipe.imageType] as Record<string, string>;
  return imageGroup[recipe.id] || '';
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <img
        src={getRecipeImage(recipe)}
        alt={recipe.title}
        className="h-[260px] w-full object-cover"
      />
      <div className="p-7">
        <div className="mb-2 text-[24px] font-extrabold leading-tight text-slate-900">
          {recipe.title}
        </div>
        <div className="mb-4 text-sm font-semibold text-green-700">
          ⏱ {recipe.time}
        </div>
        <p className="mb-5 text-[15px] leading-7 text-gray-500">{recipe.intro}</p>

        <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-green-700">
          What you need
        </div>
        <ul className="mb-5 list-disc pl-5 text-[15px] leading-7 text-slate-700">
          {recipe.ingredients.map((item) => (
            <li key={item}>{formatBoldText(item)}</li>
          ))}
        </ul>

        <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-green-700">
          How to make it
        </div>
        <ol className="list-decimal pl-5 text-[15px] leading-7 text-slate-700">
          {recipe.steps.map((step) => (
            <li key={step}>{formatBoldText(step)}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function CoconutMilkQuizPage() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const currentQuestion = questions[step - 1];

  const visibleRecipes = useMemo(() => {
    const recipePool = Object.entries(recipeSets).flatMap(([groupKey, items]) =>
      items.map((recipe) => ({ recipe, groupKey }))
    );

    const scoreRecipe = (groupKey: string, recipe: Recipe) => {
      let score = 0;

      if (answers.useCase === 'smoothies' && recipe.imageType === 'drink') score += 8;
      if (answers.useCase === 'cooking' && recipe.imageType === 'cooking') score += 8;
      if (answers.useCase === 'desserts' && recipe.imageType === 'dessert') score += 8;
      if (answers.useCase === 'allAround' && recipe.imageType === 'bowl') score += 8;

      if (answers.priority === 'routine') {
        if (groupKey === 'drinks_daily') score += 5;
        if (groupKey === 'balanced_mealprep') score += 3;
      }

      if (answers.priority === 'pantry') {
        if (groupKey === 'cooking_light') score += 4;
        if (groupKey === 'balanced_mealprep') score += 3;
        if (groupKey === 'drinks_daily') score += 2;
      }

      if (answers.priority === 'richness') {
        if (groupKey === 'cooking_rich') score += 5;
        if (groupKey === 'desserts_treats') score += 5;
        if (groupKey === 'desserts_fruit') score += 2;
      }

      if (answers.priority === 'versatility') {
        if (groupKey === 'balanced_bowls') score += 5;
        if (groupKey === 'drinks_quick') score += 3;
        if (groupKey === 'cooking_light') score += 3;
      }

      if (answers.format === 'light-creamy') {
        if (
          groupKey === 'drinks_quick' ||
          groupKey === 'drinks_daily' ||
          groupKey === 'balanced_bowls'
        ) {
          score += 4;
        }
      }

      if (answers.format === 'richer-base') {
        if (
          groupKey === 'cooking_rich' ||
          groupKey === 'desserts_treats' ||
          groupKey === 'desserts_fruit'
        ) {
          score += 4;
        }
      }

      if (answers.format === 'grab-go') {
        if (groupKey === 'drinks_daily' || groupKey === 'balanced_mealprep') {
          score += 4;
        }
      }

      if (answers.lifestyle === 'meal-prep') {
        if (groupKey === 'balanced_mealprep' || groupKey === 'cooking_light') {
          score += 5;
        }
      }

      if (answers.lifestyle === 'dessert-lover') {
        if (groupKey === 'desserts_treats' || groupKey === 'desserts_fruit') {
          score += 5;
        }
      }

      if (answers.lifestyle === 'busy') {
        if (groupKey === 'drinks_daily' || groupKey === 'drinks_quick') {
          score += 5;
        }
      }

      if (answers.lifestyle === 'balanced') {
        if (groupKey === 'balanced_bowls' || groupKey === 'cooking_light') {
          score += 4;
        }
      }

      if (
        recipe.time.includes('4 min') ||
        recipe.time.includes('6 min') ||
        recipe.time.includes('7 min') ||
        recipe.time.includes('10 min prep')
      ) {
        score += 1;
      }

      return score;
    };

    const ranked = recipePool
      .map((entry) => ({
        ...entry,
        score: scoreRecipe(entry.groupKey, entry.recipe),
      }))
      .sort((a, b) => b.score - a.score);

    const selected: Recipe[] = [];
    const usedTypes = new Set<string>();
    const usedIds = new Set<string>();

    ranked.forEach((entry) => {
      if (
        !usedIds.has(entry.recipe.id) &&
        !usedTypes.has(entry.recipe.imageType) &&
        selected.length < 3
      ) {
        selected.push(entry.recipe);
        usedIds.add(entry.recipe.id);
        usedTypes.add(entry.recipe.imageType);
      }
    });

    ranked.forEach((entry) => {
      if (!usedIds.has(entry.recipe.id) && selected.length < 3) {
        selected.push(entry.recipe);
        usedIds.add(entry.recipe.id);
      }
    });

    return selected;
  }, [answers]);

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setSubmitError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Subscription failed.');
      }

      setSubmitSuccess('Success! Your result is ready.');
      setSubmitted(true);
      setStep(6);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-10 pt-12">
        {step <= 5 && (
          <section className="mb-8 text-center">
            {step === 1 && (
              <>
                <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                  Find Your <span className="text-green-700">Personalized Coconut Milk Recipes</span>
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500 md:text-[28px] md:leading-[1.5]">
                  Answer 4 quick questions and get 3 personalized recipe ideas tailored to your routine.
                </p>
              </>
            )}
            <Progress step={step} />
          </section>
        )}

        {step <= 4 && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            step={step}
            onAnswer={handleAnswer}
          />
        )}

        {step === 5 && (
          <EmailGate
            firstName={firstName}
            setFirstName={setFirstName}
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
          />
        )}

        {step === 6 && submitted && (
          <section>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-extrabold md:text-5xl">
                Your Personalized Coconut Milk Recipe Ideas
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-500">
                Here are recipe ideas matched to your answers, along with both available product sizes.
              </p>
            </div>

            <div className="mx-auto mb-12 grid max-w-5xl gap-6 md:grid-cols-2">
              {productSizes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="mb-6 text-center text-2xl font-extrabold">
                🥥 Your coconut recipe ideas
              </div>
              <div className="space-y-6">
                {visibleRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
