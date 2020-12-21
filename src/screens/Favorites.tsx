import React from 'react';
import Wbackground from "../components/Wbackground";
import { Appbar, Divider, List } from "react-native-paper";
import { Navigation, ModalType } from "../types";
import { View, StyleSheet } from "react-native";
import { theme } from '../core/theme';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites } from '../store/favoritesSlice';
import { setPlug } from '../store/sessionSlice';
import { inverseVisible, setModalType } from '../store/modalSlice';
import LoadingModal from '../components/LoadingModal';
import { getPlug } from '../core/plug';

type Props = {
  navigation: Navigation;
};

type Favprops = {
  plug : {key : string, name: string},
  navigation: Navigation
}

function upper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Favorite = ({ plug, navigation } : Favprops) => {
  const dispatch = useDispatch();
  async function handleFav() {
    dispatch(setModalType(ModalType.LoadingPlug));
    dispatch(inverseVisible());
    var plugdata : any = await getPlug(plug.key);
    dispatch(setPlug(plugdata.data));
    dispatch(inverseVisible());
    navigation.navigate("Settings");
  }
  return (
    <List.Item
    style={styles.item}
    title={upper(plug.name)}
    description={'#'+plug.key}
    left={props => <List.Icon {...props} icon="star" />}
    right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary}/>}
    onPress={handleFav} accessibilityStates
  />
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.surface,
    paddingBottom: 5
  }
})

const Favorites = ({ navigation }: Props) => {
  const favorites = useSelector(selectFavorites);
  const _handleMore = () => navigation.navigate("Whome");
  return (
    <Wbackground>
      <LoadingModal />
      <Appbar.Header accessibilityStates style={{ width: '100%' }}>
        <Appbar.Action icon="keyboard-backspace" onPress={_handleMore} style={{ position: 'absolute' }} accessibilityStates/>
        <Appbar.Content title="Favorites" style={{ alignItems: 'center' }} accessibilityStates></Appbar.Content>
      </Appbar.Header>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%'
      }}>
        { favorites.map(favorite =>
            <View>
              <Favorite plug={favorite} navigation={navigation}></Favorite>
              <Divider style={{ backgroundColor: theme.colors.disabled }} accessibilityStates/>
            </View>
        )}
      </View>
    </Wbackground>);
}

export default Favorites