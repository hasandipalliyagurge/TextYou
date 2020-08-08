import React, { useState, useContext } from 'react';
import {SafeAreaView, Text, View, Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native';
import {globalStyle, color } from '../../utility';
import Logo from '../../component/logo';
import InputField from '../../component/input';
import RoundCornerButton from '../../component/button/RoundCornerButton';
import { Store } from '../../context/store';
import { LOADING_STOP, LOADING_START } from '../../context/actions/types';
import { LoginRequest } from '../../network';
import { setAsyncStorage,keys } from '../../asyncStorage';
import { setUniqueValue, keyboardVerticalOffset } from '../../utility/constants';
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

//component\logo
const Login= ({navigation}) => {

const globalState = useContext(Store);
const { dispatchLoaderAction } = globalState;
const [showLogo, toggleLogo] = useState(true);

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
        if (!res.additionalUserInfo) {
            dispatchLoaderAction({
                type:LOADING_STOP,
            });
            alert(res);
            return;
        }
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

//on focus input
const handleFocus= () =>{
    setTimeout(()=>{
        toggleLogo(false);
    });
};
//on blur input
const handleBlur=() =>{
    setTimeout(()=>{
        toggleLogo(true);
    });
};

    return (
        <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
        <SafeAreaView
         style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}
         >
            {showLogo && (
            <View style={[globalStyle.containerCentered]}>
              <Text>{"\n"}</Text>
              <Logo />
              <Text>{"\n"}</Text>
              <Text style={{fontSize: 19, color:'white', textAlign: "center"}}> H.N. Palliyaguruge</Text>
              <Text style={{fontSize: 19, color:'white', textAlign: "center"}}> 17001201</Text>
            </View>
          )}
            <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                <InputField placeholder="Enter Email" 
                value={email}
                onChangeText={(text)=>handleOnChange('email', text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                />
                <InputField 
                placeholder="Enter Password" 
                secureTextEntry={true} 
                value={password}
                onChangeText={(text)=>handleOnChange('password', text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
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

              
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;