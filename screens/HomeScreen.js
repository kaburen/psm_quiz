import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import SingleTest from "../components/SingleTest";

const lorem ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Duis quis accumsan mauris. Donec volutpat elit sit amet magna malesuada, vitae lobortis odio faucibus. " +
    "Donec commodo mauris suscipit mi luctus convallis. Nam suscipit scelerisque nisi vulputate rutrum. Etiam tincidunt, " +
    "libero et lobortis tincidunt, urna est tristique turpis, sed facilisis dolor orci et ante.";

const quizList = [
    {
        title: 'Test #1',
        tags: ['#Tag1', "#Tag2"],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis condimentum ipsum, eu convallis tellus molestie ac. '
    },
    {
        title: 'Test #2',
        tags: ['#Tag1', "#Tag2"],
        description: 'Donec faucibus quam ut lorem auctor, tempus tincidunt nulla fermentum. Aenean rhoncus nibh quis arcu ultrices, id sodales ante pretium.'
    },
    {
        title: 'Test #3',
        tags: ['#Tag1', "#Tag2"],
        description: 'Duis in sem sapien. Curabitur eu lorem lacinia, venenatis orci vitae, scelerisque dui.'
    },{
        title: 'Test #4',
        tags: ['#Tag1', "#Tag2"],
        description: 'Duis in sem sapien. Curabitur eu lorem lacinia, venenatis orci vitae, scelerisque dui.'
    },
]

class HomeScreen extends React.Component {
    render() {
        let {navigation} = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Home Page</Text>
                </View>
                <SafeAreaView style={styles.bodyContainer}>
                    <ScrollView>
                        {quizList.map((item, key) =>{
                            return(<SingleTest key={key} onPress={() => navigation.navigate('Test',{title:item.title,testNumber:key})}
                                               testTitle={item.title} tags={item.tags}
                                               description={item.description} />)})}
                        <View style={styles.checkResult}>
                            <Text style={styles.resultText}>
                                Get to know your ranking result
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Result')} style={styles.checkButt}>
                                <Text>Check!</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:24,
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
        borderTopWidth:1,
        borderBottomWidth:1,
    },
    resultText: {
        fontSize: 24,
        paddingTop: 10,
    },
    checkButt: {
        marginVertical:15,
        backgroundColor: "lightgrey",
        paddingHorizontal:50,
        paddingVertical:10,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5
    },
});
export default HomeScreen