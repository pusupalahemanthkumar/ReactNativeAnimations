import {
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import DATA from './Data/images';

const {width, height} = Dimensions.get('window');
const IMAGE_SIZE = 100;
const SPACING = 10;

const App = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef();
  const thumbRef = useRef();

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset : index * width ,
      animated : true,
    })
    if( index *(IMAGE_SIZE + SPACING) -IMAGE_SIZE/2  > width / 2 ){
      thumbRef?.current?.scrollToOffset({
        offset : index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE /2 ,
        animated : true,
      })

    }else{
      thumbRef?.current?.scrollToOffset({
        offset : 0,
        animated : true,
      })
    }
    
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={topRef}
        data={DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          console.log(Math.floor(ev.nativeEvent.contentOffset.x / width));
          const slideSize = ev.nativeEvent.layoutMeasurement.width;
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / slideSize),
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={{width, height }}>
              <Image
                source={{uri: item.imageUrl}}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          position: 'absolute',
          bottom: IMAGE_SIZE,
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item.imageUrl}}
                style={[
                  {
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 12,
                    marginRight: SPACING,
                    borderWidth: 2,
                    borderColor: activeIndex === index ? '#fff' : 'transparent',
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
});
