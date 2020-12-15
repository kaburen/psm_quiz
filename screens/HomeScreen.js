import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import SingleTest from "../components/SingleTest";

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Duis quis accumsan mauris. Donec volutpat elit sit amet magna malesuada, vitae lobortis odio faucibus. " +
    "Donec commodo mauris suscipit mi luctus convallis. Nam suscipit scelerisque nisi vulputate rutrum. Etiam tincidunt, " +
    "libero et lobortis tincidunt, urna est tristique turpis, sed facilisis dolor orci et ante.";


class HomeScreen extends React.Component {
    state = {
        isLoading: true,
        quizList: []
    };

    render() {
        let {navigation} = this.props;
        const {isLoading, quizList} = this.state
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Home Page</Text>
                </View>
                {isLoading ? <Text>Loading ...</Text> : <SafeAreaView style={styles.bodyContainer}>
                    <ScrollView>
                        {quizList.map((item, key) => {
                            return (<SingleTest key={key} onPress={() => navigation.navigate('Test', {
                                title: item.name,
                                id: item.id
                            })}
                            testTitle={item.name} tags={item.tags}
                            description={item.description}/>)
                        })}
                        <View style={styles.checkResult}>
                            <Text style={styles.resultText}>
                                Get to know your ranking result
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Result')} style={styles.checkButt}>
                                <Text style={{color: '#ebebeb'}}>Check!</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </SafeAreaView>}
            </View>
        );
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () =>{
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                this.setState({quizList: json});
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false});
            });
    }


}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 24,
    },
    bodyContainer: {
        flex: 7,
        backgroundColor: '#ebebeb',
        paddingTop: 16
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor:'#ebebeb',
        backgroundColor:"#0045c0",

    },
    headerText: {
        fontSize: 36,
        color:'#ebebeb'
    },
    checkResult: {
        backgroundColor:"#0045c0",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    resultText: {
        color:'#ebebeb',
        fontSize: 24,
        paddingTop: 10,
    },
    checkButt: {
        marginVertical: 15,
        backgroundColor:"#545454",
        paddingHorizontal: 50,
        paddingVertical: 12,
        alignItems: "center",
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 5
    },
});
export default HomeScreen