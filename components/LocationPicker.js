import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';
import Colors from '../constants/Colors';

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  const { onLocationPicked } = props;
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);
  const verifyPermissios = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Insufficient permissios', 'Get permission', [
        { text: 'Okay' },
      ]);
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermissios = await verifyPermissios();
    if (!hasPermissios) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      //   console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert('Could not get location', 'Please try again', [
        { text: 'Okay' },
      ]);
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location choosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.button}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick On Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 15,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationPicker;
