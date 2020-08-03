import React from 'react';
import { View,Text } from 'react-native';
import { globalStyle, color } from '../../utility';
import Logo from '../../component/logo';

const Splash = () => {
    return (
        <View
            style= {[globalStyle.containerCentered, {backgroundColor: color.BLACK}]
        }>
            <Logo />
        </View>
    );
};

export default Splash;