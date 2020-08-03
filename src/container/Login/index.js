import React, { useState, useContext } from 'react';
import {SafeAreaView, Text, View } from 'react-native';
import {globalStyle, color } from '../../utility';
import Logo from '../../component/logo';
import InputField from '../../component/input';
import RoundCornerButton from '../../component/button/RoundCornerButton';
import { Store } from '../../context/store';
import { LOADING_STOP, LOADING_START } from '../../context/actions/types';
import { LoginRequest } from '../../network';
import { setAsyncStorage,keys } from '../../asyncStorage';
import { setUniqueValue } from '../../utility/constants';

//component\logo
const Login= ({navigation}) => {

const globalState = useContext(Store);
const { dispatchLoaderAction } = globalState;

const [credentials, setCredentials] = useState({
    email: '',
    password:'',
});
const {email,password} = credentials;

onLongPress=()=>{
    if(!email){
        alert('Email is required');
    }else if(!password){
        alert('Password is required');
    }else{
        dispatchLoaderAction({
            type: LOADING_START,
        });
    //    setTimeout( () => {
    //     dispatchLoaderAction({
    //         type: LOADING_STOP,
    //     });

    //    }, 2000)
    LoginRequest(email,password)
    .then((res)=>{
        setAsyncStorage(keys.uuid, res.user.uid);
        setUniqueValue(res.user.uid);
        dispatchLoaderAction({
            type:LOADING_STOP,
        });
        navigation.replace('Dashboard');
    })
    .catch((err)=>{
        dispatchLoaderAction({
            type:LOADING_STOP,
        });
        alert(err);
    });
    }
};

const handleOnChange= (name,value)=>{
    setCredentials({
        ...credentials,
        [name]: value,
    });
};

    return (
        <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
            <View style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
                <Logo/>

            </View>
            <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                <InputField placeholder="Enter Email" 
                value={email}
                onChangeText={(text)=>handleOnChange('email', text)}
                />
                <InputField 
                placeholder="Enter Password" 
                secureTextEntry={true} 
                value={password}
                onChangeText={(text)=>handleOnChange('password', text)}
                />
                <RoundCornerButton title="Login"  onPress={()=>onLongPress()}/>
                <Text style={{
                    fontSize:28,
                    fontWeight:'bold',
                    color: color.LIGHT_GREEN,
                }} onPress={()=> navigation.navigate('SignUp')}>
                    Sign Up
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Login;