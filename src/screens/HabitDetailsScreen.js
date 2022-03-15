import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HabitDetailsScreen = ({ route }) => {
    const { item } = route.params;

    console.log(item)
    return (
        <View>
        <Text>This is the Habit Details Screen</Text>
        </View>
    )
}

export default HabitDetailsScreen

const styles = StyleSheet.create({})