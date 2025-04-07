// app/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OrderTrackingScreen from './OrderTrackingScreen';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import styles from './styles';
import { menuCategories, menuItems as localMenuItems } from './menu';
import { CartProvider, useCart } from './CartContext';

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <CartProvider>
      <HomeScreen onLogout={() => {
        signOut(auth).catch((error) => Alert.alert('Sign Out Error', error.message));
      }} />
    </CartProvider>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Login Successful', 'Welcome to E-Canteen!');
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      });
  };

  return (
    <View style={styles.loginContainer}>
      <StatusBar style="light" />
      <View style={styles.loginBackground} />
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="food-fork-drink" size={50} color="#FF6200" />
        </View>
        <Text style={styles.appTitle}>E-Canteen</Text>
        <Text style={styles.appSubtitle}>Campus food, simplified</Text>
      </View>
      <TextInput
        style={[styles.input, { marginTop: 20 }]}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { marginTop: 10 }]}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.loginButtonsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={['#FF8C00', '#FF6200']}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeScreen({ onLogout }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { addToCart, removeFromCart, cartItems } = useCart();

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Use local data instead of fetching from Firestore
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);

  useEffect(() => {
    // Load the local data immediately
    setCategories(menuCategories);
    setMenuItems(localMenuItems);
    setLoadingMenu(false);
  }, []);

  // Compute popular items and quick bites based on menuItems
  const popularItems = menuItems
    .filter(item => item.popular)
    .map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      formattedPrice: `₹${item.price}`,
      image: item.image || 'https://via.placeholder.com/150',
      rating: item.rating || 4.5,
      prepTime: `${item.prepTime} min`
    }));

  const quickBites = menuItems
    .filter(item => item.price <= 50)
    .slice(0, 4)
    .map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      formattedPrice: `₹${item.price}`,
      image: item.image || 'https://via.placeholder.com/150'
    }));

  // Helper function for category icons (static for now)
  function getCategoryIcon(categoryId) {
    const iconMap = {
      'dosa': 'food-variant',
      'breakfast': 'coffee-outline',
      'juices': 'cup-water',
      'milkshakes': 'cup',
      'veg-chinese': 'noodles',
    };
    return iconMap[categoryId] || 'food';
  }

  const mappedCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    icon: getCategoryIcon(category.id),
  }));

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 0],
  });
  const mainTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });
  const overlayOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  const toggleMenu = () => {
    const toValue = menuOpen ? 0 : 1;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {menuOpen && (
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity }]}
          onTouchStart={toggleMenu}
        />
      )}

      {/* Side Drawer Menu */}
      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
        <View style={styles.menuHeader}>
          <View style={styles.menuProfileImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.menuProfileImage}
            />
            <View style={styles.onlineBadge} />
          </View>
          <Text style={styles.menuHeaderName}>John Doe</Text>
          <Text style={styles.menuHeaderEmail}>john.doe@institute.edu</Text>
        </View>
        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/')}>
            <MaterialCommunityIcons name="home-outline" size={20} color="#555" />
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              router.push('/MenuScreen');
            }}
          >
            <MaterialCommunityIcons name="food-outline" size={20} color="#555" />
            <Text style={styles.menuItemText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/orders')}
          >
            <MaterialCommunityIcons name="archive-outline" size={20} color="#555" />
            <Text style={styles.menuItemText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/favorites')}
          >
            <MaterialCommunityIcons name="heart-outline" size={20} color="#555" />
            <Text style={styles.menuItemText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile')}
          >
            <MaterialCommunityIcons name="account-outline" size={20} color="#555" />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings')}
          >
            <MaterialCommunityIcons name="cog-outline" size={20} color="#555" />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/help')}
          >
            <MaterialCommunityIcons name="help-circle-outline" size={20} color="#555" />
            <Text style={styles.menuItemText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={onLogout}>
          <MaterialCommunityIcons name="logout" size={16} color="#FF6200" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content */}
      <Animated.View style={[styles.mainContent, { transform: [{ translateX: mainTranslateX }] }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <MaterialCommunityIcons name="menu" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#FF6200" />
            <Text style={styles.locationText}>Main Campus</Text>
            <MaterialCommunityIcons name="chevron-down" size={16} color="#777" />
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push('CartScreen')}
          >
            <MaterialCommunityIcons name="cart-outline" size={24} color="#333" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <MaterialCommunityIcons name="magnify" size={18} color="#777" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for dishes, canteens..."
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <MaterialCommunityIcons name="tune-vertical" size={18} color="#FF6200" />
            </TouchableOpacity>
          </View>

          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <Image
              source={require('../assets/images/header.jpg')}
              style={styles.bannerImage}
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerText}>
                Campus food, delivered right to your class
              </Text>
              <TouchableOpacity style={styles.orderNowButton} onPress={() => router.push('/MenuScreen')}>
                <Text style={styles.orderNowText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Categories Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <FlatList
              horizontal
              data={mappedCategories}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.categoryItem}
                  onPress={() => router.push({
                    pathname: '/MenuScreen',
                    params: { categoryId: item.id }
                  })}
                >
                  <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons name={item.icon} size={20} color="#FF6200" />
                  </View>
                  <Text style={styles.categoryName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          {/* Popular Items Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Items</Text>
              <TouchableOpacity onPress={() => router.push('/MenuScreen')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={popularItems}
              renderItem={({ item }) => (
                <View style={styles.foodItem}>
                  <Image 
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                    style={styles.foodImage} 
                    defaultSource={require('../assets/images/cheese-dosa.jpg')}
                  />
                  <View style={styles.foodContent}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <View style={styles.foodMeta}>
                      <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                      <Text style={styles.prepTime}>{item.prepTime}</Text>
                    </View>
                    <View style={styles.foodPriceRow}>
                      <Text style={styles.foodPrice}>{item.formattedPrice}</Text>
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
                          onPress={() => {
                            const completeItem = {
                              ...item,
                              formattedPrice: `₹${item.price}`,
                              image: typeof item.image === 'string' ? { uri: item.image } : item.image
                            };
                            addToCart(completeItem);
                          }}
                        >
                          <MaterialCommunityIcons name="plus" size={14} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.foodItemsList}
            />
          </View>

          {/* Quick Bites Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Bites</Text>
              <TouchableOpacity onPress={() => router.push('/MenuScreen')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.quickBitesGrid}>
              {quickBites.map((item) => (
                <View 
                  key={item.id} 
                  style={styles.quickBiteItem}
                >
                  <Image 
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                    style={styles.quickBiteImage} 
                    defaultSource={require('../assets/images/cheese-dosa.jpg')}
                  />
                  <Text style={styles.quickBiteName}>{item.name}</Text>
                  <View style={styles.quickBitePriceRow}>
                    <Text style={styles.quickBitePrice}>{item.formattedPrice}</Text>
                    <View style={styles.quantityControlsSmall}>
                      {getItemQuantity(item.id) > 0 && (
                        <>
                          <TouchableOpacity
                            style={styles.quantityButtonSmall}
                            onPress={() => removeFromCart(item)}
                          >
                            <MaterialCommunityIcons name="minus" size={12} color="#FF6200" />
                          </TouchableOpacity>
                          <Text style={styles.quantityTextSmall}>{getItemQuantity(item.id)}</Text>
                        </>
                      )}
                      <TouchableOpacity
                        style={styles.miniAddButton}
                        onPress={() => {
                          const completeItem = {
                            ...item,
                            formattedPrice: `₹${item.price}`,
                            image: typeof item.image === 'string' ? { uri: item.image } : item.image
                          };
                          addToCart(completeItem);
                        }}
                      >
                        <MaterialCommunityIcons name="plus" size={12} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.push('/')}>
            <MaterialCommunityIcons name="home" size={20} color="#FF6200" />
            <Text style={[styles.bottomNavText, styles.bottomNavActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.push('/search')}>
            <MaterialCommunityIcons name="magnify" size={20} color="#777" />
            <Text style={styles.bottomNavText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderFloatingButton}
            onPress={() => router.push('/orders')}
          >
            <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.push('/orders')}>
            <MaterialCommunityIcons name="archive-outline" size={20} color="#777" />
            <Text style={styles.bottomNavText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem} onPress={() => router.push('/profile')}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#777" />
            <Text style={styles.bottomNavText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}



