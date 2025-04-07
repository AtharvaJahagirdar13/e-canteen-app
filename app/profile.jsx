import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('123-456-7890');

  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profilePic} 
        />
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput 
        style={styles.input} 
        value={phone} 
        onChangeText={setPhone} 
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
  },
  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;