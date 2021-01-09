import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {getData, storeData} from "../utils/Storage";
import NetInfo from "@react-native-community/netinfo";

const _ = require('lodash');

export default class CustomDrawerContent extends React.Component {
    state = {
        ids: [],
    }

    render() {
        return (
            <DrawerContentScrollView {...this.props}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Quiz App</Text>
                    <Image style={{width: 120, height: 120}} source={require('../assets/quiz_splash.png')}/>
                </View>
                {/*<DrawerItemList {...this.props} />*/}
                <View>
                    <DrawerItem label={"Home"} onPress={() => this.props.navigation.navigate("Home")}/>
                    <DrawerItem label={"Results"} onPress={() => this.props.navigation.navigate("Result")}/>
                </View>
                <View style={styles.container}>
                    <View style={styles.itemsContainer}>
                        <TouchableOpacity style={styles.checkButt} onPress={() => this.pickRandom()}>
                            <Text style={{color: "#fff"}}>Pick random</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.checkButt} onPress={() => this.fetchData(true)}>
                            <Text style={{color: "#fff"}}>Get data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>
        )
    }

    componentDidMount() {
        this.fetchData()
    }

    pickRandom = () => {
        const {navigation} = this.props
        let rand = this.state.ids
        rand = _.shuffle(rand)
        navigation.navigate('Test', {id: rand[0]})
    }

    fetchData = (isDownload) => {
        checkConnectivity().then(r => {
            if (r) {
                fetch('http://tgryl.pl/quiz/tests')
                    .then((response) => response.json())
                    .then((json) => {
                        if (isDownload) {
                            storeData('db', JSON.stringify(json))
                                .then(() => {
                                    getData('db')
                                        .then(r => console.log('downloaded headers'))
                                        .then(this.getTests)
                                })
                        }
                        let ids = []
                        json.map(item => {
                            ids.push(item.id)
                        })
                        this.setState({ids: ids}, () => console.log("shuffled"))
                    })
                    .catch((error) => console.error(error))
            } else {
                console.log('no connection')
            }
        })

    }

    getTests = () => {
        this.state.ids.map(id => {
            fetch(`http://tgryl.pl/quiz/test/${id}`)
                .then((response) => response.json())
                .then((json) => {
                    storeData(id, JSON.stringify(json))
                        .then(() => {
                            console.log("downloaded test: " + id)
                        }).then(r => {
                    })
                })
        })
    }
}
const checkConnectivity = async () => {
    return await NetInfo.fetch().then(state => {
        return state.isConnected
    })
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,

    },
    topContainer: {
        alignItems: "center",
        backgroundColor: "#0045c0",
        paddingVertical: 12
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        paddingBottom: 12,
        color: '#ebebeb'
    },
    itemsContainer: {
        flex: 1,
    },
    itemsContainer2: {
        flex: 1,
    },
    checkButt: {
        marginVertical: 15,
        backgroundColor: "#545454",
        paddingHorizontal: 50,
        paddingVertical: 12,
        alignItems: "center",
    },
});