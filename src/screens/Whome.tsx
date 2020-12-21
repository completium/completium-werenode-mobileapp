import React, { memo, useEffect } from "react";
import Wbackground from "../components/Wbackground";
import Paragraph from "../components/Paragraph";
import SurfaceButton from "../components/SurfaceButton";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import Button from "../components/Button";
import { Navigation, HomeButtonImg } from "../types";
import { logoutUser } from "../api/auth-api";

type Props = {
  navigation: Navigation;
};

const Whome = ({ navigation }: Props) => {
  const _handleMore = () => console.log('Shown more');
  return (
    <Wbackground>
      <Appbar.Header accessibilityStates style={{ width: '100%' }}>
        <Appbar.Action icon="dots-horizontal" onPress={_handleMore} style={{ position: 'absolute' }} accessibilityStates/>
        <Appbar.Content title="Werenode" style={{ alignItems: 'center' }} accessibilityStates></Appbar.Content>
      </Appbar.Header>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%'
      }}>
        <View style={{ height: '15%' }}></View>
        <Paragraph>Select a plug to start a charging session</Paragraph>
        <View style={{ height: '5%' }}></View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
          <SurfaceButton btn={HomeButtonImg.Scan} txt="Scan plug id" navigation={navigation} to="Qrscan"/>
          <SurfaceButton btn={HomeButtonImg.Favorite} txt="Favorites" navigation={navigation} to="Favorites"/>
        </View>
        <View style={{ height: '5%' }}></View>
        <Paragraph>Or access your crypto wallet</Paragraph>
        <View style={{ height: '5%' }}></View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
         <SurfaceButton btn={HomeButtonImg.Wallet} navigation={navigation} to="" txt="Wallet"/>
        </View>
      </View>
      <Button mode="outlined" onPress={() => logoutUser()} accessibilityStates>
        Logout
      </Button>
    </Wbackground>
  )
}

export default memo(Whome);