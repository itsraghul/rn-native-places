import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesAction from '../store/places-actions';

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesAction.loadPlaces());
  }, [dispatch]);
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <PlaceItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              onSelect={() => {
                props.navigation.navigate('PlaceDetail', {
                  placeTitle: itemData.item.title,
                  placeId: itemData.item.id,
                });
              }}
              address={null}
            />
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            iconName="md-add"
            onPress={() => navData.navigation.navigate('NewPlace')}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({});

export default PlacesListScreen;
