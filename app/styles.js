import { StyleSheet } from 'react-native';

import { Platform, StatusBar } from 'react-native';
export default StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fefefe',
},
loginContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  backgroundColor: '#fefefe',
},
loginBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '40%',
  backgroundColor: '#fafafa',
},
logoContainer: {
  alignItems: 'center',
  marginBottom: 60,
},
logoCircle: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},
appTitle: {
  fontSize: 28,
  fontWeight: '600',
  color: '#333',
  marginBottom: 4,
},
appSubtitle: {
  fontSize: 14,
  color: '#777',
  textAlign: 'center',
},
loginButtonsContainer: {
  width: '100%',
  alignItems: 'center',
},
loginButton: {
  width: '90%',
  borderRadius: 8,
  marginBottom: 12,
  overflow: 'hidden',
},
gradientButton: {
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
},
loginButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
adminLoginButton: {
  marginTop: 10,
},
adminLoginText: {
  color: '#555',
  fontSize: 14,
},
overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 1,
},
menu: {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 250,
  backgroundColor: '#fff',
  zIndex: 2,
  paddingTop: StatusBar.currentHeight || 40,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
},
menuHeader: {
  alignItems: 'center',
  paddingVertical: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
menuProfileImageContainer: {
  marginBottom: 10,
},
menuProfileImage: {
  width: 60,
  height: 60,
  borderRadius: 30,
},
onlineBadge: {
  position: 'absolute',
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#4CAF50',
  borderWidth: 1,
  borderColor: '#fff',
  right: 0,
  bottom: 0,
},
menuHeaderName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
menuHeaderEmail: {
  fontSize: 12,
  color: '#777',
},
menuItems: {
  paddingTop: 10,
},
menuItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 20,
},
menuItemText: {
  marginLeft: 12,
  fontSize: 14,
  color: '#333',
},
signOutButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  borderTopWidth: 1,
  borderTopColor: '#eee',
  marginHorizontal: 20,
  marginBottom: 20,
},
signOutText: {
  color: '#FF6200',
  fontSize: 14,
  marginLeft: 8,
},
mainContent: {
  flex: 1,
  backgroundColor: '#fefefe',
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  paddingTop: StatusBar.currentHeight || 40,
  paddingBottom: 10,
  paddingHorizontal: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
menuButton: {
  padding: 8,
},
locationContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
locationText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
  marginHorizontal: 4,
},
cartButton: {
  padding: 8,
  position: 'relative',
},
cartBadge: {
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: '#FF6200',
  width: 16,
  height: 16,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
},
cartBadgeText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: '600',
},
scrollContent: {
  flex: 1,
  paddingHorizontal: 15,
},
searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15,
},
searchBar: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginRight: 8,
},
searchInput: {
  flex: 1,
  fontSize: 14,
  marginLeft: 8,
  color: '#333',
},
filterButton: {
  backgroundColor: '#fff',
  width: 40,
  height: 40,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#eee',
},
heroBanner: {
  position: 'relative',
  height: 160,
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 20,
},
bannerImage: {
  width: '100%',
  height: '100%',
},
bannerOverlay: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 12,
  backgroundColor: 'rgba(0,0,0,0.3)',
},
bannerText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 8,
},
orderNowButton: {
  backgroundColor: '#FF6200',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 6,
  alignSelf: 'flex-start',
},
orderNowText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
},
sectionContainer: {
  backgroundColor: '#fff',
  padding: 15,
  marginBottom: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#eee',
},
sectionHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
},
sectionTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
seeAllText: {
  color: '#FF6200',
  fontSize: 12,
  fontWeight: '600',
},
categoriesList: {
  paddingRight: 10,
},
categoryItem: {
  alignItems: 'center',
  marginRight: 20,
  width: 60,
},
categoryIcon: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#f2f2f2',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 6,
},
categoryName: {
  fontSize: 12,
  color: '#333',
  textAlign: 'center',
},
foodItemsList: {
  paddingRight: 10,
},
foodItem: {
  width: 160,
  marginRight: 12,
  backgroundColor: '#fff',
  borderRadius: 8,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#eee',
},
foodImage: {
  width: '100%',
  height: 100,
},
foodContent: {
  padding: 10,
},
foodName: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
  marginBottom: 4,
},
foodMeta: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},
ratingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 8,
},
ratingText: {
  fontSize: 12,
  color: '#555',
  marginLeft: 4,
},
prepTime: {
  fontSize: 12,
  color: '#555',
},
foodPriceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
quantityControls: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f8f8f8',
  borderRadius: 12,
  padding: 2
},
quantityControlsSmall: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f8f8f8',
  borderRadius: 10,
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
quantityButtonSmall: {
  width: 20,
  height: 20,
  borderRadius: 10,
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
quantityTextSmall: {
  fontSize: 12,
  fontWeight: '500',
  color: '#333',
  marginHorizontal: 6
},
foodPrice: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
},
addButton: {
  backgroundColor: '#FF6200',
  width: 24,
  height: 24,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
},
specialCard: {
  backgroundColor: '#fff',
  borderRadius: 8,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#eee',
},
specialImage: {
  width: '100%',
  height: 140,
},
specialGradient: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50%',
  backgroundColor: 'rgba(0,0,0,0.4)',
},
specialBadge: {
  position: 'absolute',
  top: 10,
  left: 10,
  backgroundColor: '#FF6200',
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 4,
},
specialBadgeText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: '600',
},
specialContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 12,
},
specialTitle: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
},
specialDescription: {
  fontSize: 12,
  color: '#777',
  marginVertical: 4,
},
specialPriceRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
specialPrice: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
},
specialOldPrice: {
  fontSize: 12,
  color: '#999',
  marginLeft: 6,
  textDecorationLine: 'line-through',
},
orderButton: {
  backgroundColor: '#FF6200',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
},
orderButtonText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
},
quickBitesGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},
quickBiteItem: {
  width: '48%',
  backgroundColor: '#fff',
  borderRadius: 8,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#eee',
  marginBottom: 12,
},
quickBiteImage: {
  width: '100%',
  height: 80,
},
quickBiteName: {
  fontSize: 12,
  fontWeight: '600',
  color: '#333',
  margin: 8,
},
quickBitePriceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 8,
  paddingBottom: 8,
},
quickBitePrice: {
  fontSize: 12,
  fontWeight: '600',
  color: '#333',
},
miniAddButton: {
  backgroundColor: '#FF6200',
  width: 20,
  height: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
},
bottomNav: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderTopColor: '#eee',
  backgroundColor: '#fff',
},
bottomNavItem: {
  alignItems: 'center',
},
bottomNavText: {
  fontSize: 10,
  color: '#555',
  marginTop: 2,
},
bottomNavActive: {
  color: '#FF6200',
},
orderFloatingButton: {
  backgroundColor: '#FF6200',
  width: 50,
  height: 50,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -30,
},
loginSelectionContainer: {
  flex: 1,
  backgroundColor: '#FF6200',
  justifyContent: 'center',
  alignItems: 'center',
},
loginSelectionTitle: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 40,
},
selectionButton: {
  width: '80%',
  marginVertical: 10,
},
gradientButton: {
  padding: 15,
  borderRadius: 25,
  alignItems: 'center',
},
selectionButtonText: {
  color: '#fff',
  fontSize: 16,
},
loginFormContainer: {
  flex: 1,
  backgroundColor: '#FF6200',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
},
loginFormTitle: {
  fontSize: 26,
  color: '#fff',
  marginBottom: 30,
  fontWeight: 'bold',
},
inputField: {
  width: '100%',
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 25,
  marginVertical: 10,
},
loginButton: {
  width: '100%',
  marginTop: 20,
},
backButton: {
  marginTop: 15,
},
backButtonText: {
  color: '#fff',
  fontSize: 16,
},
loginButtonText: {
  color: '#fff',
  fontSize: 16,
},
});