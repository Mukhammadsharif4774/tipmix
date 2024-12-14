import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import TippMixHeader from '../components/TippMixHeader';
import {useNavigation} from '@react-navigation/native';
import Event_1 from '../assets/event_1.png';
import Event_2 from '../assets/event_2.png';
import Event_3 from '../assets/event_3.png';
import Event_4 from '../assets/event_4.png';
import Event_5 from '../assets/event_5.png';
import Event_6 from '../assets/event_6.png';

const events = [
  {title: 'Вечер Игр', image: Event_1, time: '19.12.2024'},
  {
    title: 'КиноВечер',
    image: Event_2,
    time: '20.12.2024',
  },
  {title: 'Бургерная Битва', image: Event_3, time: '23.12.2024'},
  {title: 'Турнир', image: Event_4, time: '30.12.2024'},
  {title: 'Футбольный Бранч', image: Event_5, time: '08.01.2025'},
  {title: 'Барбекю', image: Event_6, time: '11.01.2025'},
];

const EventButton = ({title, image, onPress, index, time}) => (
  <>
    <Text style={styles.time}>{time}</Text>
    <TouchableOpacity style={styles.button} onPress={() => onPress(image)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </>
);

export default function () {
  const navigation = useNavigation();

  const handlePress = image => {
    navigation.navigate('DrawerNavigator', {
      screen: 'TippMixEventDetailScreen',
      params: {image},
    });
  };

  return (
    <View style={styles.container}>
      <TippMixHeader />

      <View style={styles.content}>
        {events.map((event, index) => (
          <EventButton
            key={index}
            index={index}
            title={event.title}
            image={event.image}
            onPress={handlePress}
            time={event.time}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.main,
  },
  button: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.main,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: COLORS.blue,
  },
  title: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.blue,
    textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: width,
    marginTop: '10%',
  },
  time: {
    marginTop: 15,
    marginBottom: 3,
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.black,
    width: '100%',
    textAlign: 'center',
  },
});
