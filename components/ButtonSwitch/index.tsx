import React, { useEffect, useState } from 'react'
import { View, Image, Text, FlatList, ActivityIndicator, TouchableOpacity, Dimensions, Modal } from 'react-native'
import styles from './style'
import Navigation from '../../navigation'

const ButtonSwitch = (props) => {
    const [loading, setLoading] = useState(true)
    const { label } = props

    useEffect(() => {
        //console.log(props)
    }, [])

    return (
        <View style={styles.button}>
            <Text style={styles.text}>{label}</Text>
        </View>
    )
}

export default ButtonSwitch;