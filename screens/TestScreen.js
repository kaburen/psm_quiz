import React from 'react';
import {ProgressBarAndroid, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import ActionBar from "../components/ActionBar";
import {getData} from "../utils/Storage";
import NetInfo from "@react-native-community/netinfo";

const _ = require('lodash');
let tests = [{
    "question": "Loading...",
    "answers": [
        {
            "content": "Loading...",
            "isCorrect": false
        },
        {
            "content": "Loading...",
            "isCorrect": false
        },
        {
            "content": "Loading...",
            "isCorrect": false
        },
        {
            "content": "Loading...",
            "isCorrect": false
        },
    ],
    "duration": 5
},]


class TestScreen extends React.Component {
    state = {
        tests:[],
        test: {
            question: "",
            answers: [],
        },
        currQuestion: 0,
        currScore: 0,
        duration: 30,
        completed: false,
        bar: 1,
        barStatus: 1,
        loaded: false,
        isLoading: true,
        tags: [],
        name: ''
    }

    render() {
        const {currQuestion, test, completed, currScore, duration, bar, loaded, name} = this.state
        return (
            <View style={styles.mainContainer}>
                <ActionBar font={20} title={name}/>
                {!loaded ? <Text>Loading...</Text> : (<>
                    {!completed && <View style={styles.bodyContainer}>
                        <View style={styles.questionContainer}>
                            <Text
                                style={styles.questionTop}>{"Question: " + (currQuestion + 1) + " of " + tests.length}</Text>
                            <Text style={styles.questionTop}>{"Time: " + duration + " sec"}</Text>
                        </View>
                        <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={bar}
                                            style={styles.progressBar}/>
                        <View style={styles.questionBot}>
                            <Text numberOfLines={6} style={styles.questionText}>{test.question}</Text>
                        </View>

                        <View style={styles.answersCont}>
                            {test.answers.map((val, key) => {
                                    return (<TouchableOpacity style={styles.checkButt} key={key}
                                                              onPress={() => this.handleClick(key)}>
                                        <Text style={{color: '#ebebeb', fontFamily: 'Inter'}}>{val.content}</Text>
                                    </TouchableOpacity>)
                                }
                            )}
                        </View>
                    </View>}
                </>)}
                {completed && <View style={styles.bodyContainer}>
                    <Text style={styles.resultText}>Your score: {currScore + " / " + tests.length} </Text>
                    <Text style={styles.submitText}>Share your result!</Text>
                    <View style={styles.submitInput}><Input value={this.state.nickname}
                                                            onChangeText={(value) => this.handleChange(value)}
                                                            placeholder={"Nickname"}/>
                    </View>
                    <TouchableOpacity style={styles.openButton} onPress={() => this.submitData()}>
                        <Text style={styles.submitButtText}>Submit and proceed to results</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }

    componentDidMount() {
        this.loadDb().then(() => {
        })

        if (!this.state.completed) {
            this.interval = setInterval(
                () => this.setState((prevState) => ({
                    duration: prevState.duration - 1,
                    bar: prevState.bar - this.state.barStatus
                })),
                1000,
            );
        } else {
            return false
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidUpdate() {
        if (!this.state.completed) {
            if (this.state.duration === 0) {
                this.nextQuestion(1).then(r => {
                    this.loadTest()
                })
            }
        }
    }

    handleChange = (nickname) => {
        this.setState({
            ...this.state,
            nickname
        })
    }

    handleClick = (key) => {
        this.nextQuestion(key)
            .then(r => {
                this.loadTest()
            })
    }

    loadDb = async () => {
        const {id} = this.props.route.params
        console.log(id)
        await getData(id)
            .then(data => {
                data = JSON.parse(data)
                tests = _.shuffle(data.tasks)
                this.setState({
                    tags: data.tags,
                    name: data.name,
                    loaded: true
                }, () => console.log(data))
            })
            .then(r => this.loadTest(),()=>console.log('loadtest'))
            .then(r => {
                this.setState({isLoading: false}, () => console.log('gotTest'));
            })

        return true
    }

    // fetchData = () => {
    //     const {id} = this.props.route.params
    //     fetch(`http://tgryl.pl/quiz/test/${id}`)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             tests = _.shuffle(json.tasks)
    //             this.setState({tags: json.tags, loaded: true, name: json.name})
    //         })
    //         .then(() => this.loadTest())
    //         .then(() => {
    //             this.setState({isLoading: false},()=>console.log('gotTest'));
    //         });
    // }

    submitData = () => {
        const {nickname, currScore, tags} = this.state;
        checkConnectivity().then(net => {
            if (net) {
                const result = {
                    nick: nickname,
                    score: currScore,
                    total: tests.length,
                    type: tags.join(",")
                }
                fetch(`http://tgryl.pl/quiz/result`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result)
                }).then(() => this.saveResult())
            } else {
                this.props.navigation.navigate('Home')
            }
        })


    }

    saveResult = () => {
        let {navigation} = this.props;
        navigation.navigate('Result')
    }

    loadTest = () => {
        const {currQuestion} = this.state
        this.setState({
            test: {
                question: tests[currQuestion].question,
                answers: _.shuffle(tests[currQuestion].answers),
            },
            duration: tests[currQuestion].duration,
            barStatus: 1 / tests[currQuestion].duration
        })
    }

    nextQuestion = async (key) => {
        const {test, currScore, currQuestion, duration} = this.state
        if (currQuestion < tests.length - 1) {
            if (duration !== 0) {
                if (test.answers[key].isCorrect) {
                    this.setState({
                        currScore: currScore + 1,
                        duration: 30
                    })
                }
            }
            this.setState({
                currQuestion: currQuestion + 1,
                bar: 1,
                duration: 30
            })
        } else {
            if (duration !== 0) {
                if (test.answers[key].isCorrect) {
                    this.setState({
                        currScore: currScore + 1,
                        duration: 30
                    })
                }
            }
            this.setState({completed: true})
        }
    }
}

//check network
const checkConnectivity = async () => {
    return await NetInfo.fetch().then(state => {
        return state.isConnected
    })
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 28,
        backgroundColor: '#ebebeb',

    },
    bodyContainer: {
        flex: 7,
        backgroundColor: '#ebebeb',
        paddingTop: 30,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        paddingVertical: 24,
        borderColor: '#ebebeb',
        backgroundColor: "#0045c0"
    },
    headerText: {
        color: '#ebebeb',
        fontSize: 20,
        fontFamily: 'Inter'
    },
    answersCont: {
        flexDirection: "row",
        marginBottom: 28,
        paddingVertical: 20,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    resultText: {
        fontSize: 24,
        paddingTop: 10,
        textAlign: 'center',
        fontFamily: 'Inter'
    },
    checkButt: {
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: "#0045c0",
        alignItems: "center",
        paddingStart: 4,
        justifyContent: "center",
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: 180,
        height: 88
    },
    questionTop: {
        fontSize: 22,
        fontFamily: 'Inter'
    },
    progressBar: {
        margin: 24,
    },

    questionBot: {
        marginHorizontal: 25,
        justifyContent: "flex-end",
        marginTop: 40,
    },

    questionText: {
        fontSize: 16,
        paddingBottom: 16,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    questionContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    openButton: {
        backgroundColor: "#1061d4",
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
        justifyContent: "center",
        marginHorizontal: 80,
        alignItems: 'center'
    },
    submitText: {
        marginTop: 60,
        fontSize: 18,
        paddingTop: 10,
        textAlign: 'center',
        fontFamily: 'Inter'
    },
    submitButtText: {
        color: '#ebebeb',
        paddingHorizontal: 2,
        fontFamily: 'Inter'
    },
    submitInput: {
        marginHorizontal: 75,
        backgroundColor: 'lightgray',
        marginVertical: 20,
        borderRadius: 8,
    }
});
export default TestScreen