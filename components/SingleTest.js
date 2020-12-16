import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

class SingleTest extends React.Component {
    render() {
        return <TouchableOpacity style={styles.eachTest} onPress={this.props.onPress}>
            <Text style={styles.testTitle}>
                {this.props.testTitle}
            </Text>
            <Text style={styles.tagText}>{this.props.tags.join(', ')}</Text>
            <Text numberOfLines={2} style={styles.testDesc}>{this.props.description}</Text>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    eachTest: {
        borderWidth: 1,
        marginBottom: 40,
        marginHorizontal: 20,
    },
    tagText: {
        fontSize: 14,
        color: 'blue',
        paddingVertical: 10,
        paddingStart: 10,
        fontFamily:'Inter'
    },
    testTitle: {
        fontSize: 24,
        paddingTop: 10,
        paddingStart: 10,
        fontFamily:'Inter'
    },
    testDesc: {
        fontSize: 12,
        paddingBottom: 10,
        paddingHorizontal: 10,
        fontFamily:'Roboto'
    }
});
export default SingleTest