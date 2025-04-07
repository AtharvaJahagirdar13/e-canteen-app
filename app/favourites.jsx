import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function favorites() {
  const router = useRouter();

  // Dummy favorite items data
  const [favorites, setFavorites] = useState([
    { id: '1', name: 'Masala Dosa', price: '₹60', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Veg Manchurian', price: '₹90', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Paneer Butter Masala', price: '₹110', image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Mango Milkshake', price: '₹70', image: 'https://via.placeholder.com/150' },
  ]);

  const handleAddToCart = (item) => {
    // For now, simply display an alert for the dummy "add to cart" action.
    Alert.alert('Add to Cart', `${item.name} added to cart!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
            <MaterialCommunityIcons name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
            <MaterialCommunityIcons name="heart" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    borderRadius: 6,
    padding: 10,
    alignItems: 'center'
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  itemPrice: {
    fontSize: 16,
    color: '#777',
    marginVertical: 5,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FF6200',
    padding: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  heartButton: {
    padding: 8,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#FF6200',
    fontSize: 16,
  },
});
