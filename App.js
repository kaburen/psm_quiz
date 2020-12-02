import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import TestScreen from "./screens/TestScreen";

const lorem ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Duis quis accumsan mauris. Donec volutpat elit sit amet magna malesuada, vitae lobortis odio faucibus. " +
    "Donec commodo mauris suscipit mi luctus convallis. Nam suscipit scelerisque nisi vulputate rutrum. Etiam tincidunt, " +
    "libero et lobortis tincidunt, urna est tristique turpis, sed facilisis dolor orci et ante.";

const Drawer = createDrawerNavigator();

export default class App extends React.Component {

    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home"  component={HomeScreen} />
                    <Drawer.Screen name="Result" component={ResultsScreen} />
                    <Drawer.Screen name="Test" component={TestScreen}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}
