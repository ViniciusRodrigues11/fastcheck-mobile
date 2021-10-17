import * as React from 'react';
import { StyleSheet } from 'react-native';
import Header from '../components/Header';

import { View } from '../components/Themed';
import { MotiView } from 'moti';
import { useIsFocused } from '@react-navigation/native';

export default function TabTwoScreen() {
  const isFocused = useIsFocused();

  return (

    <View style={styles.container}>
      {isFocused && (
        <MotiView

          transition={{ type: 'timing', duration: 500 }}
          from={{
            transform: [{ translateY: 0 }],
            opacity: 0.2
          }}
          animate={{
            transform: [{ translateY: -10 }],
            opacity: 1
          }}
        >
          <Header name="Perfil" />
        </MotiView>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
