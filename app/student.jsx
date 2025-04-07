// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function StudentLogin() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (email === 'student@example.com' && password === 'student123') {
//       Alert.alert('Login Successful', 'Welcome Student!');
//       router.push('/studentDashboard');
//     } else {
//       Alert.alert('Login Failed', 'Invalid credentials, please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <Text style={styles.title}>Student Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Student Email"
//         placeholderTextColor="#aaa"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#aaa"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <LinearGradient colors={['#FF8C00', '#FF6200']} style={styles.gradientButton}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </LinearGradient>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('/')}>
//         <Text style={styles.backLink}>Back to Home</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = {
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1E1E1E',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     color: '#000',
//     fontSize: 16,
//   },
//   loginButton: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   gradientButton: {
//     padding: 15,
//     width: '100%',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   backLink: {
//     marginTop: 15,
//     color: '#FFA500',
//     fontSize: 16,
//   },
// };
// app/student.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // adjust the path if needed

// You can import or define your styles object
import styles from './styles';

export default function StudentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Login Successful', 'Welcome Student!');
        // The onAuthStateChanged listener in index.jsx will detect the change and redirect to HomeScreen.
        router.push('/studentDashboard'); // Optionally navigate to a student-specific dashboard.
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Student Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Student Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <LinearGradient colors={['#FF8C00', '#FF6200']} style={styles.gradientButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.backLink}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
