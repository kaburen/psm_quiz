import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Text, SafeAreaView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import ActionBar from "../components/ActionBar";

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
        fetch('http://tgryl.pl/quiz/results?last=50')
            .then((response) => response.json())
            .then((json) => {
                this.setState({results: json.reverse()});
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
                <ActionBar font={36} title={"Results"}/>
                <Table style={styles.table}>
                    <Row data={tableHead} style={styles.head} textStyle={[styles.text,{color:'#ebebeb', marginTop: 6,textAlign: 'center', fontFamily:'Inter'}]}/>
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
                    textStyle={{textAlign: 'center',  padding: 4, fontFamily:'Roboto'}}/>
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
        marginTop: 28,
        backgroundColor: '#0045c0',
    },
    head: {
        height: 40,
        backgroundColor:"#0045c0",
    },
    text: {
        flex: 1,
        marginBottom: 4,
        padding: 4
    },
    table: {
        backgroundColor: "#ebebeb",
        flex: 7,
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
        paddingBottom: 12,
        fontFamily:'Inter'
    },

});
export default ResultsScreen