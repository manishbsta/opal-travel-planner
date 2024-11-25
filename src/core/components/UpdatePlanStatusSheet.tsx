import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useAppDispatch } from '@src/store/hooks';
import { updatePlanStatus } from '@src/store/slices/app.slice';
import { Plan } from '@src/types/plan';
import { PlanStatus } from '@src/types/plan-status';
import { wH } from '@src/utils/dimensions';
import { mmkv } from '@src/utils/mmkv';
import { getStatusColor } from '@src/utils/status-color';
import React, { FC, useCallback, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { StorageKeys } from '../constants/storage-keys';
import StyledText from './styled/StyledText';

type UpdatePlanStatusSheetProps = {
  planId: string;
  onClose: () => void;
};

const BOTTOMSHEET_SIZE = wH * 0.6;
const UpdatePlanStatusSheet: FC<UpdatePlanStatusSheetProps> = ({ planId, onClose }) => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const dispatch = useAppDispatch();
  const [plan, setPlan] = React.useState<Plan | null>(null);

  useEffect(() => {
    const plans = mmkv.getString(StorageKeys.PLANS);
    if (plans) {
      const parsedPlans = JSON.parse(plans) as Plan[];
      const plan = parsedPlans.find((p: Plan) => p.id === planId);
      if (plan) setPlan(plan);
    }
  }, [planId]);

  const handleOnStatusSelect = (selectedStatus: PlanStatus) => {
    const payload = { id: planId, status: selectedStatus };
    dispatch(updatePlanStatus(JSON.stringify(payload)));
    onClose();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      onClose={onClose}
      ref={bottomSheetRef}
      snapPoints={[BOTTOMSHEET_SIZE]}
      backdropComponent={renderBackdrop}>
      <BottomSheetView style={styles.container}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <StyledText style={styles.title}>Change Status</StyledText>
            <StyledText>{plan?.name}</StyledText>
          </View>
          {Object.entries(PlanStatus).map(([key, value]) => (
            <Pressable
              key={key}
              style={styles.menuItem}
              onPress={() => handleOnStatusSelect(value)}>
              <Ionicons
                name='caret-forward'
                size={24}
                color={getStatusColor(value)}
              />
              <StyledText style={styles.menuText}>{value}</StyledText>
              {plan?.status === value && (
                <Ionicons
                  name='checkmark-circle'
                  size={24}
                  color={colors.secondary}
                />
              )}
            </Pressable>
          ))}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default UpdatePlanStatusSheet;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: margins.lg,
  },
  header: {
    marginVertical: margins.xl,
  },
  title: {
    fontSize: font.sizes.xl,
    fontFamily: font.family.bold,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margins.xl,
    paddingVertical: margins.lg,
    paddingHorizontal: margins.xl,
    marginBottom: margins.md,
    borderRadius: margins.md,
    borderColor: colors.divider,
    borderWidth: 1,
  },
  menuText: {
    flex: 1,
    fontSize: font.sizes.lg,
  },
}));
