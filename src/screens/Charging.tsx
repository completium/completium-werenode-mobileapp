
import React from 'react';
import { View, Image, StyleSheet } from "react-native";
import { Appbar, Text, List, Button } from "react-native-paper";
import Wbackground from "../components/Wbackground";
import ProgressCircle from 'react-native-progress-circle'

import { theme } from '../core/theme';

const imgSize = 50;
const scale = 0.6;
const labelSize = 18;

const TimeLeft = () => {
  return (
    <List.Item
        title={<Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: labelSize }} accessibilityStates>{0}</Text>}
        description={"Time left"}
        left={props => <Image {...props} style={{ width: imgSize, height: imgSize, transform: [{scale : scale}]}} source={require('../assets/timer_white.png')} />}
        accessibilityStates
      />
  )
}

const DeliveredkW = () => {
  return (
    <List.Item
        title={<Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: labelSize }} accessibilityStates>{0}</Text>}
        description={'Estimated delivered kW'}
        left={props => <Image {...props} style={{ width: imgSize, height: imgSize, transform: [{scale : scale}]}} source={require('../assets/flash_white.png')} />}
        accessibilityStates
      />
  )
}

const SessionStats = () => {
  return (
    <View style={{
      flexDirection: 'row',
      left: 20
    }}>
      <View style={{ width: '50%',}}>
        <TimeLeft></TimeLeft>
      </View>
      <View style={{ width: '45%', }}>
        <DeliveredkW></DeliveredkW>
      </View>
    </View>
  )
}

const Charging = () => {
  const [percent,setPercent] = React.useState(0);
  return (
  <Wbackground>
    <Appbar.Header accessibilityStates style={{ width: '100%' }}>
    <Appbar.Content title="Charging" style={{ alignItems: 'center' }} accessibilityStates></Appbar.Content>
    </Appbar.Header>
    <View style={{
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <ProgressCircle
            percent={30}
            radius={120}
            borderWidth={16}
            color={theme.colors.primary}
            shadowColor='#2d3740'
            bgColor={theme.colors.surface}
        >
            <Text style={{ fontSize: 24, color: theme.colors.primary, fontWeight: 'bold' }}>{'30%'}</Text>
        </ProgressCircle>
        <SessionStats></SessionStats>
        <Button style={{
          position: 'absolute',
          bottom: 26
        }}>Stop charging</Button>
    </View>
  </Wbackground>
  )
}

export default Charging