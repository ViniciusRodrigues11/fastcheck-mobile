import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import {useAuth} from '../hooks/AuthContext'
import Header from '../components/Header'
import { MotiView } from 'moti';
import api from '../services/api';


const window = Dimensions.get('window');

interface barcodeProps {
  data: string
}

function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  const {user} = useAuth()

  const navigation =  useNavigation()

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = async ({ data }: barcodeProps) => {
    setScanned(true);
    try{
     await api.put('/check', {
        check_id: data,
        user_id: user.id
      })

      navigation.navigate('MessageScreen', {success: true})
      setScanned(false)

    }catch(err: any){
      navigation.navigate('MessageScreen', {success: false})
      setScanned(false)
    }
  };

  return (
    <View style={styles.container} >
      <MotiView
        from={{
          transform: [{ translateY: -10 }],
          opacity: 0.2
        }}
        animate={{
          transform: [{ translateY: 0 }],
          opacity: 1
        }}
        transition={{type: 'timing', duration: 500}}
      >
        <Header name="Novo Check" />
      </MotiView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.qrbox}>
          {isFocused && (
            <Camera
              style={styles.camera}
              type={'back'}
              zoom={0.35}
              ratio={'4:3'}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
            />
          )}
        </View>
        <View style={styles.qrtips}>
          <FontAwesome name="info-circle" size={20} style={{ marginRight: 8 }} color="#fff" />
          <Text style={styles.tipText}>
            Alinhe o QRCode na tela para marcar sua presença!
        </Text>

        </View>

      </View>
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
  camera: {
    flex: 1,
    borderRadius: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  qrbox: {
    width: window.width - 30,
    minHeight: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  },
  qrtips: {
    width: window.width - 30,
    backgroundColor: '#ff5566',
    opacity: 0.8,
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tipText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12
  }
});


export default TabOneScreen