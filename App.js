import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import TestScreen from "./screens/TestScreen";
import MyModal from "./components/MyModal";
import {ActivityIndicator} from "react-native";
import * as Font from 'expo-font';
import CustomDrawerContent from "./components/CustomDrawerContent";
import {storeData, getData} from "./utils/Storage";


const Drawer = createDrawerNavigator();
const _ = require('lodash');

export default class App extends React.Component {
    state = {
        rulesVisible: false,
        fontsLoaded: false,
        isLoading:true
    }

    render() {

        if (!this.state.fontsLoaded) {
            return <ActivityIndicator/>;
        }

        const {rulesVisible} = this.state
        return (
            <NavigationContainer>
                <MyModal rulesVisible={rulesVisible} onPress={() => this.acceptRules()}/>
                <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent{...props}/>} options={{unmountOnBlur: true}}>
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Result" component={ResultsScreen} options={{unmountOnBlur: true}}/>
                    <Drawer.Screen name="Test" component={TestScreen} options={{unmountOnBlur:true,}}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

    loadFonts = () => {
        Font.loadAsync({
            Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
            Inter: require("./assets/fonts/Inter-Medium.ttf")
        }).then(r => {
            this.setState({fontsLoaded: true})
        });
    };

    componentDidMount() {
        this.loadFonts()
        getData('rules').then(r => {
            if (r !== 'accepted') {
                this.setState({rulesVisible: true})
            }
        })
    }

    acceptRules() {
        storeData('rules','accepted')
            .then(() => this.setState({rulesVisible: false}));
    }
}