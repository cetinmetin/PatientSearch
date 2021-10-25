import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-paper'
import { MainScreen } from './src/app/containers'
import store from './src/app/redux/store'
import { Provider } from 'react-redux'
import { theme } from './src/app/core/theme'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <MainScreen />
        </View>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
