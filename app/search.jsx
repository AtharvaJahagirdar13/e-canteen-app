// app/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { fetchMenuItems, menuItems } from './menu';
import { useCart } from './CartContext';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, cartItems } = useCart();
  
  // Function to get quantity of item in cart
  const getItemQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Fetch menu items on mount
  useEffect(() => {
    const getData = async () => {
      try {
        // Use local data first
        setAllMenuItems(menuItems);
        setLoading(false);
        
        // Then try to fetch from Firestore in the background
        try {
          const items = await fetchMenuItems();
          if (items && items.length > 0) {
            setAllMenuItems(items);
          }
        } catch (firestoreError) {
          console.log('Firestore fetch failed, using local data', firestoreError);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load menu items');
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const filteredResults = allMenuItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
      (item.ingredients &&
        item.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(query.toLowerCase())
        ))
    );
    
    setResults(filteredResults);
  };

  const navigateToItemDetail = (itemId) => {
    router.push({
      pathname: '/ItemDetailScreen',
      params: { itemId }
    });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };
  
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Dishes</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for dishes, ingredients..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity 
                style={styles.itemContent}
                onPress={() => navigateToItemDetail(item.id)}
              >
                <Image 
                  source={item.image} 
                  style={styles.itemImage}
                  defaultSource={require('../assets/images/cheese-dosa.jpg')}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  {item.description && (
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              
              {getItemQuantity(item.id) > 0 ? (
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleRemoveFromCart(item)}
                  >
                    <MaterialCommunityIcons name="minus" size={16} color="#FF6200" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{getItemQuantity(item.id)}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <MaterialCommunityIcons name="plus" size={16} color="#FF6200" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <MaterialCommunityIcons name="plus" size={22} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {query.length > 0 ? (
                <Text style={styles.emptyText}>No results found for "{query}"</Text>
              ) : (
                <Text style={styles.emptyText}>Search for dishes</Text>
              )}
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#FF6200',
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center'
  },
  itemContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  itemInfo: {
    marginLeft: 15,
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPrice: {
    fontSize: 14,
    color: '#777',
  },
  itemDescription: {
    fontSize: 12,
    color: '#555'
  },
  addButton: {
    backgroundColor: '#FF6200',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 2
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
  emptyContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  loadingContainer: {
    alignItems: 'center'
  }
});
