import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import StyledButton from '@src/core/components/styled/StyledButton';
import StyledTextInput from '@src/core/components/styled/StyledTextInput';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setDestination, updatePlan } from '@src/store/slices/app.slice';
import { Plan } from '@src/types/plan';
import { PlanStatus } from '@src/types/plan-status';
import dayjs from 'dayjs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Keyboard, ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const EditTravelPlan = () => {
  const {
    styles,
    theme: { colors, margins },
  } = useStyles(stylesheet);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const { destination, plans } = useAppSelector(s => s.app);

  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showDateModal, setShowDateModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(setDestination(undefined));
    };
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      const planId = params.id as string;

      (async () => {
        if (plans) {
          const plan = plans.find(p => p.id === planId);

          if (plan) {
            setName(plan.name);
            setNote(plan.note);
            setStartDate(plan.start_date);
            dispatch(setDestination(plan.destination));
          }
        }
      })();
    }
  }, [dispatch, params.id, plans]);

  const isSubmissionEnabled = useMemo(() => {
    return name.length > 2 && !!destination && !!startDate;
  }, [name, destination, startDate]);

  const updateTravelPlan = () => {
    Keyboard.dismiss();

    const payload: Omit<Plan, 'activities'> = {
      id: params.id as string,
      name,
      note,
      start_date: startDate!,
      status: PlanStatus.Upcoming,
      destination: destination!,
    };
    dispatch(updatePlan(JSON.stringify(payload)));

    Alert.alert('Success', 'Your travel plan has been edited!', [
      {
        text: 'OK',
        onPress: () => {
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'>
        <StyledTextInput
          required
          value={name}
          onChangeText={setName}
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
          value={startDate ? dayjs(startDate).format('DD MMMM YYYY') : undefined}
          label='Start Date'
          placeholder='Click to select date'
          onPress={() => setShowDateModal(true)}
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
          label='Destination'
          value={destination?.name}
          placeholder='Click to select destination'
          iconLeft={
            <Ionicons
              size={20}
              name='map-outline'
              color={colors.secondary}
            />
          }
          onPress={() => router.push('/select-destination')}
        />
        <StyledTextInput
          multiline
          label='Note'
          value={note}
          onChangeText={setNote}
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
          disabled={!isSubmissionEnabled}
          containerStyle={{ marginTop: margins.xxl }}
          onPress={updateTravelPlan}
        />
      </ScrollView>
      {showDateModal && (
        <DateTimePicker
          mode='date'
          minimumDate={new Date()}
          value={startDate ? new Date(startDate) : new Date()}
          onChange={(_, date) => {
            if (date) setStartDate(date);
            setShowDateModal(false);
          }}
        />
      )}
    </View>
  );
};

export default EditTravelPlan;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    gap: margins.lg,
    padding: margins.lg,
    paddingBottom: margins.xxxl,
    backgroundColor: colors.background,
  },
}));
