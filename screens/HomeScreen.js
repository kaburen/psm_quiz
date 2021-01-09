import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, AsyncStorage} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import SingleTest from "../components/SingleTest";
import {getData} from "../utils/Storage";
import ActionBar from "../components/ActionBar";

const _ = require('lodash');

class HomeScreen extends React.Component {
    state = {
        isLoading: true,
        quizList: [],
    };

    render() {
        let {navigation} = this.props;
        const {isLoading, quizList} = this.state
        return (
            <View style={styles.mainContainer}>
                <ActionBar font={36} title={"Home Screen"}/>
                {isLoading ? <View style={{flex: 1}}><Text>{"Loading ...\n\n<-Get data from server"}</Text></View> :
                    <SafeAreaView style={styles.bodyContainer}>
                        <ScrollView>
                            {quizList.map((item, key) => {
                                return (
                                    <SingleTest testTitle={item.name} description={item.description} tags={item.tags}
                                                key={key} onPress={() => navigation.navigate('Test', {id: item.id})}/>)
                            })}
                            <View style={styles.checkResult}>
                                <Text style={styles.resultText}>
                                    Get to know your ranking result
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Result')}
                                                  style={styles.checkButt}>
                                    <Text style={{color: '#ebebeb', fontFamily: 'Inter'}}>Check!</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>}
            </View>
        );
    }


    componentDidMount() {
        this.loadDb().then(() => {
        })
    }

    loadDb = async () => {
        await getData('db').then(data => {
            this.setState({
                quizList: _.shuffle(JSON.parse(data)),
                isLoading: false
            }, () => console.log("got data from db"))
        })
        return true
    }

    //Testing storage
    importData = async () => {
        try {
            await AsyncStorage.getAllKeys().then(r => {
               getData(r[1]).then(data => {
                console.log(data)
            })})
        } catch (error) {
            console.log(error.toString())
        }
    }
}

//     //get and store data
//     fetchData = async () => {
//         await fetch('http://tgryl.pl/quiz/tests')
//             .then((response) => response.json())
//             .then((json) => {
//                 this.setState({quizList: _.shuffle(json)}, () => console.log("saved data"));
//                 storeData('db', JSON.stringify(json))
//             })
//             .catch((error) => console.log(error.toString())
//             )
//             .finally(() => {
//                 this.setState({isLoading: false});
//             });
//     }

// export const fetchData = async () => {
//
//     return await fetch('http://tgryl.pl/quiz/tests')
//         .then((response) => response.json())
//         .then((json) => {
//             storeData('db', JSON.stringify(json))
//         })
//         .then(() => {
//                 return false
//             }
//         )
// }

//check network
const checkConnectivity = async () => {
    return await NetInfo.fetch().then(state => {
        return state.isConnected
    })
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ebebeb',
        marginTop: 28,
    },
    bodyContainer: {
        flex: 7,
        backgroundColor: '#ebebeb',
        paddingTop: 16
    },
    checkResult: {
        backgroundColor: "#0045c0",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    resultText: {
        color: '#ebebeb',
        fontSize: 24,
        paddingTop: 10,
        fontFamily: 'Inter'

    },
    checkButt: {
        marginVertical: 15,
        backgroundColor: "#545454",
        paddingHorizontal: 50,
        paddingVertical: 12,
        alignItems: "center",
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 5
    }
});
export default HomeScreen