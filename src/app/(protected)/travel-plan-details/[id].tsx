import { StorageKeys } from '@src/core/constants/storage-keys';
import { useAppDispatch } from '@src/store/hooks';
import { Plan } from '@src/types/plan';
import { getItemFromStorage } from '@src/utils/expo-secure-store';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

const TravelPlanDetails = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const [plan, setPlan] = React.useState<Plan | null | undefined>(null);

  useEffect(() => {
    if (params.id) {
      const planId = params.id as string;

      (async () => {
        const plansResult = await getItemFromStorage(StorageKeys.PLANS);
        if (plansResult) {
          const plans = JSON.parse(plansResult) as Plan[];
          const plan = plans.find(p => p.id === planId);

          if (plan) {
            navigation.setOptions({ title: plan.destination.name });
            setPlan(plan);
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text>TravelPlanDetails</Text>
    </View>
  );
};

export default TravelPlanDetails;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: margins.lg,
  },
  headerText: {
    fontSize: font.sizes.xl,
    fontFamily: font.family.bold,
  },
  content: {
    flex: 1,
    padding: margins.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margins.md,
  },
  label: {
    fontSize: font.sizes.md,
    fontFamily: font.family.semiBold,
  },
  value: {
    fontSize: font.sizes.md,
    fontFamily: font.family.regular,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
}));
