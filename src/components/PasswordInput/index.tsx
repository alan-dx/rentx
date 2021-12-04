import React from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';


import { useTheme } from 'styled-components';

import {
  Container,
  InputText,
  IconContainer,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  // value?: string;
};

export function PasswordInput({
  iconName,
  value,
  ...rest
}: InputProps) {

  const [isPasswordVisible, setPasswordVisible] = React.useState(true)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isFilled, setIsFilled] = React.useState(false)
  const theme = useTheme()

  function handlePasswordVisibilityChange() {
    setPasswordVisible(prevState => !prevState)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused} >
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled )? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
        autoCorrect={false}

      />

      <BorderlessButton onPress={handlePasswordVisibilityChange} >
        <IconContainer isFocused={isFocused} >
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />  
        </IconContainer>
      </BorderlessButton>
    </Container>
 );
}