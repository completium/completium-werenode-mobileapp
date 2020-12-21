import React, { memo, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Navigation } from "../types";
import { theme } from "../core/theme";
import { Text, StatusBar } from "react-native";

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
  <Background>
    <Logo />
    <Header><Text style={{ color: theme.colors.text }}>were</Text>node</Header>

    <Paragraph>
      Welcome, please login or register.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")} accessibilityStates>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate("RegisterScreen")}
      accessibilityStates
    >
      Sign Up
    </Button>
  </Background>);
};

export default memo(HomeScreen);
