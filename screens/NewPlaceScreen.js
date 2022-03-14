import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as placesAction from '../store/places-actions';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState('');
  const [usedImage, setUsedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const imageTakenHandler = (image) => {
    setUsedImage(image);
  };
  const locationPickedHandler = useCallback(
    (location) => {
      setSelectedLocation(location);
    },
    [setSelectedLocation]
  );

  const savePlaceHandler = () => {
    dispatch(placesAction.addPlace(title, usedImage, selectedLocation));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={titleChangeHandler}
            value={title}
          />
          <ImageSelector onImageTaken={imageTakenHandler} />
          <LocationPicker
            navigation={props.navigation}
            onLocationPicked={locationPickedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Save Place"
              color={Colors.primary}
              onPress={savePlaceHandler}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,

    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  button: {
    marginTop: 10,
  },
});

export default NewPlaceScreen;
