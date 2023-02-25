import * as React from "react";
import * as Linking from "expo-linking";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./app/Navigators";

// Web linking configuration
const prefix = Linking.createURL("/");
const config = {
  screens: {
    Login: {
      path: "",
    },
    Home: "home",
    Detail: "detail",
  },
};

const App = () => {
  const linking = {
    prefixes: [prefix],
    config,
  };

  return (
    <SafeAreaProvider>
      <AppNavigator linking={linking} />
    </SafeAreaProvider>
  );
};

export default App;
