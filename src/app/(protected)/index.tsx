import { Ionicons } from '@expo/vector-icons';
import DeletePlanModal from '@src/core/components/DeletePlanModal';
import Greetings from '@src/core/components/Greetings';
import ListEmptyComponent from '@src/core/components/ListEmptyComponent';
import MenuBottomSheet from '@src/core/components/MenuBottomSheet';
import StyledButton from '@src/core/components/styled/StyledButton';
import StyledText from '@src/core/components/styled/StyledText';
import UpdatePlanStatusSheet from '@src/core/components/UpdatePlanStatusSheet';
import { useAppSelector } from '@src/store/hooks';
import { Plan } from '@src/types/plan';
import { getStatusColor } from '@src/utils/status-color';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ListRenderItem, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const Home = () => {
  const router = useRouter();

  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);
  const { plans } = useAppSelector(s => s.app);
  const [showMenu, setShowMenu] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showStatusSelection, setShowStatusSelection] = React.useState(false);
  const [activePlanId, setActivePlanId] = React.useState<string | null>(null);

  const renderDestinationItem: ListRenderItem<Plan> = ({ item: plan }) => {
    return (
      <Pressable
        style={styles.planItem}
        onLongPress={() => {
          setShowMenu(true);
          setActivePlanId(plan.id);
        }}
        onPress={() => router.push(`/travel-plan-details/${plan.id}`)}>
        <View style={styles.row}>
          <StyledText
            style={styles.name}
            numberOfLines={1}>
            {plan.name}
          </StyledText>
          <Ionicons
            size={20}
            name='chevron-forward-sharp'
            color={colors.success}
          />
        </View>
        <View style={styles.row}>
          <Ionicons
            name='location'
            size={16}
            color={colors.success}
          />
          <StyledText
            style={{ flex: 1 }}
            numberOfLines={1}>
            {plan.destination.name}
          </StyledText>
        </View>
        <View style={styles.row}>
          <Ionicons
            name='calendar'
            size={16}
            color={colors.success}
          />
          <StyledText>{dayjs(plan.start_date).format('DD MMMM YYYY')}</StyledText>
        </View>
        <View style={[styles.statusContainer, { backgroundColor: getStatusColor(plan.status) }]}>
          <StyledText style={[styles.status]}>{plan.status}</StyledText>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Greetings />
      {plans.length > 0 && <StyledText style={styles.headerText}>My Plans</StyledText>}
      <FlatList
        data={plans}
        keyExtractor={item => item.id}
        renderItem={renderDestinationItem}
        showsVerticalScrollIndicator={false}
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
      {plans.length > 0 && (
        <View style={styles.btnContainer}>
          <StyledButton
            label='Add Plan'
            iconName='add-circle-outline'
            onPress={() => router.push('/add-travel-plan')}
          />
        </View>
      )}
      {activePlanId && showMenu ? (
        <MenuBottomSheet
          planId={activePlanId}
          onClose={() => setShowMenu(false)}
          onDelete={() => setShowDeleteModal(true)}
          onChangeStatus={() => setShowStatusSelection(true)}
        />
      ) : null}
      {activePlanId && showStatusSelection ? (
        <UpdatePlanStatusSheet
          planId={activePlanId}
          onClose={() => {
            setActivePlanId(null);
            setShowStatusSelection(false);
          }}
        />
      ) : null}
      {activePlanId ? (
        <DeletePlanModal
          planId={activePlanId}
          isVisible={showDeleteModal}
          closeOnBackdropPress={false}
          onClose={() => {
            setActivePlanId(null);
            setShowDeleteModal(false);
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet(({ colors, margins, font }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: margins.lg,
    paddingBottom: margins.xxxl + margins.xxxl,
    gap: margins.lg,
  },
  headerText: {
    fontFamily: font.family.bold,
    fontSize: font.sizes.xl,
    margin: margins.lg,
  },
  planItem: {
    backgroundColor: colors.surface,
    padding: margins.lg,
    paddingVertical: margins.xl,
    gap: margins.md,
    borderRadius: margins.md,
    boxShadow: '0 2 10 rgba(0, 0, 0, 0.1)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: margins.sm,
  },
  name: {
    flex: 1,
    fontSize: font.sizes.lg,
    fontFamily: font.family.bold,
  },
  statusContainer: {
    padding: margins.sm,
    alignSelf: 'flex-start',
    borderRadius: margins.md,
    paddingHorizontal: margins.md,
    marginTop: margins.md,
  },
  status: {
    color: colors.light,
    fontFamily: font.family.semiBold,
  },
  note: {
    fontSize: font.sizes.sm,
  },
  btnContainer: {
    position: 'absolute',
    bottom: margins.xxl,
    right: margins.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2 10 rgba(0, 0, 0, 0.1)',
  },
}));

export default Home;
