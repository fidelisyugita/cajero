import React, {ElementType, ReactNode, memo, useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {createContext, useContextSelector} from 'use-context-selector';

import {CellContainer, FlashList} from '@shopify/flash-list';

import {colors} from '../styles';
import {sortDatas} from '../utils/convert';
import {s, vs} from '../utils/scale';
import Spacer from './Spacer';
import Text from './Text';

type HeaderProps = {
  id: string;
  label: string;
  CustomComponent?: ElementType;
  width: number;
};

type TableProps = {
  headers: HeaderProps[];
  gap?: number;
  data: {
    [key: string]: string | number;
  }[];
};

type RowProps = {
  data: {
    [key: string]: string | number;
  };
};

type CellProps = {
  value: string | number;
};

type HeaderCellProps = {
  item: HeaderProps;
  style?: ViewStyle;
};

type TableContextProps = {
  gap?: number;
  headers?: HeaderProps[];
};

type TableContextProviderProps = {
  children: ReactNode;
} & TableContextProps;

const TableContext = createContext<TableContextProps>({
  gap: undefined,
  headers: undefined,
});

function TableContextProvider({
  children,
  gap,
  headers,
}: TableContextProviderProps): JSX.Element {
  return (
    <TableContext.Provider value={{gap, headers}}>
      {children}
    </TableContext.Provider>
  );
}

function HeaderCell({item, style}: HeaderCellProps): JSX.Element {
  const {label, width} = item;
  return (
    <View style={[styles.headerCell, {width}, style]}>
      <Text textStyle="heading5">{label}</Text>
    </View>
  );
}

function getCellStyle({cellProps, gap, headers}: any) {
  const header = headers?.[cellProps.index];
  const columns = headers?.length || 0;
  const paddingRight = columns - 1 !== cellProps.index ? gap || 0 : 0;
  const width = (header?.width || 0) + paddingRight;

  return {
    ...cellProps.style,
    ...(width > 0 && {width}),
    ...(paddingRight > 0 && {paddingRight: vs(8)}),
  };
}

function Header(): JSX.Element {
  const {gap, headers} = useContextSelector(TableContext, state => state);

  const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

  const columns = headers?.length;

  return (
    <View style={styles.headerContainer}>
      <FlashList
        ItemSeparatorComponent={() => <Spacer width={vs(100)} />}
        contentContainerStyle={styles.headerContent}
        data={headers}
        estimatedItemSize={s(56)}
        keyExtractor={item => item.id}
        numColumns={columns}
        renderItem={({item}) => <MHeaderCell item={item} />}
        scrollEnabled={false}
        // eslint-disable-next-line react/no-unstable-nested-components
        CellRendererComponent={props => {
          const cellStyle = getCellStyle({
            cellProps: props,
            gap,
            headers,
          });

          return <AnimatedCellContainer {...props} style={cellStyle} />;
        }}
      />
    </View>
  );
}

function Row({data}: RowProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {id, ...rest} = data;

  const {gap, headers} = useContextSelector(TableContext, state => state);

  const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

  return (
    <View style={styles.rowWrapper}>
      <FlashList
        contentContainerStyle={styles.rowContent}
        data={Object.keys(rest)}
        estimatedItemSize={s(80)}
        keyExtractor={item => item}
        numColumns={headers?.length}
        scrollEnabled={false}
        // eslint-disable-next-line react/no-unstable-nested-components
        CellRendererComponent={props => {
          const cellStyle = getCellStyle({
            cellProps: props,
            gap,
            headers,
          });

          return <AnimatedCellContainer {...props} style={cellStyle} />;
        }}
        renderItem={({index, item}) => {
          const CustomComponent = headers?.[index]?.CustomComponent;

          if (CustomComponent) {
            return <CustomComponent data={data} />;
          }

          return <Cell value={data[item]} />;
        }}
      />
    </View>
  );
}

function Cell({value}: CellProps): JSX.Element {
  return (
    <View style={styles.cell}>
      <Text textStyle="bodyTextLarge">{value}</Text>
    </View>
  );
}

const line = () => <View style={styles.separator} />;

function Table({data, gap, headers}: TableProps): JSX.Element {
  const sortData = useMemo(() => {
    return sortDatas(data, headers);
  }, [data, headers]);

  return (
    <TableContextProvider gap={gap} headers={headers}>
      <View style={styles.container}>
        <Header />
        <FlashList
          ItemSeparatorComponent={line}
          contentContainerStyle={styles.content}
          data={sortData}
          estimatedItemSize={s(80)}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <Row data={item} />}
        />
      </View>
    </TableContextProvider>
  );
}

const styles = StyleSheet.create({
  cell: {
    height: s(80),
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.neutral.c100,
    borderColor: colors.neutral.c300,
    borderRadius: s(12),
    borderWidth: 1,
    height: s(896),
    overflow: 'hidden',
  },
  content: {
    backgroundColor: colors.neutral.c100,
  },
  headerCell: {
    height: s(56),
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: colors.supporting.red,
    height: s(56),
  },
  headerContent: {
    paddingHorizontal: vs(24),
  },
  rowContent: {
    paddingHorizontal: vs(24),
  },
  rowWrapper: {
    height: s(80),
  },
  separator: {
    backgroundColor: colors.neutral.c300,
    height: 1,
    marginHorizontal: vs(24),
  },
});

const MHeaderCell = memo(HeaderCell);

export default Table;
