import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import ShortUniqueId from 'short-unique-id';
import {createContext, useContextSelector} from 'use-context-selector';

import {FlashList} from '@shopify/flash-list';

import {
  IcEmpty,
  IcPlus,
  IcRadio,
  IcRadioOutline,
  IcX,
} from '../../../assets/svgs';
import Button from '../../../components/Button';
import ButtonIcon from '../../../components/ButtonIcon';
import ConditionalRender from '../../../components/ConditionalRender';
import EmptyList from '../../../components/EmptyList';
import InputField2 from '../../../components/InputField.2';
import Popup from '../../../components/Popup';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import {
  useAddProductCategoryMutation,
  useGetProductCategoriesQuery,
} from '../../../services/productCategoryApi';
import {RootStateProps} from '../../../store';
import {
  setAssignCategoryPopupVisible,
  setDeleteProductCategory,
  setProductCategory,
} from '../../../store/productCreateStore';
import {colors, globalStyles} from '../../../styles';
import {s, vs} from '../../../utils/scale';

type Category = {
  name: string;
  id?: string;
};

const CategoryContext = createContext<
  [Category, Dispatch<SetStateAction<Category>>] | null
>(null);

const uid = new ShortUniqueId();

function AssignCategoryPopupProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [tempCategory, setTempCategory] = useState<Category>({
    id: undefined,
    name: 'none',
  });

  const {category, popupVisible} = useSelector(
    (state: RootStateProps) => ({
      category: state.productCreate.category,
      popupVisible: state.productCreate.assignCategoryPopupVisible,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (popupVisible && category) {
      setTempCategory?.(category);
    } else {
      setTempCategory?.({id: undefined, name: 'none'});
    }
  }, [popupVisible]);

  return (
    <CategoryContext.Provider value={[tempCategory, setTempCategory]}>
      {children}
    </CategoryContext.Provider>
  );
}

function AssignCategoryPopup(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const popupVisible = useSelector(
    (state: RootStateProps) => state.productCreate.assignCategoryPopupVisible,
  );

  return (
    <AssignCategoryPopupProvider>
      <Popup height={874} visible={popupVisible} width={649}>
        <Popup.Header
          title={t('Assign Category')}
          onClose={() => dispatch(setAssignCategoryPopupVisible(false))}
        />

        <Popup.Body>
          <CreateCategory />
          <Spacer height={32} />
          <MCategoryList />
        </Popup.Body>

        <Footer />
      </Popup>
    </AssignCategoryPopupProvider>
  );
}

function Footer(): JSX.Element {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const selectedCategory = useContextSelector(CategoryContext, v => v?.[0]);

  return (
    <Popup.Footer style={styles.footer}>
      <Button
        containerStyle={globalStyles.flex}
        size="medium"
        variant="secondary"
        onPress={() => dispatch(setAssignCategoryPopupVisible(false))}>
        {t('Cancel')}
      </Button>
      <Button
        containerStyle={globalStyles.flex}
        size="medium"
        variant="primary"
        onPress={() => {
          dispatch(setProductCategory(selectedCategory!));
          dispatch(setAssignCategoryPopupVisible(false));
        }}>
        {t('Save')}
      </Button>
    </Popup.Footer>
  );
}

function CreateCategory(): JSX.Element {
  const {t} = useTranslation();
  const [addProductCategoryMutation] = useAddProductCategoryMutation();

  const [name, setName] = useState<string>('');

  const add = () => {
    addProductCategoryMutation({
      id: uid.rnd(),
      name,
    }).then(result => {
      if (result) {
        setName('');
      }
    });
  };

  return (
    <View style={styles.createFrame}>
      <Text textStyle="heading4">{t('Create New Category')}</Text>
      <Spacer height={20} />
      <View style={styles.categoryFrame}>
        <InputField2
          containerStyle={globalStyles.flex}
          placeholder={t('Category Name')}
          size="large"
          value={name}
          onChangeText={setName}
        />

        <ButtonIcon
          IconComponent={IcPlus}
          disabled={!name}
          size="large"
          onPress={add}
        />
      </View>
    </View>
  );
}

function CategoryList(): JSX.Element {
  const {t} = useTranslation();

  const {data} = useGetProductCategoriesQuery(undefined, {});

  return (
    <View style={styles.listWrapper}>
      <FlashList
        ItemSeparatorComponent={() => <Spacer height={8} />}
        contentContainerStyle={styles.contentList}
        data={data}
        estimatedItemSize={s(52)}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MCategoryCard item={item} />}
        ListEmptyComponent={
          <EmptyList
            Icon={IcEmpty}
            title={t('Ready to Sort?')}
            subtitle={t(
              'Begin by Creating Your First Category for a Neat Experience.',
            )}
          />
        }
        ListHeaderComponent={
          <>
            <Text textStyle="heading4">{t('List of Category Options')}</Text>
            <Spacer height={20} />
            <MCategoryCard item={{id: undefined, name: t('None')}} />
            <Spacer height={8} />
          </>
        }
      />
    </View>
  );
}

function CategoryCard({item}: {item: Category}): JSX.Element {
  const {id, name} = item;

  const active = useContextSelector(CategoryContext, v => v?.[0].id === id);

  const setCategory = useContextSelector(CategoryContext, v => v?.[1]);

  const Icon = active ? IcRadio : IcRadioOutline;
  const dispatch = useDispatch();

  return (
    <TouchableRipple onPress={() => setCategory?.(item)}>
      <View style={styles.cardFrame}>
        <View style={styles.cardLeftFrame}>
          <Icon
            color={active ? colors.primary.c400 : colors.neutral.c400}
            height={s(24)}
            width={s(24)}
          />
          <Text textStyle="bodyTextLarge">{name}</Text>
        </View>
        <ConditionalRender condition={id !== undefined}>
          <ButtonIcon
            transparent
            IconComponent={IcX}
            size="medium"
            variant="neutralNoStroke"
            onPress={() => {
              dispatch(setAssignCategoryPopupVisible(false));
              setTimeout(() => {
                dispatch(setDeleteProductCategory({id, name}));
              }, 300);
            }}
          />
        </ConditionalRender>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  cardFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    height: s(52),
    justifyContent: 'space-between',
    paddingVertical: s(4),
  },
  cardLeftFrame: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
  },
  categoryFrame: {
    ...globalStyles.rowBetween,
    gap: vs(20),
  },
  contentList: {
    paddingBottom: s(24),
    paddingHorizontal: vs(24),
  },
  createFrame: {
    paddingHorizontal: vs(24),
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: vs(16),
    justifyContent: 'space-between',
  },
  listWrapper: {
    height: s(540),
  },
});

const MCategoryList = memo(CategoryList);

const MCategoryCard = memo(CategoryCard);

export default memo(AssignCategoryPopup);
