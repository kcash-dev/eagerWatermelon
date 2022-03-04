import { ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-snap-carousel';

//Components
import CarouselItem from './CarouselItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UpcomingHabit = ({ habitsList }) => {
    const habitWidth = windowWidth  * .9
    const habitHeight = windowHeight * .8
    const color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
    const [ carouselItems, setCarouselItems ] = useState([
        {
            name: habitsList[0].habitChain.name,
            color: habitsList[0].habitChain.backgroundColor,
            picture: habitsList[0].habitChain.picture
        },
        {
            name: habitsList[0].habitName,
            length: habitsList[0].habitLength,
            backgroundColor: color
        }
    ])

    return (
        <View>
            { habitsList?.length > 0 ?
                <Carousel
                    data={carouselItems}
                    renderItem={({ item }) => <CarouselItem  item={ item } />}
                    sliderWidth={ windowWidth }
                    itemWidth={ habitWidth }
                    sliderHeight={ windowHeight }
                    itemHeight={ habitHeight }
                />
                :
                null
            }
        </View>
    )
}

export default UpcomingHabit

const styles = StyleSheet.create({
    
})