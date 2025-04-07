// app/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView
} from 'react-native';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Picker } from '@react-native-picker/picker';

const AdminPanel = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    prepTime: '',
    categoryId: '',
    description: '',
    ingredients: [],
    popular: false,
    image: '' // added image field
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const categoriesCollection = collection(db, 'menuCategories');
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = [];
      categorySnapshot.forEach((doc) => {
        categoryList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoryList);

      // Fetch menu items
      const itemsCollection = collection(db, 'menuItems');
      const itemSnapshot = await getDocs(itemsCollection);
      const itemList = [];
      itemSnapshot.forEach((doc) => {
        itemList.push({ id: doc.id, ...doc.data() });
      });
      setMenuItems(itemList);
    } catch (error) {
      console.error('Error fetching data: ', error);
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setIsEditing(false);
    setFormData({
      id: '',
      name: '',
      price: '',
      prepTime: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      description: '',
      ingredients: [],
      popular: false,
      image: ''
    });
    setModalVisible(true);
  };

  const handleEditItem = (item) => {
    setIsEditing(true);
    setSelectedItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      price: item.price.toString(),
      prepTime: item.prepTime.toString(),
      categoryId: item.categoryId,
      description: item.description,
      ingredients: item.ingredients,
      popular: item.popular,
      image: item.image || ''
    });
    setModalVisible(true);
  };

  const handleDeleteItem = async (item) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${item.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'menuItems', item.id));
              Alert.alert('Success', 'Item deleted successfully');
              fetchData(); // Refresh the list
            } catch (error) {
              console.error('Error deleting item: ', error);
              Alert.alert('Error', 'Failed to delete item');
            }
          }
        }
      ]
    );
  };

  const handleSaveItem = async () => {
    // Validate required fields
    if (!formData.name || !formData.price || !formData.categoryId) {
      Alert.alert('Error', 'Name, price, and category are required');
      return;
    }
    // Validate numeric values
    if (isNaN(Number(formData.price))) {
      Alert.alert('Error', 'Price must be a number');
      return;
    }
    if (formData.prepTime && isNaN(Number(formData.prepTime))) {
      Alert.alert('Error', 'Preparation time must be a number');
      return;
    }

    try {
      const itemData = {
        name: formData.name,
        price: Number(formData.price),
        prepTime: Number(formData.prepTime) || 0,
        categoryId: formData.categoryId,
        description: formData.description,
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
        popular: formData.popular,
        image: formData.image || null
      };

      if (isEditing && selectedItem) {
        // Update existing item
        await setDoc(doc(db, 'menuItems', selectedItem.id), itemData);
        Alert.alert('Success', 'Item updated successfully');
      } else {
        // Create new item with custom ID or auto-generated ID
        const itemId = formData.id.trim() ? formData.id.trim() : formData.name.toLowerCase().replace(/\s+/g, '-');
        await setDoc(doc(db, 'menuItems', itemId), {
          id: itemId,
          ...itemData
        });
        Alert.alert('Success', 'Item added successfully');
      }
      
      setModalVisible(false);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error saving item: ', error);
      Alert.alert('Error', 'Failed to save item');
    }
  };

  const handleIngredientsChange = (text) => {
    // Convert comma-separated string to array
    const ingredientsArray = text.split(',').map(item => item.trim());
    setFormData({ ...formData, ingredients: ingredientsArray });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>Price: ₹{item.price}</Text>
        <Text>Category: {getCategoryName(item.categoryId)}</Text>
        <Text numberOfLines={2}>{item.description}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => handleEditItem(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDeleteItem(item)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Modal for Add/Edit Item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
              </Text>
              
              <Text style={styles.inputLabel}>Item ID (lowercase-with-hyphens)</Text>
              <TextInput
                style={styles.input}
                value={formData.id}
                onChangeText={(text) => setFormData({...formData, id: text})}
                placeholder="item-id (optional, will be derived from name)"
                editable={!isEditing} // Can't change ID when editing
              />
              
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="Item Name"
              />
              
              <Text style={styles.inputLabel}>Price (₹)</Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) => setFormData({...formData, price: text})}
                placeholder="Price"
                keyboardType="numeric"
              />
              
              <Text style={styles.inputLabel}>Prep Time (minutes)</Text>
              <TextInput
                style={styles.input}
                value={formData.prepTime}
                onChangeText={(text) => setFormData({...formData, prepTime: text})}
                placeholder="Preparation Time"
                keyboardType="numeric"
              />
              
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.pickerContainer}>
                {categories.length > 0 ? (
                  <Picker
                    selectedValue={formData.categoryId}
                    onValueChange={(itemValue) =>
                      setFormData({ ...formData, categoryId: itemValue })
                    }
                    style={styles.picker}
                  >
                    {categories.map((category) => (
                      <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                  </Picker>
                ) : (
                  <Text style={{ color: 'red' }}>No categories available</Text>
                )}
              </View>
              
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({...formData, description: text})}
                placeholder="Description"
                multiline={true}
              />
              
              <Text style={styles.inputLabel}>Ingredients (comma-separated)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.ingredients.join(', ')}
                onChangeText={handleIngredientsChange}
                placeholder="Ingredient 1, Ingredient 2, ..."
                multiline={true}
              />
              
              <View style={styles.checkboxContainer}>
                <Text style={styles.inputLabel}>Popular Item</Text>
                <TouchableOpacity
                  style={[styles.checkbox, formData.popular && styles.checkboxChecked]}
                  onPress={() => setFormData({...formData, popular: !formData.popular})}
                >
                  {formData.popular && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveItem}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2c3e50',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemActions: {
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalScroll: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
});

export default AdminPanel;
