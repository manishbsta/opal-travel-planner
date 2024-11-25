import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { wW } from '@src/utils/dimensions';
import { useRouter } from 'expo-router';
import React, { FC, useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './styled/StyledText';

type MenuBottomSheetProps = {
  planId: string;
  onClose: () => void;
  onDelete: () => void;
  onChangeStatus: () => void;
};

const BOTTOMSHEET_SIZE = wW * 0.7;
const MenuBottomSheet: FC<MenuBottomSheetProps> = ({
  planId,
  onClose,
  onDelete,
  onChangeStatus,
}) => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const router = useRouter();

  const handleOnEditPress = () => {
    bottomSheetRef.current?.close();
    router.push(`/edit-travel-plan/${planId}`);
  };

  const handleOnDeletePress = () => {
    onClose();
    onDelete();
  };

  const handleOnChangeStatus = () => {
    onClose();
    onChangeStatus();
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
      index={0}
      ref={bottomSheetRef}
      onClose={onClose}
      snapPoints={[BOTTOMSHEET_SIZE]}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}>
      <BottomSheetView style={styles.container}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Pressable
            style={styles.menuItem}
            onPress={handleOnEditPress}>
            <Ionicons
              name='pencil'
              size={24}
              color={colors.typography}
            />
            <StyledText style={styles.menuText}>Edit Plan</StyledText>
          </Pressable>
          <Pressable
            style={styles.menuItem}
            onPress={handleOnChangeStatus}>
            <Ionicons
              name='refresh'
              size={24}
              color={colors.typography}
            />
            <StyledText style={styles.menuText}>Change Status</StyledText>
          </Pressable>
          <Pressable
            style={styles.menuItem}
            onPress={handleOnDeletePress}>
            <Ionicons
              name='trash-outline'
              size={24}
              color={colors.error}
            />
            <StyledText style={[styles.menuText, { color: colors.error }]}>Delete Plan</StyledText>
          </Pressable>
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MenuBottomSheet;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: margins.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margins.xl,
    paddingVertical: margins.lg,
    paddingHorizontal: margins.md,
    borderColor: colors.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuText: {
    fontSize: font.sizes.lg,
  },
}));
