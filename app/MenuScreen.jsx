import defaultImage from '../assets/images/cheese-dosa.jpg';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  StatusBar
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  menuCategories,
  menuItems,
  getPopularMenuItems,
  fetchMenuCategories,
  fetchMenuItems
} from './menu';
import { useCart } from './CartContext';

export default function MenuScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialCategory = params.categoryId || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [isFirestore, setIsFirestore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Firestore or fallback to local data
  useEffect(() => {
    const loadLocalData = () => {
      // Build filter list from local menuCategories
      const formattedCategories = [{ id: 'all', name: 'All' }, ...menuCategories];
      setCategoriesList(formattedCategories);
      setAllMenuItems(menuItems);
      setPopularItems(getPopularMenuItems());
      
      if (initialCategory && initialCategory !== 'all') {
        const matchingCategory = menuCategories.find(cat => cat.id === initialCategory);
        if (matchingCategory) {
          setSelectedCategory(matchingCategory.id);
        }
      }
      console.log('Local menu items loaded:', menuItems);
      // Set loading to false after local data is loaded
      setIsLoading(false);
    };

    const loadData = async () => {
      setIsLoading(true);
      
      // Load local data first
      loadLocalData();
      
      try {
        // Then try to fetch from Firestore in the background
        const [firestoreCategories, firestoreItems] = await Promise.all([
          fetchMenuCategories(),
          fetchMenuItems()
        ]);

        if (firestoreCategories.length > 0 && firestoreItems.length > 0) {
          // Build filter list from firestore categories
          const formattedCategories = [{ id: 'all', name: 'All' }, ...firestoreCategories];
          setCategoriesList(formattedCategories);
          setAllMenuItems(firestoreItems);
          setPopularItems(firestoreItems.filter(item => item.popular === true));
          setIsFirestore(true);

          // If an initial category is provided, update selectedCategory
          if (initialCategory && initialCategory !== 'all') {
            const matchingCategory = firestoreCategories.find(cat => cat.id === initialCategory);
            if (matchingCategory) {
              setSelectedCategory(matchingCategory.id);
            }
          }
        }
      } catch (error) {
        console.log('Error loading from Firestore:', error);
        // Local data is already loaded, so we can continue
      }
    };

    loadData();
    
    // Cleanup function to reset loading state when component unmounts
    return () => setIsLoading(false);
  }, [initialCategory]);

  // Filter items: if "all" is selected, ignore category; otherwise, match item.categoryId
  const filteredItems = allMenuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ? true : item.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log('Filtered items:', filteredItems);

  const { cartItems, addToCart, removeFromCart } = useCart();

  const handleAddToCart = (item) => {
    const completeItem = {
      ...item,
      formattedPrice: `₹${item.price}`,
      image: typeof item.image === 'string' ? { uri: item.image } : item.image
    };
    addToCart(completeItem);
    console.log(`Added ${item.name} to cart`, completeItem);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    console.log(`Removed ${item.name} from cart`);
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={localMenuStyles.container}>
      <StatusBar style="dark" />
      {isLoading && (
        <View style={localMenuStyles.loadingContainer}>
          <Text style={localMenuStyles.loadingText}>Loading menu items...</Text>
        </View>
      )}

      {/* Header */}
      <View style={localMenuStyles.header}>
        {/* Back Button routes to home page (index.jsx) */}
        <TouchableOpacity
          onPress={() => router.push('/')}
          style={localMenuStyles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={localMenuStyles.headerTitle}>Menu</Text>
        {/* Cart Button routes to CartScreen.jsx */}
        <TouchableOpacity
          style={localMenuStyles.cartButton}
          onPress={() => router.push('/CartScreen')}
        >
          <MaterialCommunityIcons name="cart-outline" size={24} color="#333" />
          {cartItemCount > 0 && (
            <View style={localMenuStyles.cartBadge}>
              <Text style={localMenuStyles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={localMenuStyles.searchContainer}>
        <View style={localMenuStyles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={18} color="#777" />
          <TextInput
            style={localMenuStyles.searchInput}
            placeholder="Search for dishes..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close" size={18} color="#777" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={localMenuStyles.filterButton}>
          <MaterialCommunityIcons name="tune-vertical" size={18} color="#FF6200" />
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <View style={localMenuStyles.cuisineFilterContainer}>
        <Text style={localMenuStyles.filterTitle}>Filter by Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localMenuStyles.cuisinesList}
        >
          {categoriesList.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                localMenuStyles.cuisineButton,
                selectedCategory === category.id && localMenuStyles.cuisineButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  localMenuStyles.cuisineButtonText,
                  selectedCategory === category.id && localMenuStyles.cuisineButtonTextActive
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Popular Items Section (visible when no search/filter is active) */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <View style={localMenuStyles.popularSection}>
          <Text style={localMenuStyles.sectionTitle}>Popular Items</Text>
          <FlatList
            horizontal
            data={popularItems}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={localMenuStyles.popularItemsList}
            renderItem={({ item }) => (
              <View style={localMenuStyles.popularItem}>
                <Image
                  source={item.image}
                  style={localMenuStyles.popularItemImage}
                  defaultSource={defaultImage}
                  resizeMode="cover"
                />
                {/* Conditionally render veg indicator only if item.isVeg is defined */}
                {typeof item.isVeg !== 'undefined' && (
                  <View style={localMenuStyles.vegBadge}>
                    <View
                      style={[
                        localMenuStyles.vegIndicator,
                        { backgroundColor: item.isVeg ? '#0f8a0f' : '#b30000' }
                      ]}
                    />
                  </View>
                )}
                <View style={localMenuStyles.popularItemContent}>
                  <Text style={localMenuStyles.popularItemName}>{item.name}</Text>
                  <View style={localMenuStyles.popularItemMeta}>
                    <View style={localMenuStyles.ratingContainer}>
                      <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                      <Text style={localMenuStyles.ratingText}>{item.rating || '4.0'}</Text>
                    </View>
                    <Text style={localMenuStyles.prepTime}>{item.prepTime || '10 min'}</Text>
                  </View>
                  <View style={localMenuStyles.itemPrepTime}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#666" />
                    <Text style={localMenuStyles.prepTimeText}>{item.prepTime || '15-20'} mins</Text>
                  </View>
                  <View style={localMenuStyles.popularItemPriceRow}>
                    <Text style={localMenuStyles.popularItemPrice}>
                      {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                    </Text>
                    <View style={localMenuStyles.quantityControls}>
                      {getItemQuantity(item.id) > 0 && (
                        <>
                          <TouchableOpacity
                            style={localMenuStyles.quantityButton}
                            onPress={() => handleRemoveFromCart(item)}
                          >
                            <MaterialCommunityIcons name="minus" size={14} color="#FF6200" />
                          </TouchableOpacity>
                          <Text style={localMenuStyles.quantityText}>{getItemQuantity(item.id)}</Text>
                        </>
                      )}
                      <TouchableOpacity
                        style={localMenuStyles.addButton}
                        onPress={() => handleAddToCart(item)}
                      >
                        <MaterialCommunityIcons name="plus" size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {/* Menu Items List */}
      <View style={localMenuStyles.menuListContainer}>
        <Text style={localMenuStyles.sectionTitle}>
          {searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'All Items'}
        </Text>
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={localMenuStyles.menuItemsList}
            renderItem={({ item }) => (
              <View style={localMenuStyles.menuItem}>
                <Image
                  source={item.image}
                  style={localMenuStyles.menuItemImage}
                  defaultSource={defaultImage}
                  resizeMode="cover"
                />
                <View style={localMenuStyles.menuItemContent}>
                  <View style={localMenuStyles.menuItemHeader}>
                    <Text style={localMenuStyles.menuItemName}>{item.name}</Text>
                    {typeof item.isVeg !== 'undefined' && (
                      <View
                        style={[
                          localMenuStyles.smallVegIndicator,
                          { backgroundColor: item.isVeg ? '#0f8a0f' : '#b30000' }
                        ]}
                      />
                    )}
                  </View>
                  {/* Optionally show category name */}
                  <Text style={localMenuStyles.cuisineTag}>{/* You can display category name here if needed */}</Text>
                  <View style={localMenuStyles.menuItemMeta}>
                    <View style={localMenuStyles.ratingContainer}>
                      <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                      <Text style={localMenuStyles.ratingText}>{item.rating || '4.0'}</Text>
                    </View>
                    <Text style={localMenuStyles.prepTime}>• {item.prepTime || '10 min'}</Text>
                  </View>
                  <View style={localMenuStyles.itemPrepTime}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#666" />
                    <Text style={localMenuStyles.prepTimeText}>{item.prepTime || '15-20'} mins</Text>
                  </View>
                  <View style={localMenuStyles.menuItemBottom}>
                    <Text style={localMenuStyles.menuItemPrice}>
                      {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                    </Text>
                    <View style={localMenuStyles.quantityControls}>
                      {getItemQuantity(item.id) > 0 && (
                        <>
                          <TouchableOpacity
                            style={localMenuStyles.quantityButton}
                            onPress={() => handleRemoveFromCart(item)}
                          >
                            <MaterialCommunityIcons name="minus" size={14} color="#FF6200" />
                          </TouchableOpacity>
                          <Text style={localMenuStyles.quantityText}>{getItemQuantity(item.id)}</Text>
                        </>
                      )}
                      <TouchableOpacity
                        style={localMenuStyles.addButton}
                        onPress={() => handleAddToCart(item)}
                      >
                        <MaterialCommunityIcons name="plus" size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={localMenuStyles.noResultsContainer}>
            <MaterialCommunityIcons name="food-off" size={48} color="#ddd" />
            <Text style={localMenuStyles.noResultsText}>No items found</Text>
            <Text style={localMenuStyles.noResultsSubText}>Try a different search term or filter</Text>
          </View>
        )}
      </View>

      {isFirestore && (
        <View style={localMenuStyles.dataSourceInfo}>
          <Text style={localMenuStyles.dataSourceText}>Data loaded from Firestore</Text>
        </View>
      )}
    </View>
  );
}

const localMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10 + (StatusBar.currentHeight || 0),
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 1
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  backButton: {
    padding: 5
  },
  cartButton: {
    padding: 5
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6200',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    color: '#333'
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cuisineFilterContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8
  },
  cuisinesList: {
    paddingBottom: 10
  },
  cuisineButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8
  },
  cuisineButtonActive: {
    backgroundColor: '#FF6200'
  },
  cuisineButtonText: {
    fontSize: 13,
    color: '#666'
  },
  cuisineButtonTextActive: {
    color: '#fff',
    fontWeight: '500'
  },
  popularSection: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 15,
    marginBottom: 12
  },
  popularItemsList: {
    paddingLeft: 15,
    paddingRight: 5
  },
  popularItem: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden'
  },
  popularItemImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 2
  },
  vegIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  popularItemContent: {
    padding: 10
  },
  popularItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4
  },
  popularItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6
  },
  ratingText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 2
  },
  prepTime: {
    fontSize: 12,
    color: '#777'
  },
  popularItemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  popularItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333'
  },
  itemPrepTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  prepTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 2
  },
  quantityButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6200'
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginHorizontal: 8
  },
  addButton: {
    backgroundColor: '#FF6200',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 8,
    paddingTop: 15
  },
  menuItemsList: {
    paddingHorizontal: 15,
    paddingBottom: 20
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  menuItemImage: {
    width: 75,
    height: 75,
    borderRadius: 8
  },
  menuItemContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between'
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginRight: 5
  },
  smallVegIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  cuisineTag: {
    fontSize: 12,
    color: '#666',
    marginTop: 3
  },
  menuItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  menuItemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  menuItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333'
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000
  },
  loadingText: {
    fontSize: 16,
    color: '#FF6200',
    fontWeight: '500'
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#aaa',
    marginTop: 10
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5
  },
  dataSourceInfo: {
    alignItems: 'center',
    padding: 10
  },
  dataSourceText: {
    fontSize: 12,
    color: '#999'
  }
});
