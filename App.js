import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import TestScreen from "./screens/TestScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyModal from "./components/MyModal";
// import AppLoading from 'expo-app-loading';
import {ActivityIndicator} from "react-native";
import * as Font from 'expo-font';


const Drawer = createDrawerNavigator();

export default class App extends React.Component {
    state = {
        rulesVisible: false,
        fontsLoaded:false
    }

    render() {

        if (!this.state.fontsLoaded) {
            return <ActivityIndicator />;
        }

        const {rulesVisible}=  this.state
        return (
            <NavigationContainer>
                <MyModal rulesVisible={rulesVisible} onPress={() => this.acceptRules()}/>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Result" component={ResultsScreen} options={{unmountOnBlur:true}}/>
                    <Drawer.Screen name="Test" component={TestScreen} options={{unmountOnBlur:true}}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

    loadFonts = () =>{
        Font.loadAsync({
            Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
            Inter: require("./assets/fonts/Inter-Medium.ttf")
        }).then(r =>{
            this.setState({ fontsLoaded: true})
        });
    };

    componentDidMount() {
        this.loadFonts()
        getData().then(r => {
            if (r !== 'accepted5') {
                this.setState({rulesVisible:true})
            }
        })
    }

    acceptRules() {
        storeData('accepted5')
            .then(() => this.setState({rulesVisible: false}));
    }


}

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
            return value
        }
    } catch (e) {
        return "error"
    }
}
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
    }
}