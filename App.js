import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import tinycolor from 'tinycolor2';
import {LinearGradient} from 'expo-linear-gradient';

export default function App() {
  // Returns a random color to be used on DrumButton creation
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  function getLighterColor(color) {
    const baseColor = tinycolor(color);
    const lighterColor = baseColor.lighten(10).toString();
    return lighterColor;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.horizontalContainer}>
        <DrumButton sound="0" color={getRandomColor()}/>
        <DrumButton sound="1" color={getRandomColor()}/>
        <DrumButton sound="2" color={getRandomColor()}/>
      </View>
      <View style={styles.horizontalContainer}>
        <DrumButton sound="3" color={getRandomColor()}/>
        <DrumButton sound="4" color={getRandomColor()}/>
        <DrumButton sound="5" color={getRandomColor()}/>
      </View>
      <View style={styles.horizontalContainer}>
        <DrumButton sound="6" color={getRandomColor()}/>
        <DrumButton sound="7" color={getRandomColor()}/>
        <DrumButton sound="8" color={getRandomColor()}/>
      </View>
    </View>
  );
}
// A button where you pass the audio number as a prop
const DrumButton = (props) => {
  const sounds = [
    require(`./assets/sounds/0.wav`),
    require(`./assets/sounds/1.wav`),
    require(`./assets/sounds/2.wav`),
    require(`./assets/sounds/3.wav`),
    require(`./assets/sounds/4.wav`),
    require(`./assets/sounds/5.wav`),
    require(`./assets/sounds/6.wav`),
    require(`./assets/sounds/7.wav`),
    require(`./assets/sounds/8.wav`),
  ];

  const [soundObj, setSoundObj] = React.useState(null);

  // We are going to create a new sound on every click, allowing them to overlap
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(sounds[props.sound]);
    setSoundObj(sound);
    await sound.replayAsync();
  }

  const gradientColors = [props.color, tinycolor(props.color).lighten(20).toString()];

  return (
    <TouchableOpacity onPress={playSound}>
      <LinearGradient
          style={styles.button}
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 1]}
      ></LinearGradient>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#202123",
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10
  },
});
