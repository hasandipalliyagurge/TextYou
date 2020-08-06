import React, { useLayoutEffect, useContext, useEffect, useState } from 'react';
import {View, Text, Alert, FlatList, SafeAreaView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { color, globalStyle } from '../../utility';
import LogOutUser from '../../network/logout';
import { clearAsyncStorage } from '../../asyncStorage';
//import firebase from '../../firebase/config';
import firebase from 'firebase';
import { LOADING_STOP, LOADING_START } from '../../context/actions/types';
import { uuid} from '../../utility/constants';
import { Profile, ShowUsers } from '../../component';
//import { database } from 'firebase';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { Store } from '../../context/store';
import { UpdateUser } from '../../network';


const Dashboard= ({navigation}) => {
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        profileImg: '',
      });
      //const [getScrollPosition, setScrollPosition] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const { profileImg, name } = userDetail;
       
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
            <SimpleLineIcon 
                name="logout" 
                size={26} 
                color={color.WHITE} 
                style={{right: 10}}
                onPress= {() => 
                    Alert.alert(
                        'Logout', 
                        'Are you sure to log out', 
                    [
                    {
                        text:'Yes',
                        onPress:() => logout(),
                    },
                    {
                        text:'No'
                    }  
                ],{
                   cancelable:false  
                })}
                />
        ),
        });
    },[navigation]);

useEffect(()=>{
dispatchLoaderAction({
    type: LOADING_START,
});
try{
    firebase
    .database()
    .ref('users')
    .on('value', (dataSnapShot) => {
        let users = [];
        let currentUser = {
          id: '',
          name: '',
          profileImg: '',
        };
        dataSnapShot.forEach((child) => {
          if (uuid === child.val().uuid) {
            currentUser.id = uuid;
            currentUser.name = child.val().name;
            currentUser.profileImg = child.val().profileImg;
          } else {
            users.push({
              id: child.val().uuid,
              name: child.val().name,
              profileImg: child.val().profileImg,
            });
          }
        });
        setUserDetail(currentUser);
        setAllUsers(users);
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
      });
  } catch (error) {
    //alert(error);
    dispatchLoaderAction({
      type: LOADING_STOP,
    });
    alert(error);
  }
}, []);

const selectPhotoTapped=()=>{
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
      dispatchLoaderAction({
        type:LOADING_START
      });
      UpdateUser(uuid, source)
      .then(()=>{
        setUserDetail({
          ...userDetail,
          profileImg: source,
        });
        dispatchLoaderAction({
          type:LOADING_STOP,
        });
      })
      .catch((err)=>{
        dispatchLoaderAction({
          type: LOADING_STOP
        });
        alert(err);
      });
    }
  });
};


const logout = () => {
    LogOutUser()
    .then(()=> {
        clearAsyncStorage()
        .then( () => {
            navigation.replace('Login')
        })
        .catch((err) => alert(err))
    })
    .catch((err)=>alert(err))
};


    return (
        <SafeAreaView style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}>
         <FlatList
            alwaysBounceVertical={false}
            data={allUsers}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={
                <Profile
                img={profileImg}
                name={name}
                onEditImgTap={() => selectPhotoTapped()}
                />
            }
            renderItem={({item}) => (
                <ShowUsers name={item.name} img= {item.profileImg} />
            )}
          />
        </SafeAreaView> 
    );
};

export default Dashboard;