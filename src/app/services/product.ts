interface Product {
  name: string;
  color: string;
}

interface Drink extends Product {
  additives?: Array<Additive>;
}

interface Additive extends Product {
}

const Milk: Additive = {
  name: 'milk',
  color: 'white'
};

const Sugar: Additive = {
  name: 'sugar',
  color: 'white'
};

const Coffee: Drink = {
  name: 'coffee',
  color: 'brown',
  additives: [Milk, Sugar],
};

const Tea: Drink = {
  name: 'tea',
  color: 'green',
  additives: [Milk, Sugar],
};

export {Product, Drink, Additive, Milk, Sugar, Coffee, Tea};
