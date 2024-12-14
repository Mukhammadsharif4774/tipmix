import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import TippMixHomeScreen from './pages/TippMixHomeScreen';
import TippMixCartScreen from './pages/TippMixCartScreen';
import TippMixCartSuccessScreen from './pages/TippMixCartSuccessScreen';
import TippMixReservationScreen from './pages/TippMixReservationScreen';
import TippMixReservationSuccessScreen from './pages/TippMixReserveSuccessScreen';
import TippMixContactsScreen from './pages/TippMixContactsScreen';
import TippMixEventsScreen from './pages/TippMixEventsScreen';
import TippMixEventDetailScreen from './pages/TippMixEventDetailScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/cart_icon.png';
import Logo from './assets/logo.png';
import TippMixTranslationsScreen from './pages/TippMixTranslationsScreen';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.main,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'ГЛАВНАЯ', screen: 'TippMixHomeScreen'},
    {label: 'КОРЗИНА', screen: 'TippMixCartScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'TippMixTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'TippMixContactsScreen'},
    {label: 'РЕЗЕРВ СТОЛИКА', screen: 'TippMixReservationScreen'},
    {label: 'СОБЫТИЯ', screen: 'TippMixEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={
              screen === 'TippMixHomeScreen'
                ? styles.drawerItemFirst
                : styles.drawerItem
            }>
            <Text
              style={
                screen === 'TippMixHomeScreen'
                  ? styles.itemTextFirst
                  : styles.itemText
              }>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('TippMixCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </View>
  );
}

const drawerScreens = [
  {name: 'TippMixHomeScreen', component: TippMixHomeScreen},
  {name: 'TippMixCartScreen', component: TippMixCartScreen},
  {name: 'TippMixCartSuccessScreen', component: TippMixCartSuccessScreen},
  {name: 'TippMixReservationScreen', component: TippMixReservationScreen},
  {
    name: 'TippMixReservationSuccessScreen',
    component: TippMixReservationSuccessScreen,
  },
  {name: 'TippMixContactsScreen', component: TippMixContactsScreen},
  {name: 'TippMixEventsScreen', component: TippMixEventsScreen},
  {name: 'TippMixEventDetailScreen', component: TippMixEventDetailScreen},
  {name: 'TippMixTranslationsScreen', component: TippMixTranslationsScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40,
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: width,
  },
  drawerItemFirst: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: COLORS.blue,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    backgroundColor: COLORS.main,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: COLORS.blue,
  },
  itemText: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.blue,
    textAlign: 'center',
  },
  itemTextFirst: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.blue,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
