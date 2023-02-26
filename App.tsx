import * as React from "react";
import * as Linking from "expo-linking";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./app/navigators";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

if (__DEV__) {
  import("react-query-native-devtools").then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

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
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppNavigator linking={linking} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
