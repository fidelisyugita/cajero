import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../../components/Button';
import {RootStateProps} from '../../../store';
import {setSelectedCategoryId} from '../../../store/menuStore';
import {s, vs} from '../../../utils/scale';

type CategoryProps = {
  item: {
    id: string;
    label: string;
  };
};

const categories = [
  {id: 'all', label: 'All Category'},
  {id: 'beverage', label: 'Beverage'},
  {id: 'food', label: 'Food'},
];

function Category({item}: CategoryProps): JSX.Element {
  const {id, label} = item;
  const dispatch = useDispatch();

  const active = useSelector(
    (state: RootStateProps) => state.menu.selectedCategoryId === id,
  );

  return (
    <Button
      size="medium"
      variant={active ? 'soft' : 'neutral'}
      onPress={active ? undefined : () => dispatch(setSelectedCategoryId(id))}>
      {label}
    </Button>
  );
}

function MenuCategories(): JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        contentContainerStyle={styles.content}
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Category item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: vs(22),
    paddingRight: vs(24),
  },
  content: {
    gap: vs(12),
    paddingVertical: s(32),
  },
});

export default MenuCategories;
