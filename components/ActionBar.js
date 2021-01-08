import React from "react";
import {StyleSheet, Text, View} from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default class ActionBar extends React.Component {
    state={
        isConnected:false
    }
    render() {
        return <>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText,{fontSize:this.props.font}]}>{this.props.title}</Text>
            </View>
            {!this.state.isConnected && (<View style={styles.noNetwork}>
                <Text style={styles.textNetwork}>You are currently in offline mode</Text>
            </View>)}
        </>
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({isConnected: state.isConnected})
        });
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: '#ebebeb',
        backgroundColor: "#0045c0",

    },
    headerText: {
        color: '#ebebeb',
        fontFamily: 'Inter'
    },
    noNetwork: {
        backgroundColor: "#b00000",
        padding: 4,
        alignItems: 'center',
        flex: 0,
    },

    textNetwork: {
        color: '#ebebeb'
    }
})