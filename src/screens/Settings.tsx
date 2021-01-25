import React from 'react';
import { View, Image, StyleSheet } from "react-native";
import { Appbar, Text, List, Button } from "react-native-paper";
import Wbackground from "../components/Wbackground";
import { Currency, Navigation, Plug, PlugPricing, PlugType } from "../types";
import { useSelector, useDispatch } from 'react-redux';
import { selectSessionPlug } from '../store/sessionSlice';

import Geocoder from 'react-native-geocoding';
import { theme } from '../core/theme';

import RNPickerSelect from 'react-native-picker-select';
import { Entypo } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { mapStyle } from '../core/utils';
import { approve } from '../core/approve';

//Geocoder.init("AIzaSyCjfjQOKyPtKqrSfM0oKTlUqnFYoA4stQk");

import * as firebase from 'firebase'
import 'firebase/firestore';



type Props = {
  navigation: Navigation;
};

const imgSize = 50;
const scale = 0.6;
const labelSize = 18;

type LocProps = {
  plug : Plug
}

type SessionProps = {
  plug : Plug,
  duration: number
}

const Location = ({ plug } : LocProps) => {
  /* const [addr,setAddr] = React.useState({ city: '', address: '' });
  React.useEffect(() => {
    Geocoder.from(plug.x, plug.y)
		.then(json => {
      var number = json.results[0].address_components[0].short_name;
      var street = json.results[0].address_components[1].short_name;
      var city = json.results[0].address_components[2].short_name;
      setAddr({ city: city, address: number + ' ' + street });
		})
		.catch(error => console.warn(error));
  }) */
  return (
    <MapView
    initialRegion={{
      latitude: Number(plug.x),
      longitude: Number(plug.y),
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    }}
    style={{
      height: 100,
    }}
    customMapStyle={mapStyle}
  >
    <Marker
      coordinate={{ latitude : Number(plug.x) , longitude : Number(plug.y) }}
      /* image={require('../assets/room_primary.png')} */
    />
    </MapView>
     /*  <List.Item
        title={addr.city}
        description={addr.address}
        left={props => <Image {...props} style={{ width: imgSize, height: imgSize, transform: [{scale : scale}]}} source={require('../assets/room_white.png')} />}
      /> */
  )
}

function plugTypeToString(pt: PlugType) {
  switch (pt) {
    case PlugType.Type2: return 'Type 2';
    case PlugType.Unknown: return 'Unknown';
  }
}

const PlugPower = ({ plug } : LocProps) => {
  const title = plug.power+' kWh';
  return (
    <List.Item
        title={<Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: labelSize }} accessibilityStates>{title}</Text>}
        description={plugTypeToString(plug.plugtype)}
        left={props => <Image {...props} style={{ width: imgSize, height: imgSize, transform: [{scale : scale}]}} source={require('../assets/power_white.png')} />}
        accessibilityStates
      />
  )
}

function currencyToString(c: Currency) {
  switch(c) {
    case Currency.Dollar: return '$';
    case Currency.Euro: return '€';
    case Currency.Tez: return '€';
    case Currency.WRC: return 'WRC';
    default: return 'Unknown';
  }
}

function pricingToString(pp: PlugPricing) {
  switch(pp) {
    case PlugPricing.PerMinute: return 'Per minute';
    case PlugPricing.Unknown: return 'Unknown';
    default: return 'Unknown';
  }
}

function getPrice(p: number, d: number) {
  return p / 10 ** d
}

function getkWPrice(p: number, d: number, pw: number) {
  return (getPrice(p, d) * 60 / pw).toFixed(2)
}

const BasicPlugPrice = ({ plug } : LocProps) => {
  var title = getPrice(plug.price, plug.decimal)+' '+currencyToString(plug.currency);
  return (
    <List.Item
        title={<Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: labelSize }} accessibilityStates>{title}</Text>}
        description={pricingToString(plug.pricing)}
        left={props => <Image {...props} style={{ width: imgSize, height: imgSize, transform: [{scale : scale}]}} source={require('../assets/offer_white.png')} />}
        accessibilityStates
      />
  )
}

const PerKWPlugPrice = ({ plug } : LocProps) => {
  var title = getkWPrice(plug.price, plug.decimal,plug.power)+' '+currencyToString(plug.currency);
  return (
    <List.Item
        title={title}
        description={'Per kW'} accessibilityStates
      />
  )
}

const PlugPrice = ({ plug } : LocProps) => {
  var title = getPrice(plug.price, plug.decimal)+' '+currencyToString(plug.currency);
  return (
    <View style={{
      flexDirection: 'row'
    }}>
      <View style={{ width: '55%',}}>
        <BasicPlugPrice plug={plug}></BasicPlugPrice>
      </View>
      <View style={{ width: '45%', }}>
        <PerKWPlugPrice plug={plug}></PerKWPlugPrice>
      </View>
    </View>

  )
}

function getTotalSessionPrice(p: number, d: number, duration: number) {
  return (getPrice(p, d) * duration).toFixed(2);
}

