import React from 'react'
import { Modal, Portal, Text, ActivityIndicator } from 'react-native-paper';
import { Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../core/theme';
import { selectModalType, selectVisible, inverseVisible } from '../store/modalSlice';
import { ModalType } from '../types';

const LoadingModal = () => {
  const dispatch = useDispatch();
  const containerStyle = {
    backgroundColor: theme.colors.surface,
    padding: 20,
    height: 150,
    flexDirection: 'column',
    alignItems: 'center'
  };
  const visible = useSelector(selectVisible);
  const modalType = useSelector(selectModalType);
  const hideModal = () => {
    dispatch(inverseVisible());
  }
  switch (modalType) {
    case ModalType.LoadingPlug:
      return (
        <Portal>
          <Modal visible={visible} dismissable={false} contentContainerStyle={containerStyle}>
            <Text style={{
              fontSize: 16,
              textAlign: 'center',
              paddingBottom: 20
            }} accessibilityStates>Reading plug data on blockchain...</Text>
            <ActivityIndicator animating={true} color={theme.colors.primary} accessibilityStates/>
          </Modal>
        </Portal>);
    case ModalType.PlugNotFound:
      return (
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} dismissable={true} contentContainerStyle={containerStyle}>
            <Text style={{
              fontSize: 16,
              textAlign: 'center',
              paddingBottom: 20,
            }} accessibilityStates>Plug id not found</Text>
            <Image source={require('../assets/streamline-icon-alert-circle.png')}></Image>
          </Modal>
        </Portal>);
    default: return (<Portal><Modal visible={visible}>Unknown</Modal></Portal>);
  }
}

export default LoadingModal;