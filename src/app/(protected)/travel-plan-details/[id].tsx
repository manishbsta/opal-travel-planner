import { Ionicons } from '@expo/vector-icons';
import LoadingBottomSheet from '@src/core/components/LoadingBottomSheet';
import StyledButton from '@src/core/components/styled/StyledButton';
import StyledText from '@src/core/components/styled/StyledText';
import UpdatePlanStatusSheet from '@src/core/components/UpdatePlanStatusSheet';
import useGenerateActivities from '@src/hooks/useGenerateActivities';
import { useAppSelector } from '@src/store/hooks';
import { Plan } from '@src/types/plan';
import { PlanStatus } from '@src/types/plan-status';
import { getStatusColor } from '@src/utils/status-color';
import dayjs from 'dayjs';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const TravelPlanDetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [showStatusSelection, setShowStatusSelection] = React.useState(false);

  const {
    styles,
    theme: { colors, margins },
  } = useStyles(stylesheet);
  const { plans } = useAppSelector(state => state.app);
  const { loading, error, generateActivities } = useGenerateActivities();
  const [plan, setPlan] = React.useState<Plan | null | undefined>(null);

  useEffect(() => {
    if (params.id) {
      const planId = params.id as string;

      (async () => {
        if (plans) {
          const plan = plans.find(p => p.id === planId);

          if (plan) {
            navigation.setOptions({ title: plan.name });
            setPlan(plan);
          }
        }
      })();
    }
  }, [navigation, params.id, plans]);

  if (!plan) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={[styles.header, { backgroundColor: getStatusColor(plan.status) }]}>
          <StyledText style={styles.destination}>{plan.name}</StyledText>
          <Pressable
            style={styles.statusBadge}
            onPress={() => setShowStatusSelection(true)}>
            <StyledText style={styles.statusText}>{plan.status}</StyledText>
            <Ionicons
              name='chevron-down-circle-outline'
              size={20}
              color={colors.typography}
            />
          </Pressable>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.infoContainer}>
            <Ionicons
              name='calendar-outline'
              size={24}
              color={colors.typography}
            />
            <StyledText style={styles.infoText}>
              {dayjs(plan.start_date).format('DD MMMM YYYY')}
            </StyledText>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons
              name='location-outline'
              size={24}
              color={colors.typography}
            />
            <StyledText style={styles.infoText}>{plan.destination.name}</StyledText>
          </View>
          <View style={styles.noteContainer}>
            <StyledText style={styles.noteTitle}>Notes:</StyledText>
            <StyledText>{plan.note ? plan.note : 'N/A'}</StyledText>
          </View>
          <View style={styles.largeCardContainer}>
            <StyledText style={styles.mapTitle}>Location:</StyledText>
            <Link
              href={`/travel-plan-map/${plan.id}`}
              asChild>
              <Pressable style={styles.largeCard}>
                <Ionicons
                  size={48}
                  name='map-outline'
                  color={colors.typography}
                />
                <StyledText style={styles.mapText}>View on Map</StyledText>
              </Pressable>
            </Link>
          </View>
          <View style={styles.largeCardContainer}>
            <StyledText style={styles.mapTitle}>Activities:</StyledText>
            <View style={styles.activitiesCard}>
              {plan.activities.length === 0 ? (
                <View
                  style={[
                    styles.emptyActivitiesContainer,
                    { alignItems: 'center', justifyContent: 'center' },
                  ]}>
                  <StyledText style={styles.mapText}>
                    {error ? error : 'No activities generated!'}
                  </StyledText>
                  <StyledButton
                    disabled={
                      plan.status === PlanStatus.Completed || plan.status === PlanStatus.Canceled
                    }
                    label='Generate'
                    iconName='sparkles'
                    onPress={() => generateActivities(plan)}
                  />
                </View>
              ) : (
                plan.activities.map((activity, index) => (
                  <View
                    key={index}
                    style={styles.activityContainer}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'flex-start', gap: margins.sm }}>
                      <StyledText style={styles.activityTitle}>{activity.name}</StyledText>
                      <View style={styles.chip}>
                        <StyledText style={styles.metaInfoText}>{activity.distance} KM</StyledText>
                      </View>
                    </View>
                    <View style={styles.metaInfoRow}>
                      <View style={[styles.chip, { backgroundColor: colors.primary }]}>
                        <StyledText
                          style={styles.metaInfoText}
                          numberOfLines={1}>
                          {activity.address}
                        </StyledText>
                      </View>
                    </View>
                    <StyledText style={styles.activityDescription}>
                      {activity.description}
                    </StyledText>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      {loading ? <LoadingBottomSheet /> : null}
      {plan && showStatusSelection ? (
        <UpdatePlanStatusSheet
          planId={plan.id}
          onClose={() => {
            setShowStatusSelection(false);
          }}
        />
      ) : null}
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
    paddingHorizontal: margins.xl,
    paddingVertical: margins.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: margins.lg,
  },
  destination: {
    flex: 1,
    color: colors.light,
    fontSize: font.sizes.xl,
    fontFamily: font.family.bold,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margins.sm,
    paddingHorizontal: margins.lg,
    paddingVertical: margins.sm,
    borderRadius: margins.md,
    backgroundColor: colors.light,
  },
  statusText: {
    color: colors.primary,
    fontFamily: font.family.bold,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: margins.xxxl,
  },
  detailsContainer: {
    padding: margins.xl,
    gap: margins.xl,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: margins.lg,
    padding: margins.lg,
    borderRadius: margins.md,
    backgroundColor: colors.surface,
    boxShadow: '0 2 4 rgba(0, 0, 0, 0.1)',
  },
  infoText: {
    flex: 1,
    fontSize: font.sizes.lg,
  },
  noteContainer: {
    backgroundColor: colors.surface,
    gap: margins.sm,
    padding: margins.lg,
    borderRadius: margins.md,
    boxShadow: '0 2 4 rgba(0, 0, 0, 0.1)',
  },
  noteTitle: {
    fontSize: font.sizes.lg,
    fontFamily: font.family.bold,
  },
  mapTitle: {
    fontSize: font.sizes.lg,
    fontFamily: font.family.bold,
  },
  largeCardContainer: {
    gap: margins.md,
  },
  largeCard: {
    backgroundColor: colors.surface,
    borderRadius: margins.md,
    padding: margins.lg,
    gap: margins.md,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2 4 rgba(0, 0, 0, 0.1)',
  },
  activitiesCard: {
    backgroundColor: colors.surface,
    borderRadius: margins.md,
    padding: margins.md,
    gap: margins.md,
    boxShadow: '0 2 4 rgba(0, 0, 0, 0.1)',
  },
  mapText: {
    fontSize: font.sizes.lg,
    textAlign: 'center',
  },
  emptyActivitiesContainer: {
    gap: margins.lg,
    marginVertical: margins.xl,
  },
  activityContainer: {
    display: 'flex',
    backgroundColor: colors.light,
    padding: margins.md,
    gap: margins.sm,
    borderRadius: margins.md,
  },
  activityTitle: {
    flex: 1,
    fontSize: font.sizes.md,
    fontFamily: font.family.bold,
  },
  activityDescription: {
    fontSize: font.sizes.base,
  },
  metaInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: margins.md,
  },
  chip: {
    padding: margins.md,
    paddingVertical: margins.xs,
    borderRadius: margins.md,
    backgroundColor: colors.secondary,
  },
  metaInfoText: {
    color: colors.light,
    fontSize: font.sizes.sm,
  },
}));
