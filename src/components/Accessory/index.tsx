import React from 'react';
import { SvgProps } from 'react-native-svg';

import {
  Container,
  Name
} from './styles';

interface AccessoryProps {
  name: string;
  icon: React.FC<SvgProps>
}

export function Accessory({
  name,
  icon: Icon
}: AccessoryProps) {
  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
 );
}