import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-native-snap-carousel';
import moment from "moment";

//Components
import CarouselItem from './CarouselItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UpcomingHabit = ({ habitsList, differenceInTime, minutesToMillis, setHabitTimeToTomorrow, habitTimesCollection }) => {
    const habitWidth = windowWidth  * .9
    const habitHeight = windowHeight * .8
    const [ carouselItems, setCarouselItems ] = useState([
        {
            name: habitsList[0].habitName,
            length: habitsList[0].habitLength,
            backgroundColor: habitsList[0].containerColor,
            habitTimeOfDay: habitsList[0].habitTimeOfDay,
            habitPeriodOfDay: habitsList[0].habitTime.time
        }
    ])

    const runCallback = (arg1, arg2) => {
        setHabitTimeToTomorrow(arg1, arg2)
    }
    
    useEffect(() => {
        const habitLengthMinutes = minutesToMillis(habitsList[0].habitLength.value)
        const removeItemTime = habitLengthMinutes - (habitLengthMinutes * 2)
        if(differenceInTime <= 0 && differenceInTime > removeItemTime) {
            setCarouselItems([
                {
                    name: habitsList[0].habitName,
                    length: habitsList[0].habitLength,
                    backgroundColor: habitsList[0].containerColor
                }
            ])
        } else if (differenceInTime < removeItemTime) {
            const timeNow = moment(moment().format())
            const habitTime = moment(moment(habitTimesCollection[0]).format())
            runCallback(habitTime, timeNow)
        } else {
            setCarouselItems([
                {
                    name: habitsList[0].habitChain.name,
                    color: habitsList[0].habitChain.backgroundColor,
                    picture: habitsList[0].habitChain.picture
                },
                {
                    name: habitsList[0].habitName,
                    length: habitsList[0].habitLength,
                    backgroundColor: habitsList[0].containerColor
                }
            ])
        }
    }, [ differenceInTime ])
    

    return (
        <View>
            { habitsList?.length > 0 ?
                <Carousel
                    data={carouselItems}
                    renderItem={({ item }) => <CarouselItem item={ item } />}
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