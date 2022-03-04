import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

//Theme
import { colors, fontSizes, sizes } from '../../theme/Variables'

const CarouselItem = ({ item }) => {
  return (
    <View style={ styles.initialHabit }>
        <ImageBackground 
            source={{ uri: item.picture }}
            style={[ styles.imageBackground, { width: '100%', height: '100%' }]}
            resizeMode='cover'
            imageStyle={{ borderRadius: 8 }}
        >
            <View style={[styles.overlay, { backgroundColor: item.backgroundColor } ]} />
            <Text style={ styles.titleText }>{ item.name }</Text>
        </ImageBackground>
    </View>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
    initialHabit: {
        width: '95%',
        height: '80%',
        backgroundColor: colors.black,
        borderRadius: 8,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: sizes.xl
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 8,
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: colors.white,
        fontSize: fontSizes.xl,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})