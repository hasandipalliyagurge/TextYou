import React, { useState } from 'react';
import {SafeAreaView, Text, View } from 'react-native';
import {globalStyle, color } from '../../utility';
import Logo from '../../component/logo';
import InputField from '../../component/input';
import RoundCornerButton from '../../component/button/RoundCornerButton';
//import { SignUp } from '..';



const SignUp= ({navigation}) => {
const [credentials, setCredentials] = useState({
    name: '',
    email:'',
    password:'',
    confirmPassword:'',
});
const {name,email,password,confirmPassword} = credentials;

onSignUpPress = () => {
    if(!name){
        alert('Name is rquired'); 
    }
    else if(!email){
        alert('Email is required');
    }else if(!password){
        alert('Password is required');
    }else if(password !== confirmPassword){
        alert('Password did not match!');
    }else{
        alert(JSON.stringify(credentials));
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
                <InputField placeholder="Enter Name" 
                value={name}
                onChangeText={(text)=>handleOnChange('name', text)}
                />
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
                <InputField placeholder="Confirm Password" 
                secureTextEntry={true} 
                value={confirmPassword}
                onChangeText={(text)=>handleOnChange('confirmPassword', text)}
                />

                <RoundCornerButton title="SignUp"  onPress={() => onSignUpPress()} />
                <Text style={{
                    fontSize:28,
                    fontWeight:'bold',
                    color: color.LIGHT_GREEN,
                }} 
                onPress={()=> navigation.navigate('Login')}>
                    Login
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;