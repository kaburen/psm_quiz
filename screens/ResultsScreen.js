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
                    <Row data={tableHead} style={styles.head} textStyle={[styles.text,{color:'#ebebeb', marginTop: 6}]}/>
                    {isLoading ? <Text>Loading...</Text> : <SafeAreaView style={{marginBottom:36}}>
                        <FlatList data={results} renderItem={this.renderItem}
                                  keyExtractor={(item, index) => index.toString()}
                                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleOnRefresh}/>}/>
                    </SafeAreaView>}
                </Table>
            </View>
        )

    }

    renderItem({item}) {
        if(item.date === undefined) {
            item.date = item.createdOn.slice(0, 10);
        }
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
        paddingTop: 30,
        backgroundColor: '#0045c0',
    },
    head: {
        height: 40,
        backgroundColor:"#0045c0",
    },
    text: {
        textAlign: 'center',
        flex: 1,
        marginBottom: 4,
        padding: 4
    },
    table: {
        backgroundColor: "#ebebeb",
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor:"#ebebeb"
    },
    headerText: {
        color:'#ebebeb',
        fontSize: 36,
        paddingBottom: 12
    },

});
export default ResultsScreen