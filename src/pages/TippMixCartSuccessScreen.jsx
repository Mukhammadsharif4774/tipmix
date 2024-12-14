import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import TippMixHeader from '../components/TippMixHeader';
import TippMixComponent from '../components/TippMixComponent';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'TippMixHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <TippMixHeader />

      <Text style={styles.text}>Спасибо за {'\n'} заказ!</Text>

      <View style={styles.qrContainer}>
        <QRCode
          value="https://www.tippmix.hu/mobil/sportfogadas"
          size={Dimensions.get('window').width / 2.5}
          color={COLORS.blue}
        />
      </View>

      <TippMixComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: '25%',
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  successIcon: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 35,
    marginTop: '15%',
    paddingVertical: 15,
    backgroundColor: COLORS.blue,
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    alignSelf: 'center',
    objectFit: 'contain',
    marginTop: 20,
  },
});
