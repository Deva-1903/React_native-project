import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import AuthNavigation from "./AuthNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
