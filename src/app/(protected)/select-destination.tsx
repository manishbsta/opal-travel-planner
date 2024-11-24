import { Ionicons } from '@expo/vector-icons';
import PlacesAutocompleteModal from '@src/core/components/PlacesAutocompleteModal';
import StyledButton from '@src/core/components/styled/StyledButton';
import StyledTextInput from '@src/core/components/styled/StyledTextInput';
import { useAppDispatch } from '@src/store/hooks';
import { setDestination } from '@src/store/slices/app.slice';
import { Location } from '@src/types/location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const SelectDestination = () => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const mapRef = useRef<MapView>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);

  useEffect(() => {
    if (selectedLocation) {
      mapRef.current?.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedLocation]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          zoomControlEnabled
          initialRegion={{
            latitude: 27.691340271593813,
            longitude: 85.3420498784975,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {selectedLocation ? (
            <Marker
              title={selectedLocation.name}
              description={selectedLocation.plus_code}
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
            />
          ) : null}
        </MapView>
        <View style={styles.searchInputContainer}>
          <StyledTextInput
            editable={false}
            onPress={() => setShowModal(true)}
            placeholder='Search for a destination'
            value={selectedLocation?.name}
            iconLeft={
              <Ionicons
                size={20}
                name='search-outline'
                color={colors.secondary}
              />
            }
          />
        </View>
      </SafeAreaView>
      <View style={styles.btnContainer}>
        <StyledButton
          label='Done'
          iconName='checkmark-outline'
          onPress={() => {
            if (selectedLocation) dispatch(setDestination(selectedLocation));
            router.back();
          }}
        />
      </View>
      <PlacesAutocompleteModal
        isVisible={showModal}
        onClose={(location?: Location) => {
          if (location) setSelectedLocation(location);
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default SelectDestination;

const stylesheet = createStyleSheet(({ colors, margins }) => ({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchInputContainer: {
    margin: margins.lg,
    backgroundColor: colors.background,
  },
  btnContainer: {
    position: 'absolute',
    bottom: margins.xxl,
    left: margins.xxl,
  },
}));
