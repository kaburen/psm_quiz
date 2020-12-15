import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Text, SafeAreaView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class ResultsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Nick', 'Points', 'Type', 'Date'],
            refreshing: false,
            isLoading: true,
            results: []
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () =>{
        fetch('http://tgryl.pl/quiz/results')
            .then((response) => response.json())
            .then((json) => {
                this.setState({results: json});
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false});
            });
    }

    render() {
        const {results, refreshing, isLoading, tableHead} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Results</Text>
                </View>
                <Table style={styles.table}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    {isLoading ? <Text>Loading...</Text> : <SafeAreaView>
                        <FlatList data={results} renderItem={this.renderItem}
                                  keyExtractor={(item, index) => index.toString()}
                                  refreshControl={<RefreshControl refreshing={refreshing}
                                                                  onRefresh={this.handleOnRefresh}/>}/>
                    </SafeAreaView>}
                </Table>
            </View>
        )

    }

    renderItem({item}) {
        return <Row data={[item.nick, item.score + "/" + item.total, item.type, item.date]} style={styles.text}
                    textStyle={styles.text}/>
    }

    handleOnRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.fetchData()
            wait(500).then(() => this.setState({refreshing: false}));
        })
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: 'lightgray',

    },
    text: {
        flex: 1,
        marginBottom: 4,
        padding: 4
    },
    table: {
        flex: 1,
        margin: 2,
        marginBottom: 28
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
    headerText: {
        fontSize: 36,
        paddingBottom: 8
    },

});
export default ResultsScreen