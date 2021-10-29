import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../components/Themed';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

export default function messageScreen({ route }) {
   
    const { success } = route.params;
    const navigation = useNavigation()

    return (
        <View style={styles.container}>

            <Icon name={success ?  'check-circle' : 'alert-circle'} size={80} color={success ? '#169e02' : '#E53E3E'} style={{marginBottom: 20}}/>

            {success && (
                <>
                    <Text style={styles.title}>
                        SUCESSO!
                    </Text>
                    <Text>
                        Você confirmou sua presença!
                    </Text>
                </>
            )}

            {!success && (
                <>
                    <Text style={styles.title}>
                        Ops...
                    </Text>
                    <Text>
                        Algo deu errado.
                    </Text>
                </>
            )}

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    backButton: {
        width: '90%',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 10
    }
});
