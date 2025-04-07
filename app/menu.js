// app/menu.js
import { Platform } from 'react-native';
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

// Mapping of locally available images
const localImages = {
  // Dosa items
  'cheese-dosa.jpg': require('../assets/images/cheese-dosa.jpg'),
  'paneer-dosa.jpg': require('../assets/images/paneer-dosa.jpg'),
  'rava-dosa.jpg': require('../assets/images/rava-dosa.jpg'),
  'paratha.jpg': require('../assets/images/paratha.jpg'),

  // Breakfast items
  'poha.jpg': require('../assets/images/poha.jpg'),
  'sabudana-khichdi.jpg': require('../assets/images/sabudana-khichdi.jpg'),

  // Chinese items
  'gobi-manchurian.jpg': require('../assets/images/gobi-manchurian.jpg'),
  'hakka-noodles.jpg': require('../assets/images/hakka-noodles.jpg'),
  'schezwan-rice.jpg': require('../assets/images/schezwan-rice.jpg'),

  // Beverages
  'tea.jpg': require('../assets/images/tea.jpg'),
  'coffee.jpg': require('../assets/images/coffee.jpg'),
  'hot-chocolate.jpg': require('../assets/images/hot-chocolate.jpg'),

  // Milkshakes
  'strawberry-milkshake.jpg': require('../assets/images/strawberry-milkshake.jpg'),
  
  // Juices
  'mosambi-juice.jpg': require('../assets/images/mosambi-juice.jpg'),
  'mixed-fruit-juice.jpg': require('../assets/images/mixed-fruit-juice.jpg'),
  'pineapple-juice.jpg': require('../assets/images/pineapple-juice.jpg')
};

// Function to get the image source. Uses the local image if available; otherwise, it returns a remote placeholder URL.
const getImage = (imageName) => {
  try {
    if (localImages[imageName]) {
      // For local images (loaded with require), return the module object directly
      return localImages[imageName];
    } else {
      // If we don't have a local image, use a generic food image from assets as fallback
      console.log(`Image not found locally: ${imageName}, using fallback`);
      return require('../assets/images/cheese-dosa.jpg');
    }
  } catch (error) {
    console.error(`Error loading image: ${imageName}`, error);
    // Return a safe fallback in case of any errors
    return require('../assets/images/cheese-dosa.jpg');
  }
};

export const menuCategories = [
  {
    id: 'dosa',
    name: 'DOSA VARIETY',
    description:
      'South Indian crispy crepes made from fermented rice and lentil batter',
    image: 'https://via.placeholder.com/150?text=Dosa+Variety',
    featured: true,
  },
  {
    id: 'breakfast',
    name: 'BREAKFAST',
    description: 'Traditional Indian breakfast items to start your day',
    image: 'https://via.placeholder.com/150?text=Breakfast',
    featured: true,
  },
  {
    id: 'juices',
    name: 'FRESH JUICES',
    description: 'Freshly squeezed fruit juices',
    image: 'https://via.placeholder.com/150?text=Fresh+Juices',
    featured: false,
  },
  {
    id: 'milkshakes',
    name: 'MILKSHAKES',
    description: 'Thick, creamy milkshakes with various flavors',
    image: 'https://via.placeholder.com/150?text=Milkshakes',
    featured: false,
  },
  {
    id: 'veg-chinese',
    name: 'VEG CHINESE',
    description: 'Indo-Chinese vegetarian dishes',
    image: 'https://via.placeholder.com/150?text=Veg+Chinese',
    featured: false,
  },
  {
    id: 'beverages',
    name: 'HOT BEVERAGES',
    description: 'Warm drinks to refresh your soul',
    image: 'https://via.placeholder.com/150?text=Hot+Beverages',
    featured: false,
  },
];

