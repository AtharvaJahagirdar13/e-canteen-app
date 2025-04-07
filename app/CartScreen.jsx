import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from './CartContext';
import defaultImage from '../assets/images/cheese-dosa.jpg';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

function CartScreen({ onBackPress }) {
  const router = useRouter();
  const navigation = useNavigation();
  const { cartItems, removeFromCart, addToCart } = useCart();

  const handleIncreaseQuantity = (item) => {
    const completeItem = {
      ...item,
      formattedPrice: `₹${item.price}`,
      image: typeof item.image === 'string' ? { uri: item.image } : item.image
    };
    addToCart(completeItem);
  };

  const handleDecreaseQuantity = (item) => {
    removeFromCart(item);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image 
                  source={item.image} 
                  style={styles.image}
                  defaultSource={defaultImage}
                  resizeMode="cover"
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                  <Text style={styles.prepTime}>{item.prepTime || '15-20'} mins</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleDecreaseQuantity(item)}
                    >
                      <MaterialCommunityIcons name="minus" size={16} color="#FF6200" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleIncreaseQuantity(item)}
                    >
                      <MaterialCommunityIcons name="plus" size={16} color="#FF6200" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
          </View>
        </>
      )}
      <TouchableOpacity 
        style={[styles.checkoutButton, cartItems.length === 0 && styles.disabledButton]} 
        onPress={() => {
          if (cartItems.length === 0) {
            Alert.alert('Cart Empty', 'Please add items to your cart before proceeding to payment.');
            return;
          }
          // Generate a random order ID
          const orderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
          router.push({
            pathname: '/order-tracking',
            params: {
              orderId,
              totalAmount: calculateTotal()
            }
          });
        }}
      >
        <Text style={[styles.checkoutButtonText, cartItems.length === 0 && styles.disabledButtonText]}>
          {cartItems.length === 0 ? 'Cart Empty' : 'Proceed to Pay'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

import { Alert } from 'react-native';

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#777',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 2,
    marginTop: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6200'
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginHorizontal: 12
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
    marginTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#777',
    marginVertical: 5,
  },
  prepTime: {
    fontSize: 14,
    color: '#777',
  },
  checkoutButton: {
    backgroundColor: '#FF6200',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  disabledButtonText: {
    color: '#666',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CartScreen;