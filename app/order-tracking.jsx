import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const orderStates = [
  {
    id: 1,
    title: 'Order Confirmed',
    icon: 'check-circle-outline',
    description: 'Your order has been received'
  },
  {
    id: 2,
    title: 'Order Accepted',
    icon: 'receipt',
    description: 'Restaurant has accepted your order'
  },
  {
    id: 3,
    title: 'Preparing',
    icon: 'food',
    description: 'Your food is being prepared'
  },
  {
    id: 4,
    title: 'Ready for Pickup',
    icon: 'food-takeout-box',
    description: 'Your order is ready for pickup'
  },
  {
    id: 5,
    title: 'Completed',
    icon: 'check-circle',
    description: 'Order completed successfully'
  }
];

export default function OrderTrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentState, setCurrentState] = useState(1);
  const { orderId, totalAmount } = params;

  useEffect(() => {
    // Simulate order progress
    const intervals = [3000, 5000, 7000, 6000]; // Time in ms between states
    let currentInterval = 0;

    const timer = setInterval(() => {
      if (currentState < 5) {
        setCurrentState(prev => prev + 1);
        currentInterval++;

        if (currentInterval >= intervals.length) {
          clearInterval(timer);
        }
      }
    }, intervals[currentInterval]);

    return () => clearInterval(timer);
  }, [currentState]);

  const getStateStyle = (stateId) => ({
    ...styles.stateCircle,
    backgroundColor: stateId <= currentState ? '#FF6200' : '#E0E0E0',
  });

  const getLineStyle = (stateId) => ({
    ...styles.line,
    backgroundColor: stateId < currentState ? '#FF6200' : '#E0E0E0',
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Status</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Text style={styles.amount}>₹{totalAmount}</Text>
      </View>

      <ScrollView style={styles.trackingContainer} showsVerticalScrollIndicator={false}>
        {orderStates.map((state, index) => (
          <View key={state.id} style={styles.stateContainer}>
            <View style={styles.stateContent}>
              <View style={getStateStyle(state.id)}>
                <MaterialCommunityIcons 
                  name={state.icon} 
                  size={24} 
                  color={state.id <= currentState ? '#FFF' : '#999'} 
                />
              </View>
              <Text style={[
                styles.stateTitle,
                { color: state.id <= currentState ? '#000' : '#999' }
              ]}>
                {state.title}
              </Text>
              <Text style={styles.stateDescription}>{state.description}</Text>
            </View>
            {index < orderStates.length - 1 && (
              <View style={getLineStyle(state.id)} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  orderInfo: {
    padding: 20,
    backgroundColor: '#F8F8F8',
    marginBottom: 20,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  amount: {
    fontSize: 14,
    color: '#666',
  },
  trackingContainer: {
    paddingHorizontal: 30,
  },
  stateContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  stateContent: {
    alignItems: 'center',
    marginBottom: 10,
  },
  stateCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  stateTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  stateDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
