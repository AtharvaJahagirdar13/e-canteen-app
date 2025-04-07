// app/orders.jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const previousOrders = [
  {
    id: '1',
    dateTime: 'March 29, 2025 - 12:30 PM',
    items: [
      { name: 'Butter Sada Dosa', quantity: 1 },
      { name: 'Veg Fried Rice', quantity: 1 },
      { name: 'Mango Milkshake', quantity: 2 },
    ],
  },
  {
    id: '2',
    dateTime: 'March 28, 2025 - 8:15 PM',
    items: [
      { name: 'Schezwan Noodles', quantity: 1 },
      { name: 'Gulab Jamun', quantity: 3 },
    ],
  },
  {
    id: '3',
    dateTime: 'March 26, 2025 - 2:45 PM',
    items: [
      { name: 'Paneer Butter Masala', quantity: 1 },
      { name: 'Butter Naan', quantity: 2 },
      { name: 'Sweet Lassi', quantity: 1 },
    ],
  },
];

export default function OrdersScreen()  {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Previous Orders</Text>
      <FlatList
        data={previousOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderBox}>
            <Text style={styles.dateTime}>{item.dateTime}</Text>
            {item.items.map((orderItem, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemText}>{orderItem.quantity}x {orderItem.name}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4', // Softer background for contrast
      padding: 15,
    },
    header: {
      fontSize: 22,
      fontWeight: '700',
      color: '#222',
      marginBottom: 15,
    },
    orderBox: {
      backgroundColor: '#fff',
      borderRadius: 12, // More rounded for modern UI
      padding: 18,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 5,
      elevation: 3,
    },
    dateTime: {
      fontSize: 16,
      fontWeight: '600',
      color: '#444',
      marginBottom: 10,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: '#eee', // Light separator for clarity
    },
    itemText: {
      fontSize: 15,
      fontWeight: '500',
      color: '#333',
    },
  });