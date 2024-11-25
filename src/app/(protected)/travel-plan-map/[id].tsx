import { useAppSelector } from '@src/store/hooks';
import { Plan } from '@src/types/plan';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const TravelPlanMap = () => {
  const { styles } = useStyles(stylesheet);
  const mapRef = useRef<MapView>(null);
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const { plans } = useAppSelector(state => state.app);
  const [plan, setPlan] = React.useState<Plan | null | undefined>(null);

  useEffect(() => {
    if (params.id) {
      const planId = params.id as string;

      (async () => {
        if (plans) {
          const plan = plans.find(p => p.id === planId);

          if (plan) {
            setPlan(plan);
            navigation.setOptions({ title: plan.name });
          }
        }
      })();
    }
  }, [navigation, params.id, plans]);

  if (!plan) return null;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onMapLoaded={() => {
          mapRef.current?.animateToRegion({
            latitude: plan.destination.latitude,
            longitude: plan.destination.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        zoomControlEnabled
        initialRegion={{
          latitude: 27.691340271593813,
          longitude: 85.3420498784975,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          title={plan.destination.name}
          description={plan.destination.plus_code}
          coordinate={{
            latitude: plan.destination.latitude,
            longitude: plan.destination.longitude,
          }}
        />
        {plan.activities.map((activity, index) => (
          <Marker
            key={index}
            pinColor='blue'
            title={activity.name}
            description={activity.address}
            coordinate={{
              latitude: activity.latitude,
              longitude: activity.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default TravelPlanMap;

const stylesheet = createStyleSheet(({ colors, margins }) => ({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
}));
