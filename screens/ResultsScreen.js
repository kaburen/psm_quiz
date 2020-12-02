import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

class ResultsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Nick', 'Points', 'Type', 'Date'],
            tableData: [
                ['nick', '18/20', 'test1', '12-09-2020'],
                ['nick2', '11/20', 'test1', '12-07-2020'],
                ['nick3', '13/20', 'test1', '12-06-2020'],
                ['nick', '12/20', 'test1', '11-07-2020'],
            ],
        };
    }

    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#000'}}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={state.tableData} textStyle={styles.text}/>
                </Table>
            </View>
        )
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
        backgroundColor: 'lightgray'
    },
    text: {
        margin: 6
    }
});
export default ResultsScreen