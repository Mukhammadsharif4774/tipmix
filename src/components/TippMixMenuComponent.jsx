import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View style={styles.main}>
      <Image source={item?.image} style={styles.image} />

      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          height: 100,
        }}>
        <Text style={styles.title}>{item?.name}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.row}>
          <TouchableOpacity onPress={toggleCart}>
            <Text style={styles.button}>{added ? 'УБРАТЬ' : 'КУПИТЬ'}</Text>
          </TouchableOpacity>

          <Text style={styles.price}>{item?.price} $</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '47%',
    alignSelf: 'center',
    height: 200,
    marginTop: 35,
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    objectFit: 'contain',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '100%',
    height: 40,
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '100%',
    marginTop: 2,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontFamily: FONTS.black,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginLeft: 10,
    color: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: COLORS.main,
    borderWidth: 1,
  },
  button: {
    fontFamily: FONTS.black,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.black,
    borderColor: COLORS.black,
    backgroundColor: COLORS.main,
    width: width * 0.28,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 8,
  },
});
