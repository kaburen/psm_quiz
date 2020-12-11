import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Text, SafeAreaView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

const results = [
    {
        "nick": "Marek",
        "score": 18,
        "total": 20,
        "type": "historia",
        "date": "2018-11-22"
    },
    {
        "nick": "Arek",
        "score": 12,
        "total": 20,
        "type": "bio",
        "date": "2018-11-23"
    },
]
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
            refreshing: false
        };
    }


    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Results</Text>
                </View>
                <Table style={styles.table}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <SafeAreaView >
                    <FlatList data={results} renderItem={this.renderItem}
                              keyExtractor={(item, index) => index.toString()} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleOnRefresh}/>}/>
                    </SafeAreaView>
                </Table>
            </View>
        )
    }

    renderItem({item}) {
        return <Row data={[item.nick, item.score + "/" + item.total,item.type, item.date]} style={styles.text}
                    textStyle={styles.text}/>
    }
    handleOnRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            wait(2000).then(() => this.setState({ refreshing: false}));
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
        marginBottom: 4,
        padding: 4
    },
    table: {
        flex:1,
        margin: 4,
        marginBottom: 24
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
    headerText: {
        fontSize: 36,
        paddingBottom:8
    },

});
export default ResultsScreen