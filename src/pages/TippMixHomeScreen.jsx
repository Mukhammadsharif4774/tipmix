import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {AppContext} from '../components/AppContext';
import TippMixHeader from '../components/TippMixHeader';
import TippMixMenuComponent from '../components/TippMixMenuComponent';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {tippmixProducts} from '../helpers/tippmixProducts';

const categories = [
  {label: 'Холодные закуски'},
  {label: 'Супы'},
  {label: 'Основные блюда'},
  {label: 'Десерты'},
];

const OnwSportCategoryButton = ({label, active, onPress, image}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.categoryButton,
      {backgroundColor: active ? COLORS.main : 'transparent'},
    ]}>
    <Text style={styles.category}>{label}</Text>
  </TouchableOpacity>
);

export default function TippMixHomeScreen() {
  const [category, setCategory] = useState(0);
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);

  const handleCategoryChange = index => {
    setCategory(index);
    toggleRefresh(!shouldRefresh);
  };

  return (
    <View style={styles.container}>
      <TippMixHeader />

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <OnwSportCategoryButton
            key={index}
            label={item.label}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
            image={item?.image}
          />
        ))}
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        {tippmixProducts[category].map((product, index) => (
          <TippMixMenuComponent key={index} item={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width,
    marginVertical: 15,
  },
  categoryButton: {
    width: '47%',
    height: 35,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: COLORS.main,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    fontFamily: FONTS.black,
    color: COLORS.black,
    fontSize: 16,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  main: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
