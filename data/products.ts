export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  origin: string;
  type: string;
}

export const products: Product[] = [
  {
    id: 'opal-1',
    name: 'Lightning Ridge Black Opal',
    description: 'A stunning solid black opal from Lightning Ridge with a rare red-on-black color play. Brilliant flashes of scarlet, emerald, and azure.',
    price: 4500,
    image: 'https://picsum.photos/seed/opal1/800/1000',
    origin: 'Lightning Ridge, NSW',
    type: 'Black Opal'
  },
  {
    id: 'opal-2',
    name: 'Coober Pedy Crystal Opal',
    description: 'Translucent crystal opal with a mesmerizing broad flash of pastel pinks, greens, and blues. Perfect for an elegant pendant.',
    price: 1200,
    image: 'https://picsum.photos/seed/opal2/800/1000',
    origin: 'Coober Pedy, SA',
    type: 'Crystal Opal'
  },
  {
    id: 'opal-3',
    name: 'Queensland Boulder Opal',
    description: 'A beautiful boulder opal displaying a vivid river of electric blue and green running through dark ironstone matrix.',
    price: 850,
    image: 'https://picsum.photos/seed/opal3/800/1000',
    origin: 'Winton, QLD',
    type: 'Boulder Opal'
  },
  {
    id: 'opal-4',
    name: 'Mintabie Light Opal',
    description: 'A brilliant light opal from the historic Mintabie field. Displays a strong pinfire pattern with intense multicolored flashes.',
    price: 2100,
    image: 'https://picsum.photos/seed/opal4/800/1000',
    origin: 'Mintabie, SA',
    type: 'Light Opal'
  },
  {
    id: 'opal-5',
    name: 'Andamooka Matrix Opal',
    description: 'A treated Andamooka matrix opal exhibiting deep, vibrant, star-like sparkles of neon green and purple.',
    price: 600,
    image: 'https://picsum.photos/seed/opal5/800/1000',
    origin: 'Andamooka, SA',
    type: 'Matrix Opal'
  },
  {
    id: 'opal-6',
    name: 'Royal Harlequin Black Opal',
    description: 'An exceptional collector piece featuring the extremely rare harlequin pattern. An absolute museum-grade gemstone.',
    price: 25000,
    image: 'https://picsum.photos/seed/opal6/800/1000',
    origin: 'Lightning Ridge, NSW',
    type: 'Black Opal'
  }
];
