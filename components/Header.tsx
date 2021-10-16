import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native';

interface headerProps {
    name: string;
}

export default function Header({ name }: headerProps) {
    return (
        <View
            
            style={styles.header}
        >
            <Text style={styles.title}>
                FastCheck
                <FontAwesome name="check" size={14} color="#ff5566" />
            </Text>
            <Text style={{ opacity: 0.5 }}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
})