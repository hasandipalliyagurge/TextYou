import React, { useLayoutEffect, Fragment } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { globalStyle, color } from '../../utility';

const ShowFullImg=({route, navigation}) => {
    const {params}= route;
    const {name, img, imgText} = params;

    useLayoutEffect ( ()=>{
        navigation.setOptions({
            headerTitle: <Text>{name}</Text>
        })
    },[navigation])

    return (
        <Fragment>
        {img ? (
            <Image source={{uri:img}} style={[globalStyle.flex1]}
            resizeMode="cover"/>

        ):(
            <View style={[globalStyle.containerCentered, {backgroundColor: color.BLACK}]}>
                <Text style={style.text}>{imgText}</Text>
            </View>
        )}
        </Fragment>
       
    );
};

const style=StyleSheet.create({
    text: {color: color.WHITE, fontSize: 200, fontWeight: 'bold'},
});

export default ShowFullImg;