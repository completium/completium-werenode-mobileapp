import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const img = require('../assets/logo.png');

const Logo = () => (
  <Image source={img} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Logo);
