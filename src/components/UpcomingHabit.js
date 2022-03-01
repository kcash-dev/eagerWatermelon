import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';

//Theme
import { colors, fontSizes, sizes } from '../../theme/Variables'

const UpcomingHabit = ({ habitsList }) => {
    console.log(habitsList, "LIST")
    return (
        <View>
            { habitsList?.length > 0 ?
                <View style={ styles.initialHabit }>
                    <ImageBackground 
                        source={{ uri: habitsList[0].habitChain.picture }}
                        style={[ styles.imageBackground, { width: '100%', height: '100%' }]}
                        resizeMode='cover'
                        imageStyle={{ borderRadius: 8 }}
                    >
                        <View style={[styles.overlay, { backgroundColor: habitsList[0].habitChain.backgroundColor } ]} />
                        <Text style={ styles.titleText }>{ habitsList[0].habitChain.name }</Text>
                    </ImageBackground>
                </View>
                :
                null
            }
        </View>
    )
}

export default UpcomingHabit

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