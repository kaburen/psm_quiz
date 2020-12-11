import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import TestScreen from "./screens/TestScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyModal from "./components/MyModal";


const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Duis quis accumsan mauris. Donec volutpat elit sit amet magna malesuada, vitae lobortis odio faucibus. " +
    "Donec commodo mauris suscipit mi luctus convallis. Nam suscipit scelerisque nisi vulputate rutrum. Etiam tincidunt, " +
    "libero et lobortis tincidunt, urna est tristique turpis, sed facilisis dolor orci et ante.";

const Drawer = createDrawerNavigator();

export default class App extends React.Component {
    state = {
        rulesVisible: false
    }

    render() {
        const {rulesVisible}=  this.state
        return (
            <NavigationContainer>
                <MyModal rulesVisible={rulesVisible} onPress={() => this.acceptRules()}/>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Result" component={ResultsScreen}/>
                    {/*TODO map*/}
                    <Drawer.Screen name="Test" component={TestScreen} options={{unmountOnBlur:true}}/>
                </Drawer.Navigator>
            </NavigationContainer>


        );
    }

    componentDidMount() {
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