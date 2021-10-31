import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import {
  Container
} from './styles';

interface Props extends BorderlessButtonProps {
  color?: string;
  onPress: () => void;
}

export function BackButton({ color, onPress, ...rest }: Props) {
  const theme = useTheme();


  return (
    <Container {...rest} onPress={onPress}>
      <MaterialIcons
        name="chevron-left"
        size={54}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}