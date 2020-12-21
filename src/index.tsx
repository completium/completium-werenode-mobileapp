import { StatusBar } from 'react-native';
import { createAppContainer } from "react-navigation";
import { CardStyleInterpolators, createStackNavigator } from "react-navigation-stack";

StatusBar.setBarStyle('light-content');

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  Dashboard,
  Whome,
  Qrscan,
  Favorites,
  Settings,
} from "./screens";

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    AuthLoadingScreen,
    Whome,
    Qrscan,
    Favorites,
    Settings,
  },
  {
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  }
);

export default createAppContainer(Router);
