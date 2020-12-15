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
                                <Text style={{color: '#ffffff'}}>Check!</Text>
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
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
    headerText: {
        fontSize: 36,
    },
    checkResult: {
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    resultText: {
        fontSize: 24,
        paddingTop: 10,
    },
    checkButt: {
        marginVertical: 15,
        backgroundColor:"#1061d4",
        paddingHorizontal: 50,
        paddingVertical: 10,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5
    },
});
export default HomeScreen