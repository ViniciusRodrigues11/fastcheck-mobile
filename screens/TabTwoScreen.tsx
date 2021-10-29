import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import Header from '../components/Header';

import { View, Text } from '../components/Themed';
import { MotiView } from 'moti';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../hooks/AuthContext'
import api from '../services/api';
import {format, parseISO} from 'date-fns'

import avatarImage from '../assets/images/avatar.png'

interface userProps {
  id: string,
  name: string,
  cpf: string,
  email: string,
}

export default function TabTwoScreen() {
  const isFocused = useIsFocused();
  const { signOut } = useAuth()
  const [user, setUser] = useState<userProps>()
  const [checks, setChecks] = useState()

  useEffect(() => {
    api.get('/profile').then(response => {
      if (response.data) {
        setUser(response.data)

        api.get('/check/student/list').then(response => setChecks(response.data))

      }
    }).catch(err => {
      // nothing
    })
  }, [isFocused])

  const renderList = (item) => {
    return (
      <View style={[item.isChecked ? { borderLeftColor: 'green' } : { borderLeftColor: 'red' }, styles.checkItem]}>
        <View style={styles.checkTexts}>
          <Text style={styles.disciplineText}>{item.name}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <Text>{format(parseISO(item.created_at), "dd'/'MM'/'yy")}</Text>
      </View>
    )
  }

  const key = (item) => {
  
   return item.id
  }
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


      <View style={styles.avatarBox}>
        <Image source={avatarImage} resizeMode='stretch' resizeMethod='scale' style={styles.avatar} />
        <Text style={styles.userName}>{user?.name}</Text>

        <TouchableOpacity onPress={() => signOut()}>
          <Text style={{ color: 'red' }}>Sair</Text>

        </TouchableOpacity>
      </View>

      <View style={styles.checksList}>
        <Text style={styles.checksListTitle}>Meus Checks</Text>
        {checks && (
          <FlatList
            style={{ marginTop: 10 }}
            data={checks}
            renderItem={({item}) => renderList(item)}
            keyExtractor={item => item.check_id}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
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
  avatarBox: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'column',
    padding: 10
  },
  avatar: {
    width: 100,
    height: 100
  },
  userName: {
    fontSize: 16,
    marginTop: 10
  },
  checksList: {
    marginTop: 40,
    flex: 1,
  },
  checksListTitle: {
    padding: 5,
    fontSize: 16
  },
  checkItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 2,
    marginBottom: 8,
    elevation: 1
  },
  checkTexts: {
    display: 'flex',
    flexDirection: 'column'
  },
  disciplineText: {
    fontSize: 18,
    color: '#666'
  },
  descriptionText: {
    fontSize: 12,
    color: '#666'
  }
});