const TotalSessionPrice = ({ plug, duration } : SessionProps) => {
  var totalprice = getTotalSessionPrice(plug.price, plug.decimal, duration);
  var title = (+totalprice>0?totalprice:'--'+' ')+currencyToString(plug.currency);
  return (
    <List.Item
        title={<Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: labelSize }} accessibilityStates>{title}</Text>}
        description={"Session cost"}
        left={props => <Image {...props} style={{ width: imgSize, height: imgSize, transform: [{scale : scale}]}} source={require('../assets/functions_white.png')} />}
        accessibilityStates
      />
  )
}

function getTotalkW(power: number, duration) {
  return (power / 60 * duration).toFixed(2)
}

const TotalkW = ({ plug, duration } : SessionProps) => {
  var totalkW = getTotalkW(plug.power, duration);
  var title = (+totalkW>0?totalkW:'--')+' kW';
  return (
    <List.Item
        title={title}
        description={'Estimated energy'}
        accessibilityStates
      />
  )
}

const SessionPrice = ({ plug, duration } : SessionProps) => {
  return (
    <View style={{
      flexDirection: 'row',
      position: 'absolute',
      bottom: 120,
      left: 20
    }}>
      <View style={{ width: '55%',}}>
        <TotalSessionPrice plug={plug} duration={duration}></TotalSessionPrice>
      </View>
      <View style={{ width: '45%', }}>
        <TotalkW plug={plug} duration={duration}></TotalkW>
      </View>
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 70,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    color: theme.colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: 70,
    paddingHorizontal: 70,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    color: theme.colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    backgroundColor: theme.colors.surface
  },
  viewContainer: {
    backgroundColor: 'red'
  }
});

const Settings = ({ navigation }: Props) => {
  const [duration, setDuration] = React.useState(0)
  const _handleMore = () => navigation.navigate("Whome");
  const plug = useSelector(selectSessionPlug);
  async function handleStart() {
    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('crypto').doc(user.email).get().then(doc => {
        const privateKey = doc.get(new firebase.firestore.FieldPath('private'));
        const address    = doc.get(new firebase.firestore.FieldPath('publicHash'));
        const publicKey  = doc.get(new firebase.firestore.FieldPath('publicKey'));
        fetch('https://evesemanager.com:5010/EvseSession/startnosig', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "evseId": "WNCooL",
            "currency": "WRC",
            "userPrivateKey": "edsk2tst6HHUSo4S6mutA16sDBrRL9La5NCtbSxKJMCeDZ6hJaHMGQ",
            "parkingTime": "60",
            "userAddress": "tz1ZXf37ZNfVupt5GVyrPJ76q8kbjFuD2z7R",
            "userPubkey": "edpktvuBLrhcgsZ8GhHPhNYSk1mLmEAwNnzp4ZaJ3L5dnu1AdewEcY",
            "nbTokens": "100"
          }),
        }).then (res => {
          res.json().then(res => {
            console.log(res)
          })
        }).catch(e => {
          console.error(e);
        })
      })
    } );

    var res = await approve();
    console.log(res);
    navigation.navigate('Charging');
  }
  return (
    <Wbackground>
      <Appbar.Header accessibilityStates style={{ width: '100%' }}>
      <Appbar.Action icon="keyboard-backspace" onPress={_handleMore} style={{ position: 'absolute' }} accessibilityStates/>
      <Appbar.Content title="Settings" style={{ alignItems: 'center' }} accessibilityStates></Appbar.Content>
      </Appbar.Header>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}>
          <Location plug={plug}/>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            padding: 20
          }}>
          <PlugPower plug={plug}/>
          <PlugPrice plug={plug}/>
          <View style={{ paddingTop: 16, paddingBottom: 16 }}>
            <RNPickerSelect
              placeholder={{ label: 'Select charging duration ...', value: 0, color: theme.colors.primary}}
              onValueChange={(value) => setDuration(value)}
              items={[
                  { label: '5 minutes', value: '5' },
                  { label: '10 minutes', value: '10' },
                  { label: '30 minutes', value: '30' },
                  { label: '45 minutes', value: '45' },
                  { label: '1 hour', value: '60' },
                  { label: '1 hour 30 minutes', value: '90' },
                  { label: '2 hours', value: '120' },
                  { label: '3 hours', value: '180' },
                  { label: '4 hours', value: '240' },
                  { label: '6 hours', value: '360' },
                  { label: '10 hours', value: '600' },
                  { label: '12 hours', value: '720' },
              ]}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 24,
                  left: 23,
                },
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Entypo name="time-slot" size={24} color="white" />;
              }}
            />
        </View>
        <SessionPrice plug={plug} duration={duration} />
        <Button style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          width: '100%' }}
          contentStyle={{
            height: 60
          }}
          disabled={duration === 0}
          mode="contained" onPress={handleStart} accessibilityStates>
          start session
        </Button>
        </View>
      </View>
    </Wbackground>
  )
}

export default Settings;