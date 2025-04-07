import { Stack } from "expo-router";
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Stack />
      </CartProvider>
    </FavoritesProvider>
  );
}
