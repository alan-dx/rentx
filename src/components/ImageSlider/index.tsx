import React from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Bullet } from '../Bullet'

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
} from './styles';

interface ImageSliderProps {
  imagesUrl: {
    id: string;
    photo: string
  }[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[]
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = React.useState(0)

  //useRef returns the same object on every render
  const indexChanged = React.useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index;

    setImageIndex(index)
  })

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet
            key={String(item.id)}
            active={imageIndex === index} 
          />
        ))}
      </ImageIndexes>

        <FlatList 
          data={imagesUrl}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <CarImageWrapper>
              <CarImage 
                source={{uri: item.photo}}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
          onViewableItemsChanged={indexChanged.current}
        />
    </Container>
 );
}