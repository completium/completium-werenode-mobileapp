import React, { memo, useEffect } from "react";
import Wbackground from "../components/Wbackground";
import Paragraph from "../components/Paragraph";
import SurfaceButton from "../components/SurfaceButton";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import Button from "../components/Button";
import { Navigation, HomeButtonImg } from "../types";
import { logoutUser } from "../api/auth-api";

const Whome = () => {
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
          <SurfaceButton btn={HomeButtonImg.Scan} txt="Scan plug id"/>
          <SurfaceButton btn={HomeButtonImg.Favorite} txt="Favorites"/>
        </View>
        <View style={{ height: '5%' }}></View>
        <Paragraph>Or access your crypto wallet</Paragraph>
        <View style={{ height: '5%' }}></View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
         <SurfaceButton btn={HomeButtonImg.Wallet} txt="Wallet"/>
        </View>
      </View>
      <Button mode="outlined" onPress={() => logoutUser()}>
        Logout
      </Button>
    </Wbackground>
  )
}

export default memo(Whome);