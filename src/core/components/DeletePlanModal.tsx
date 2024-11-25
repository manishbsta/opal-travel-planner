import { useAppDispatch } from '@src/store/hooks';
import { deletePlan } from '@src/store/slices/app.slice';
import { Location } from '@src/types/location';
import React, { FC } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledButton from './styled/StyledButton';
import StyledText from './styled/StyledText';

type DeletePlanModalProps = {
  planId: string;
  isVisible: boolean;
  closeOnBackdropPress?: boolean;
  onClose: (location?: Location) => void;
};
const DeletePlanModal: FC<DeletePlanModalProps> = ({
  planId,
  isVisible,
  onClose,
  closeOnBackdropPress = true,
}) => {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);
  const dispatch = useAppDispatch();

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) onClose();
  };

  const handleDelete = () => {
    dispatch(deletePlan(planId));
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType='slide'
      statusBarTranslucent={true}
      onRequestClose={() => onClose()}>
      <View style={styles.modalContent}>
        <Pressable
          onPress={handleBackdropPress}
          style={styles.backdrop}
        />
        <View style={styles.contentContainerWrapper}>
          <View style={styles.contentContainer}>
            <StyledText style={styles.title}>Confirm Plan Deletion</StyledText>
            <StyledText style={styles.caption}>
              Are you sure you want to delete this plan?
            </StyledText>
            <View style={styles.btnRoew}>
              <StyledButton
                variant='secondary'
                label='Cancel'
                onPress={onClose}
                labelStyle={{ color: colors.primary }}
              />
              <StyledButton
                label='Delete'
                onPress={handleDelete}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeletePlanModal;

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  modalContent: {
    flex: 1,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    zIndex: 100,
    width: '90%',
    maxHeight: '80%',
    padding: margins.xl,
    borderRadius: margins.md,
    backgroundColor: colors.light,
  },
  title: {
    fontFamily: font.family.bold,
    fontSize: font.sizes.xl,
  },
  caption: {
    marginTop: margins.lg,
  },
  btnRoew: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: margins.md,
    marginTop: margins.xl,
  },
}));
