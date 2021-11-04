import React from 'react';
import { Button, Dimensions, StyleSheet } from 'react-native';

const WIDTH = Dimensions.get('window').width;

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import {
  Container
} from './styles';

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bezier(0, 1.9, 1, -1.38)
          })
        }
      ]
    }
  })


  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }


  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})