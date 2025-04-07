import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from './FavoritesContext';
import { useCart } from './CartContext';
import defaultImage from '../assets/images/cheese-dosa.jpg';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFromFavorites } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    const completeItem = {
      ...item,
      formattedPrice: `₹${item.price}`,
      image: typeof item.image === 'string' ? { uri: item.image } : item.image
    };
    addToCart(completeItem);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      {/* Favorites List */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={item.image}
                style={styles.itemImage}
                defaultSource={defaultImage}
                resizeMode="cover"
              />
              <View style={styles.itemContent}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {typeof item.isVeg !== 'undefined' && (
                    <View
                      style={[
                        styles.vegIndicator,
                        { backgroundColor: item.isVeg ? '#0f8a0f' : '#b30000' }
                      ]}
                    />
                  )}
                </View>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    onPress={() => removeFromFavorites(item.id)}
                    style={styles.heartButton}
                  >
                    <MaterialCommunityIcons name="heart" size={24} color="#FF6200" />
                  </TouchableOpacity>
                  <View style={styles.quantityControls}>
                    {getItemQuantity(item.id) > 0 && (
                      <>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => removeFromCart(item)}
                        >
                          <MaterialCommunityIcons name="minus" size={14} color="#FF6200" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{getItemQuantity(item.id)}</Text>
                      </>
                    )}
                    <TouchableOpacity
                      style={styles.addButton}
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
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="heart-outline" size={48} color="#ddd" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubText}>Items you favorite will appear here</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15
  },
  backButton: {
    padding: 5
  },
  listContainer: {
    padding: 15
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    overflow: 'hidden'
  },
  itemImage: {
    width: 100,
    height: 100
  },
  itemContent: {
    flex: 1,
    padding: 10
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  vegIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  itemPrice: {
    fontSize: 14,
    color: '#666'
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  heartButton: {
    padding: 5
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6200',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 8
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6200',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666'
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5
  }
});
