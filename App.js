import './src/firebase/config.js';
import React from 'react';
import Nav from './src/navigation'; 
import {Loader} from './src/component';
import { StoreProvider } from './src/context/store';
//import './src/firebase/config.js';
//import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar} from 'react-native';
//import { Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

const App = () => (
<StoreProvider>
    <Nav />
    <Loader />
</StoreProvider>
);

export default App;
