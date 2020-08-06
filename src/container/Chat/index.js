import React, {useLayoutEffect, useState, seEffect, Fragment, useEffect} from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { globalStyle, color, appStyle } from '../../utility';
import styles from './style';
import { InputField, ChatBox } from '../../component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';

const Chat = ({route, navigation}) => {
    const {params}=route;
    const {name, img, imgText, guestUserId, currentUserId }= params;
    const [msgValue, setMsgValue]=useState('');
    const [messages, setMessages] =useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: <Text>{name}</Text>,
        });
      }, [navigation]);

      useEffect(()=> {
        try {
        firebase
            .database()
            .ref('messeges')
            .child(currentUserId)
            .child(guestUserId)
            .on('value', (dataSnapshot) => {
            let msgs = [];
            dataSnapshot.forEach((child) => {
                msgs.push({
                sendBy: child.val().messege.sender,
                recievedBy: child.val().messege.reciever,
                msg: child.val().messege.msg,
                img: child.val().messege.img,
                });
            });
            setMessages(msgs);
            });
          } catch (error) {
            alert(error);
          }
      },[])

    const handleSend = () => {
        if(msgValue){

        }

        setMsgValue('');

    };
    
    const handleCamera=()=>{
    const option ={
      storageOptions:{
        skipBackup:true
      }
    };
    ImagePicker.showImagePicker(option, (response) => {
      if(response.didCancel){
        console.log('User cancel image picker')
      }
      else if(response.error){
        console.log('Image picker error',response.error)
      }
      else{
        //base 64
        let source = 'data:image/jpeg;base64,' + response.data; 
      }
    });
    };
  

    const handleOnChange=(text)=> {
        setMsgValue(text);
    };

    
    return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
      <FlatList
        inverted
        data={messages}
        keyExtractor={(_,index)=>index.toString()}
        renderItem={({item}) => (
            <ChatBox
                msg={item.msg}
                userId={item.sendBy}
                img={item.img}
                onImgTap={() => imgTap(item.img)}
            />
        )}
        />
    {/*send msg*/}
    <View styles={styles.sendMessageContainer}>
    <InputField
        placeholder="Type Here..."
        numberOfLines={10}
        inputStyle={styles.input}
        value={msgValue}
        onChangeText={(text) => handleOnChange(text)}
    />
    <View styles={styles.sendBtnContainer}>
     <MaterialCommunityIcons
        name="camera"
        color={color.WHITE}
        size={appStyle.fieldHeight}
        onPress={() => handleCamera()}
    />
    <MaterialCommunityIcons
        name="send-circle"
        color={color.WHITE}
        size={appStyle.fieldHeight}
        onPress={() => handleSend()}
    />
    </View>
    </View> 
    </SafeAreaView>
 );
};
export default Chat;