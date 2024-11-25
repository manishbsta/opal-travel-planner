import { Ionicons } from '@expo/vector-icons';
import { useAutocomplete } from '@src/hooks/useAutocomplete';
import { Location } from '@src/types/location';
import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StyledText from './styled/StyledText';
import StyledTextInput from './styled/StyledTextInput';

type PlacesAutocompleteModalProps = {
  isVisible: boolean;
  onClose: (location?: Location) => void;
  closeOnBackdropPress?: boolean;
};
const PlacesAutocompleteModal: FC<PlacesAutocompleteModalProps> = ({
  isVisible,
  onClose,
  closeOnBackdropPress = true,
}) => {
  const {
    styles,
    theme: { colors, font, margins },
  } = useStyles(stylesheet);
  const { error, loading, locations, searchPlaces } = useAutocomplete();

  const [searchText, setSearchText] = useState('');

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) onClose();
  };

  const handleSearch = () => {
    if (searchText.length < 3) return;

    Keyboard.dismiss();
    searchPlaces(searchText);
  };

  const handleItemPress = (loc: Location) => onClose(loc);

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
            <StyledTextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder='Search for a destination'
              iconLeft={
                <Ionicons
                  size={20}
                  name='search-outline'
                  color={colors.secondary}
                />
              }
              iconRight={
                <Ionicons
                  size={30}
                  name='navigate-circle'
                  color={colors.primary}
                />
              }
              onIconRightPress={handleSearch}
            />
            {loading && (
              <ActivityIndicator
                size='small'
                color={colors.primary}
                style={{ marginVertical: margins.md }}
              />
            )}
            <FlatList
              data={locations}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => <ListEmptyComponent error={error} />}
              contentContainerStyle={styles.listContentContainer}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationItem}
                  onPress={() => handleItemPress(item)}>
                  <StyledText
                    style={{ fontFamily: font.family.bold }}
                    numberOfLines={1}>
                    {item.name}
                  </StyledText>
                  <StyledText
                    style={{ fontSize: 12 }}
                    numberOfLines={1}>
                    {item.plus_code}
                  </StyledText>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

type ListEmptyComponentProps = {
  error: string | null;
};
const ListEmptyComponent: FC<ListEmptyComponentProps> = ({ error }) => {
  const { styles } = useStyles(stylesheet);

  if (error) {
    return (
      <View style={styles.emptyListContainer}>
        <StyledText style={{ textAlign: 'center' }}>{error}</StyledText>
      </View>
    );
  }

  return (
    <View style={styles.emptyListContainer}>
      <StyledText style={{ textAlign: 'center' }}>Try entering more than 3 chars</StyledText>
      <StyledText style={{ textAlign: 'center' }}>and hit the submit button!</StyledText>
    </View>
  );
};

export default PlacesAutocompleteModal;

const stylesheet = createStyleSheet(({ colors, margins }) => ({
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
    minHeight: '65%',
    maxHeight: '80%',
    padding: margins.lg,
    borderRadius: margins.md,
    backgroundColor: colors.light,
  },
  locationItem: {
    padding: margins.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  listContentContainer: {
    flexGrow: 1,
  },
  emptyListContainer: {
    flex: 1,
    paddingTop: '30%',
    alignItems: 'center',
  },
}));
