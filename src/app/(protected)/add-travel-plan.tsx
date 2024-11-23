import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const AddTravelPlan = () => {
  const { styles } = useStyles(stylesheet);

  return <View style={styles.container}></View>;
};

export default AddTravelPlan;

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
