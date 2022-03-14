import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
    // console.log(event);
  };

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate('NewPlace', {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocation });
  }, [savePickedLocation]);

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }
  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam('saveLocation');
  return {
    headerRight: () => {
      return (
        <TouchableNativeFeedback style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonSave}>Save</Text>
        </TouchableNativeFeedback>
      );
    },
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonSave: {
    fontSize: 16,
    color: 'white',
  },
});

export default MapScreen;
