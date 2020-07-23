import React from 'react';
import {SafeAreaView, Text, View } from 'react-native';
import {globalStyle, color } from '../../utility';
import Logo from '../../component/logo';
import InputField from '../../component/input';
import RoundCornerButton from '../../component/button/RoundCornerButton';
//component\logo
const Login= ({navigation}) => {
    return (
        <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
            <View style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
                <Logo/>

            </View>
            <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                <InputField placeholder="Enter Email" />
                <InputField placeholder="Enter Password" secureTextEntry={true}/>
                <RoundCornerButton title="Login" />
            </View>
        </SafeAreaView>
    );
};

export default Login;