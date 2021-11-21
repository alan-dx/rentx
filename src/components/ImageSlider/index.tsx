import React from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface ImageSliderProps {
  imagesUrl: string[]
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
        {imagesUrl.map((_, index) => (
          <ImageIndex
            key={String(index)}
            active={imageIndex === index} 
          />
        ))}
      </ImageIndexes>

        <FlatList 
          data={imagesUrl}
          keyExtractor={key => key}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <CarImageWrapper>
              <CarImage 
                source={{uri: item}}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
          onViewableItemsChanged={indexChanged.current}
        />
    </Container>
 );
}