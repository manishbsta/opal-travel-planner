import { Ionicons } from '@expo/vector-icons';
import StyledButton from '@src/core/components/styled/StyledButton';
import StyledTextInput from '@src/core/components/styled/StyledTextInput';
import React from 'react';
import { ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const AddTravelPlan = () => {
  const {
    styles,
    theme: { colors, margins },
  } = useStyles(stylesheet);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <StyledTextInput
        required
        placeholder='e.g. Solo trek to ABC'
        label='Give your travel plan a name'
        iconLeft={
          <Ionicons
            size={20}
            name='golf-outline'
            color={colors.secondary}
          />
        }
      />
      <StyledTextInput
        required
        editable={false}
        label='Start Date'
        placeholder='Click to select date'
        iconLeft={
          <Ionicons
            size={20}
            name='calendar-outline'
            color={colors.secondary}
          />
        }
      />
      <StyledTextInput
        required
        editable={false}
        label='Start Point'
        placeholder='Click the icon on the right'
        iconLeft={
          <Ionicons
            size={20}
            name='map-outline'
            color={colors.secondary}
          />
        }
        iconRight={
          <Ionicons
            size={20}
            name='location'
            color={colors.secondary}
          />
        }
      />
      <StyledTextInput
        required
        editable={false}
        label='Destination'
        placeholder='Click to select destination'
        iconLeft={
          <Ionicons
            size={20}
            name='map-outline'
            color={colors.secondary}
          />
        }
      />
      <StyledTextInput
        multiline
        label='Note'
        placeholder='e.g. I will be bringing my tent'
        iconLeft={
          <Ionicons
            size={20}
            name='create-outline'
            color={colors.secondary}
          />
        }
      />
      <StyledButton
        label='Submit'
        iconName='navigate-sharp'
        containerStyle={{ marginTop: margins.xxl }}
      />
    </ScrollView>
  );
};

export default AddTravelPlan;

const stylesheet = createStyleSheet(({ colors, margins }) => ({
  contentContainer: {
    flexGrow: 1,
    gap: margins.lg,
    paddingTop: margins.xxl,
    paddingBottom: margins.xxxl,
    paddingHorizontal: margins.lg,
    backgroundColor: colors.background,
  },
}));
