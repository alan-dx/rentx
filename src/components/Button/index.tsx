import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  isEnabled?: boolean;
  loading?: boolean;
}

export function Button({ title, color, isEnabled = true, loading = false, ...rest }: ButtonProps) {

  const theme = useTheme()

  return (
    <Container
      {...rest}
      color={color ? color: theme.colors.main}
      enabled={isEnabled}
      style={{ opacity: (isEnabled === false || loading === true )? .5 : 1}}
    > 
    {
      loading
      ?
        <ActivityIndicator color={theme.colors.shape} />
      :
        <Title>{title}</Title>
    }
    </Container>
 );
}