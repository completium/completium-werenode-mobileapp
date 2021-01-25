import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, Button } from "react-native-paper";
import { ModalType, Navigation, Plug } from "../types";
import LoadingModal from '../components/LoadingModal';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { inverseVisible, setModalType } from '../store/modalSlice';
import { getPlug } from '../core/plug';
import { setPlug } from '../store/sessionSlice';

type Props = {
  navigation: Navigation;
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },
});

function Qrscan({ navigation } : Props) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    dispatch(setModalType(ModalType.LoadingPlug));
    dispatch(inverseVisible());
    const plugdata : any = await getPlug(data);
    if (plugdata.loaded) {
      dispatch(setPlug(plugdata.data));
      dispatch(inverseVisible());
      navigation.replace('Whome');
      navigation.navigate("Settings");
    } else {
      dispatch(setModalType(ModalType.PlugNotFound));
    }
  };

  if (hasPermission === null) {
    return <Text accessibilityStates>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text accessibilityStates>No access to camera</Text>;
  }
  const _handleMore = () => navigation.navigate("Whome");
  return (
    <View style={styles.container}>
      <Appbar.Header accessibilityStates style={{ width: '100%' }}>
        <Appbar.Action icon="keyboard-backspace" onPress={_handleMore} style={{ position: 'absolute' }} accessibilityStates/>
        <Appbar.Content title="Scan plug Id" style={{ alignItems: 'center' }} accessibilityStates></Appbar.Content>
      </Appbar.Header>
      <LoadingModal/>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}
        ratio='16:9'
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom}>
          <Text style={{
            flex:1,
            textAlign: 'center',
            paddingTop: 20,
            fontSize: 16 }}
            accessibilityStates
          >Place the QR code within the square</Text>
        </View>
      </Camera>
    </View>
  )
}

export default Qrscan