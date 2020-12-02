import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Duis quis accumsan mauris. Donec volutpat elit sit amet magna malesuada, vitae lobortis odio faucibus. " +
    "Donec commodo mauris suscipit mi luctus convallis. Nam suscipit scelerisque nisi vulputate rutrum. Etiam tincidunt, " +
    "libero et lobortis tincidunt, urna est tristique turpis, sed facilisis dolor orci et ante.";

class TestScreen extends React.Component {
    render() {
        let {navigation} = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Test #1</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionTop}>Question 3 of 10</Text>
                        <Text style={styles.questionTop}>Time: 22 sec</Text>
                    </View>
                    <View style={styles.bar}>
                        <View style={styles.barProg}>

                        </View>
                    </View>
                </View>
                <View style={styles.questionBot}>
                    <Text style={styles.questionText}>This is some long question to fill the content?</Text>
                    <Text numberOfLines={2} style={{fontSize: 12}}>{lorem}</Text>
                </View>
                <View style={styles.checkResult}>
                    <TouchableOpacity style={styles.checkButt}>
                        <Text>Answer A</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkButt}>
                        <Text>Answer B</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkButt}>
                        <Text>Answer C</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkButt}>
                        <Text>Answer D</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 24,
        backgroundColor: '#fff',

    },
    bodyContainer: {
        flex: 2,
        backgroundColor: '#fff',
        paddingTop: 30,
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
        flexDirection: "row",
        borderWidth: 1,
        marginHorizontal: 20,
        marginBottom: 50,
        paddingVertical: 20,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",

    },
    resultText: {
        fontSize: 24,
        paddingTop: 10,
    },
    checkButt: {
        marginVertical: 20,
        backgroundColor: "lightgrey",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        width: "40%",
    },
    questionTop: {
        fontSize: 22,
    },

    questionBot: {
        marginHorizontal: 25,
        justifyContent: "flex-end",
        marginBottom: 40,
    },

    questionText: {
        fontSize: 22,
        paddingBottom: 30,
        textAlign: 'center',
    },
    bar: {
        borderWidth: 1,
        height: "10%",
        marginHorizontal: 20,
        marginTop: 30,
        flexDirection: "row",
        borderRadius: 5
    },
    barProg: {
        flex: 0.7,
        backgroundColor: "black"
    },

    questionContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 20,
    }
});
export default TestScreen