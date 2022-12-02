import {StyleSheet, Text, View, Animated, Pressable} from 'react-native';
import React, {useState} from 'react';
/*
  // NEED A VALUE  0 1 2 3 4 5 6

  // THIS VALUE SHOULD BE TRANSFORMED INTO SOME OTHER VALUE

  // (0,0)  ==> (100, 50)

  // 60FS ==> 60 FRAMES PER SECOUND (60 UPDATES)


  1. Animated.spring works just like Animated.timing but with some bounce effect

  2. How is the animation actually played on the screen ?

    RN HAS TWO THREADS ==> UI THREAD (MAIN) AND JS THREAD (javascript runs)

    a. Computations ( animation values ) == JS threads And Animation by Native OS

    b. Everything by Native  OS

    (b) ===> Better
        No more over the bridge transfers
        JS thread is now free for other stuff
        Smoother animations

    (a) Process
        compute ==> 
        serialize => 
        transfer it over the bridge to host os==> 
        deserialise ==> 
        run the frame

    (b) Process 
        (before animation starts) serialize the whole animation thing ==>
        Native OS would deserialize it  ==>
        Done

  3. NOT ALL PROPERTIES ARE SUPPORT BY NATIVE DRIVERS


*/
const App = () => {
  const [value, setValue] = useState(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  );

  const leftValue = useState( new Animated.Value(0))[0];

  const opacityValue = useState( new Animated.Value(0))[0];

  const moveBall = () => {
    // Animated.timing(value, {
    //   toValue: {x: 100, y: 100},
    //   duration: 1000,
    //   useNativeDriver: false,
    // }).start();

    Animated.spring(value, {
      toValue: {x: 100, y: 100},
      // duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(leftValue,{
      toValue:100,
      duration:1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityValue,{
      toValue:1,
      duration:1000,
      useNativeDriver: true,
    }).start();

  };

  return (
    <View style={styles.container}>
      <Animated.View style={value.getLayout()}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
          }}></View>
      </Animated.View>
      <Pressable onPress={moveBall} style={{margin: 20}}>
        <Text style={styles.textM}>Tap Me!!</Text>
      </Pressable>

      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
            // marginLeft:leftValue,
            opacity:opacityValue,
          },
        ]}></Animated.View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textM: {
    color: 'red',
    borderRadius: 10,
    fontSize: 18,
    borderColor: 'red',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
