// /* eslint-disable react/no-unstable-nested-components */
// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {
//   IcHome,
//   IcKeyAccount,
//   IcNoteTask,
//   IcPipeline,
//   IcUser,
// } from '../assets/svgs';
// import Header from '../components/Hedaer';
// import {BottomNavigatorParamList} from '../interfaces/NavigationInterface';
// import HomeScreen from '../screens/Home/HomeScreen';
// import KeyAccountScreen from '../screens/KeyAccount/KeyAccountScreen';
// import NoteTaskScreen from '../screens/NoteTask/NoteTaskScreen';
// import PipelineScreen from '../screens/Pipeline/PipelineScreen';
// import ProfileScreen from '../screens/Profile/ProfileScreen';
// import {colors, globalStyles} from '../styles';
// import {s, vs} from '../utils/scale';

// const Tab = createBottomTabNavigator<BottomNavigatorParamList>();
// const iconSize = s(24);

// function BottomNavigator() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       initialRouteName="HomeScreen"
//       screenOptions={{
//         tabBarActiveTintColor: colors.bciRed,
//         tabBarInactiveTintColor: colors.darkGray,
//         tabBarLabelStyle: styles.label,
//         tabBarStyle: {
//           height: vs(50) + insets.bottom,
//           paddingBottom: insets.bottom,
//         },
//       }}>
//       <Tab.Screen
//         component={HomeScreen}
//         name="HomeScreen"
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <IcHome
//               color={focused ? colors.bciRed : colors.darkGray}
//               height={iconSize}
//               width={iconSize}
//             />
//           ),
//           tabBarLabel: 'Home',
//         }}
//       />
//       <Tab.Screen
//         component={NoteTaskScreen}
//         name="NoteTaskScreen"
//         options={{
//           tabBarIcon: ({focused}) => (
//             <IcNoteTask
//               color={focused ? colors.bciRed : colors.darkGray}
//               height={iconSize}
//               width={iconSize}
//             />
//           ),
//           tabBarLabel: 'Notes & Tasks',
//         }}
//       />
//       <Tab.Screen
//         component={PipelineScreen}
//         name="PipelineScreen"
//         options={{
//           headerTitle: 'Pipeline',
//           tabBarIcon: ({focused}) => (
//             <IcPipeline
//               color={focused ? colors.bciRed : colors.darkGray}
//               height={iconSize}
//               width={iconSize}
//             />
//           ),
//           tabBarLabel: 'Pipeline',
//         }}
//       />
//       <Tab.Screen
//         component={KeyAccountScreen}
//         name="KeyAccountScreen"
//         options={{
//           headerTitle: 'Key Account',
//           tabBarIcon: ({focused}) => (
//             <IcKeyAccount
//               color={focused ? colors.bciRed : colors.darkGray}
//               height={iconSize}
//               width={iconSize}
//             />
//           ),
//           tabBarLabel: 'Key Account',
//         }}
//       />
//       <Tab.Screen
//         component={ProfileScreen}
//         name="ProfileScreen"
//         options={{
//           header: props => <Header {...props} />,
//           tabBarIcon: ({focused}) => (
//             <IcUser
//               color={focused ? colors.bciRed : colors.darkGray}
//               height={iconSize}
//               width={iconSize}
//             />
//           ),
//           tabBarLabel: 'Profile',
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   label: {
//     fontFamily: 'OpenSans-Regular',
//     fontSize: s(12),
//   },
// });

// export default BottomNavigator;
