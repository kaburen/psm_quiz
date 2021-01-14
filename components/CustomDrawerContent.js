import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {getData, storeData} from "../utils/Storage";
import NetInfo from "@react-native-community/netinfo";

const _ = require('lodash');

export default class CustomDrawerContent extends React.Component {
    state = {
        ids: [],
        tests: [],
        isLoaded: false
    }

    render() {
        const {navigation} = this.props
        return (<>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Quiz App</Text>
                    <Image style={{width: 120, height: 120}} source={require('../assets/quiz_splash.png')}/>
                </View>
                <View style={styles.itemsContainer}>
                    <TouchableOpacity style={styles.checkButt} onPress={() => this.pickRandom()}>
                        <Text style={styles.btnText}>Pick random</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkButt} onPress={() => this.downloadData()}>
                        <Text style={styles.btnText}>Get data</Text>
                    </TouchableOpacity>
                </View>
                <DrawerContentScrollView style={{backgroundColor: "#ebebeb"}} {...this.props}>
                    <View>
                        <DrawerItem labelStyle={styles.label} label={"Home"}
                                    onPress={() => navigation.navigate("Home")}/>
                        <DrawerItem labelStyle={styles.label} label={"Results"}
                                    onPress={() => navigation.navigate("Result")}/>
                    </View>
                    <View style={styles.line}>

                    </View>
                    {this.state.isLoaded && <View>
                        {this.state.tests.map((data, key) => {
                            return (
                                <DrawerItem labelStyle={styles.label} key={key} label={data.name}
                                            onPress={() => navigation.navigate('Test', {id: data.id})}/>)
                        })}

                    </View>}
                </DrawerContentScrollView>
            </>
        )
    }

    componentDidMount() {
        const d = new Date()
        getData('currDate')
            .then(date => {
                if (date !== d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay()) {
                    this.downloadData()
                } else {
                    this.fetchData()
                }
            })
    }

    pickRandom = () => {
        const {navigation} = this.props
        let rand = this.state.ids
        rand = _.shuffle(rand)
        navigation.navigate('Test', {id: rand[0]})
    }


    downloadData = () => {
        checkConnectivity().then(r => {
            if (r) {
                fetch('http://tgryl.pl/quiz/tests')
                    .then((response) => response.json())
                    .then((json) => {
                        storeData('db', JSON.stringify(json))
                            .then(() => {
                                getData('db')
                                    .then(data => JSON.parse(data))
                                    .then(data => {
                                        let ids = []
                                        data.map(item => {
                                            ids.push(item.id)
                                        })
                                        this.setState({
                                            ids: ids,
                                            tests: _.shuffle(data),
                                            isLoaded: true
                                        }, () => console.log("downloaded headers"))
                                    })
                                    .then(this.getTests)
                                    .then(() => storeData('currDate', new Date().toISOString().slice(0, 10))
                                        .then(r => {
                                            console.log("zapisano date")
                                        }))
                            })

                    })
            } else {
                console.log('no connection')
            }
        })
    }

    fetchData = () => {
        let ids = []
        getData('db')
            .then(data => JSON.parse(data))
            .then(data => {
                    data.map(item => {
                        ids.push(item.id)
                    })
                    this.setState({
                        ids: ids,
                        tests: _.shuffle(data),
                        isLoaded: true
                    }, () => console.log("shuffled"))
                }
            )
            .catch((error) => console.error(error))
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
    topContainer: {
        alignItems: "center",
        backgroundColor: "#0045c0",
        paddingVertical: 2,
        marginTop: 28,
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        paddingBottom: 12,
        color: '#ebebeb'
    },
    itemsContainer: {
        backgroundColor: "#ebebeb"
    },
    checkButt: {
        backgroundColor: "#0045c0",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 20,
        paddingVertical: 14,
    },
    btnText: {
        fontSize: 18,
        color: "#ffffff"
    },
    line: {
        paddingTop: 1,
        backgroundColor: 'black',
        marginHorizontal: 8
    },
    label: {
        fontSize: 16,
        color: "#000000"
    }

});