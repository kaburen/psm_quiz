import React from 'react';
import {ProgressBarAndroid, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';


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
        nickname: '',
        tags: [],
    }

    render() {
        const {title} = this.props.route.params
        const {currQuestion, test, completed, currScore, duration, bar, loaded, isLoading} = this.state
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                {!loaded && isLoading ? <Text>Loading...</Text> : (<>
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
                        <View style={styles.checkResult}>
                            {test.answers.map((val, key) => {
                                    return (<TouchableOpacity style={styles.checkButt} key={key}
                                                              onPress={() => this.handleClick(key)}>
                                        <Text>{val.content}</Text>
                                    </TouchableOpacity>)
                                }
                            )}
                        </View>
                    </View>}
                </>)}
                {completed && <View style={styles.bodyContainer}>
                    <Text style={styles.resultText}>Your score: {currScore + " / " + tests.length} </Text>
                    <Text style={styles.submitText}>Share your result!</Text>
                    <View style={{marginHorizontal: 75}}><Input style={{marginTop: 20}} value={this.state.nick}
                                 onChangeText={(value) => this.handleChange(value)}
                                 placeholder={"Nickname"}/>
                    </View>
                    <TouchableOpacity style={styles.openButton} onPress={() => this.submitData()}>
                        <Text style={{color: '#ffffff', paddingHorizontal: 2}}>Submit and proceed to results</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }

    componentDidMount() {
        this.fetchData()
        this.setState({loaded: true})
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

    handleChange = (nick) => {
        this.setState({
            ...this.state,
            nick
        })
    }
    handleClick = (key) => {
        this.nextQuestion(key).then(r => {
            this.loadTest()
        })
    }

    fetchData = () => {
        const {id} = this.props.route.params
        fetch(`http://tgryl.pl/quiz/test/${id}`)
            .then((response) => response.json())
            .then((json) => {
                tests = json.tasks
                this.setState({tags: json.tags})
            }).then(() => this.loadTest())
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false});
            });
    }

    submitData = () => {
        const {nick, currScore, tags} = this.state;

        const result = {
            nick: nick,
            score: currScore,
            total: tests.length,
            type: tags[0]
        }

        fetch(`http://tgryl.pl/quiz/result`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        }).then(() => this.saveResult())
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
                answers: tests[currQuestion].answers,
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 24,
        backgroundColor: '#fff',

    },
    bodyContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        paddingVertical: 24
    },
    headerText: {
        fontSize: 22,
        textAlign: 'center'
    },
    checkResult: {
        flexDirection: "row",
        marginBottom: 20,
        paddingVertical: 20,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    resultText: {
        fontSize: 24,
        paddingTop: 10,
        textAlign: 'center',
    },
    checkButt: {
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: "lightgrey",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 5,
        width: 180,
        height: 88
    },
    questionTop: {
        fontSize: 22,
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
        fontSize: 22,
        paddingBottom: 30,
        textAlign: 'center',
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
        marginTop: 20,
        justifyContent: "center",
        marginHorizontal: 80,
        alignItems: 'center'
    },
    submitText: {
        marginTop: 40,
        fontSize: 18,
        paddingTop: 10,
        textAlign: 'center',
    },

});
export default TestScreen