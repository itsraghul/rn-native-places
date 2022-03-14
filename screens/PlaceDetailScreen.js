import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

const PlaceDetailScreen = (props) => {
  return (
    <View>
      <StatusBar style="auto" />
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam(['placeTitle']),
  };
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