export const menuItems = [
  // Dosa Items
  {
    id: 'cheese-dosa',
    name: 'Cheese Dosa',
    price: 80,
    prepTime: 10,
    categoryId: 'dosa',
    description: 'Dosa loaded with melted cheese',
    image: getImage('cheese-dosa.jpg'),
    ingredients: ['Rice batter', 'Cheese', 'Butter'],
    popular: true,
  },
  {
    id: 'paneer-dosa',
    name: 'Paneer Dosa',
    price: 85,
    prepTime: 12,
    categoryId: 'dosa',
    description: 'Crispy dosa filled with spiced paneer',
    image: getImage('paneer-dosa.jpg'),
    ingredients: ['Rice batter', 'Paneer', 'Spices'],
    popular: false,
  },
  {
    id: 'rava-dosa',
    name: 'Rava Dosa',
    price: 60,
    prepTime: 10,
    categoryId: 'dosa',
    description: 'Dosa made with semolina and spices',
    image: getImage('rava-dosa.jpg'),
    ingredients: ['Semolina', 'Spices', 'Green chilies'],
    popular: false,
  },

  // Breakfast Items
  {
    id: 'poha',
    name: 'Poha',
    price: 40,
    prepTime: 6,
    categoryId: 'breakfast',
    description: 'Flattened rice cooked with spices and veggies',
    image: getImage('poha.jpg'),
    ingredients: ['Poha', 'Mustard seeds', 'Onion', 'Peanuts'],
    popular: true,
  },
  {
    id: 'sabudana-khichdi',
    name: 'Sabudana Khichdi',
    price: 50,
    prepTime: 10,
    categoryId: 'breakfast',
    description:
      'Sago pearls cooked with peanuts and spices',
    image: getImage('sabudana.jpg'), // Will fallback if sabudana.jpg is not in localImages
    ingredients: ['Sabudana', 'Peanuts', 'Potato', 'Curry leaves'],
    popular: false,
  },
  {
    id: 'paratha',
    name: 'Stuffed Paratha',
    price: 60,
    prepTime: 12,
    categoryId: 'breakfast',
    description: 'Wheat flatbread stuffed with spiced potatoes',
    image: getImage('paratha.jpg'),
    ingredients: ['Wheat flour', 'Potato', 'Spices', 'Butter'],
    popular: false,
  },

  // Juices
  {
    id: 'pineapple-juice',
    name: 'Pineapple Juice',
    price: 50,
    prepTime: 3,
    categoryId: 'juices',
    description: 'Freshly extracted pineapple juice',
    image: getImage('pineapple-juice.jpg'),
    ingredients: ['Pineapple', 'Sugar (optional)'],
    popular: false,
  },
  {
    id: 'mosambi-juice',
    name: 'Mosambi Juice',
    price: 45,
    prepTime: 3,
    categoryId: 'juices',
    description: 'Sweet lime juice, fresh and tasty',
    image: getImage('mosambi-juice.jpg'),
    ingredients: ['Mosambi', 'Sugar (optional)', 'Salt (optional)'],
    rating: 4.5,
    popular: true,
  },
  {
    id: 'mixed-fruit-juice',
    name: 'Mixed Fruit Juice',
    price: 60,
    prepTime: 5,
    categoryId: 'juices',
    description: 'Blend of seasonal fruits',
    image: getImage('mixed-fruit-juice.jpg'),
    ingredients: ['Mango', 'Banana', 'Apple', 'Papaya'],
    popular: true,
  },

  // Milkshakes
  {
    id: 'strawberry-milkshake',
    name: 'Strawberry Milkshake',
    price: 75,
    prepTime: 5,
    categoryId: 'milkshakes',
    description: 'Creamy milkshake made with fresh strawberries',
    image: getImage('strawberry-milkshake.jpg'),
    ingredients: ['Strawberries', 'Milk', 'Sugar', 'Ice cream'],
    popular: false,
  },

  // Veg Chinese
  {
    id: 'gobi-manchurian',
    name: 'Gobi Manchurian',
    price: 90,
    prepTime: 15,
    categoryId: 'veg-chinese',
    description: 'Crispy cauliflower tossed in tangy sauce',
    image: getImage('gobi-manchurian.jpg'),
    ingredients: ['Cauliflower', 'Cornflour', 'Soy sauce'],
    popular: true,
  },
  {
    id: 'hakka-noodles',
    name: 'Hakka Noodles',
    price: 85,
    prepTime: 12,
    categoryId: 'veg-chinese',
    description: 'Spicy stir-fried noodles with veggies',
    image: getImage('hakka-noodles.jpg'),
    ingredients: ['Noodles', 'Veggies', 'Garlic', 'Soy sauce'],
    popular: true,
  },
  {
    id: 'schezwan-rice',
    name: 'Schezwan Fried Rice',
    price: 90,
    prepTime: 13,
    categoryId: 'veg-chinese',
    description: 'Rice stir-fried with Schezwan sauce',
    image: getImage('schezwan-rice.jpg'),
    ingredients: ['Rice', 'Veggies', 'Schezwan sauce'],
    popular: false,
  },

  // Beverages
  {
    id: 'tea',
    name: 'Tea',
    price: 20,
    prepTime: 4,
    categoryId: 'beverages',
    description: 'Traditional Indian chai',
    image: getImage('tea.jpg'),
    ingredients: ['Tea leaves', 'Milk', 'Sugar', 'Ginger'],
    popular: true,
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 25,
    prepTime: 5,
    categoryId: 'beverages',
    description: 'Strong and creamy coffee',
    image: getImage('coffee.jpg'),
    ingredients: ['Coffee powder', 'Milk', 'Sugar'],
    popular: false,
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    price: 50,
    prepTime: 6,
    categoryId: 'beverages',
    description: 'Rich hot chocolate drink',
    image: getImage('hot-chocolate.jpg'),
    ingredients: ['Milk', 'Cocoa powder', 'Sugar', 'Cream'],
    popular: true,
  }
];

// -------------------------------
// Firestore Integration Functions
// -------------------------------

// Function to add menu categories to Firestore
export const addMenuCategoriesToFirestore = async () => {
  const categoriesCollection = collection(db, 'menuCategories');

  for (const category of menuCategories) {
    const categoryDoc = doc(categoriesCollection, category.id);
    await setDoc(categoryDoc, category);
  }
  console.log('Menu categories added to Firestore');
};

// Function to add menu items to Firestore
export const addMenuItemsToFirestore = async () => {
  const itemsCollection = collection(db, 'menuItems');

  for (const item of menuItems) {
    const itemDoc = doc(itemsCollection, item.id);
    await setDoc(itemDoc, item);
  }
  console.log('Menu items added to Firestore');
};

// Functions to fetch data from Firestore (if needed)
export const fetchMenuCategories = async () => {
  const categoriesCollection = collection(db, 'menuCategories');
  const querySnapshot = await getDocs(categoriesCollection);
  const categories = [];
  querySnapshot.forEach(doc => {
    categories.push(doc.data());
  });
  return categories;
};

export const fetchMenuItems = async () => {
  const itemsCollection = collection(db, 'menuItems');
  const querySnapshot = await getDocs(itemsCollection);
  const items = [];
  querySnapshot.forEach(doc => {
    items.push(doc.data());
  });
  return items;
};

// -------------------------------
// Utility Functions for Local Data (Optional)
// -------------------------------
export const getMenuItemsByCategory = (categoryId) => {
  return menuItems.filter(item => item.categoryId === categoryId);
};

export const getPopularMenuItems = () => {
  return menuItems.filter(item => item.popular === true);
};

export const getMenuItemById = (id) => {
  return menuItems.find(item => item.id === id);
};
