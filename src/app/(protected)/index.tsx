import ListEmptyComponent from '@src/core/components/ListEmptyComponent';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { Plan } from '@src/types/plan';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { styles } = useStyles(stylesheet);
  const { plans } = useAppSelector(s => s.app);

  const renderDestinationItem: ListRenderItem<Plan> = ({ item }) => {
    return <View></View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={plans}
        keyExtractor={item => item.id}
        renderItem={renderDestinationItem}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={() => (
          <ListEmptyComponent
            title='Nothing Yet!'
            caption='Let’s get started by adding a new plan!'
            btnLabel='Add New Plan'
            onPress={() => router.push('/add-travel-plan')}
          />
        )}
      />
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet(({ colors, margins }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: margins.lg,
  },
}));

export default Home;
