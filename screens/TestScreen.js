import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const tests = [
    {
        "question": "Ile to jest 2+2*2?",
        "answers": [
            {
                "content": "2",
                "isCorrect": false
            },
            {
                "content": "6",
                "isCorrect": true
            },
            {
                "content": "8",
                "isCorrect": false
            },
            {
                "content": "30",
                "isCorrect": false
            },
        ],
        "duration": 15
    },
    {
        "question": "Ile to jest 2+2?",
        "answers": [
            {
                "content": "4",
                "isCorrect": true
            },
            {
                "content": "6",
                "isCorrect": false
            },
            {
                "content": "5",
                "isCorrect": false
            },
            {
                "content": "22",
                "isCorrect": false
            },
        ],
        "duration": 15
    }, {
        "question": "Która godzina to południe?",
        "answers": [
            {
                "content": "21:00",
                "isCorrect": false
            },
            {
                "content": "12:00",
                "isCorrect": true
            },
            {
                "content": "12:38",
                "isCorrect": false
            },
            {
                "content": "16:20",
                "isCorrect": false
            },
        ],
        "duration": 15
    }, {
        "question": "Jak zrobić przewrót w przód?",
        "answers": [
            {
                "content": "do przodu",
                "isCorrect": false
            },
            {
                "content": "do tyłu",
                "isCorrect": false
            },
            {
                "content": "w bok",
                "isCorrect": false
            },
            {
                "content": "jak najszybciej",
                "isCorrect": true
            },
        ],
        "duration": 15
    }, {
        "question": "Ile to jest 1GB?",
        "answers": [
            {
                "content": "1024MB",
                "isCorrect": true
            },
            {
                "content": "1024kB",
                "isCorrect": false
            },
            {
                "content": "1024B",
                "isCorrect": false
            },
            {
                "content": "1024TB",
                "isCorrect": false
            },
        ],
        "duration": 15
    }, {
        "question": "W którym roku Krzysztof Kolumb odkrył Amerykę?",
        "answers": [
            {
                "content": "1490",
                "isCorrect": false
            },
            {
                "content": "1492",
                "isCorrect": true
            },
            {
                "content": "1512",
                "isCorrect": false
            },
            {
                "content": "1502",
                "isCorrect": false
            },
        ],
        "duration": 15
    }, {
        "question": "W którym roku miał miejsce zamach na Jana Pawła II",
        "answers": [
            {
                "content": "1981",
                "isCorrect": false
            },
            {
                "content": "1980",
                "isCorrect": true
            },
            {
                "content": "1991",
                "isCorrect": false
            },
            {
                "content": "1990",
                "isCorrect": false
            },
        ],
        "duration": 15
    }, {
        "question": "Kiedy przeprowadznono zamach na World Trade Center?",
        "answers": [
            {
                "content": "11 września 2001",
                "isCorrect": true
            },
            {
                "content": "9 listopada 2001",
                "isCorrect": false
            },
            {
                "content": "19 listopada 2001",
                "isCorrect": false
            },
            {
                "content": "11 września 2002",
                "isCorrect": false
            },
        ],
        "duration": 15
    },
]


class TestScreen extends React.Component {
    state = {
        test: {
            question: "",
            answers: [],
        },
        testNumber: this.props.route.params.testNumber,
        currQuestion: 0,
        currScore: 0,
        duration: 30,
        completed: false,
    }

    render() {
        const {title} = this.props.route.params
        const {currQuestion, test, completed, currScore, duration} = this.state
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>

                {!completed && <View style={styles.bodyContainer}>
                    <View style={styles.questionContainer}>
                        <Text
                            style={styles.questionTop}>{"Question: " + (currQuestion + 1) + " of " + tests.length}</Text>
                        <Text style={styles.questionTop}>{"Time: " + duration + " sec"}</Text>
                    </View>
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
                {completed && <View style={styles.bodyContainer}>
                    <Text style={styles.resultText}>Your score: {currScore + " / " + tests.length} </Text>
                    <TouchableOpacity style={styles.openButton} onPress={() => this.saveResult()}>
                        <Text>Save to results</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }

    componentDidMount() {
        if (!this.state.completed) {
            this.loadTest()
            this.interval = setInterval(
                () => this.setState((prevState) => ({duration: prevState.duration - 1})),
                1000,
            );
        }

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

    handleClick = (key) => {
        this.nextQuestion(key).then(r => {
            this.loadTest()
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
                answers: tests[currQuestion].answers,
            },
            duration: tests[currQuestion].duration
        })
    }

    nextQuestion = async (key) => {
        const {test, currScore, currQuestion, duration} = this.state
        if (currQuestion < tests.length - 1) {
            if(duration !==0) {
                if (test.answers[key].isCorrect) {
                    this.setState({
                        currScore: currScore + 1,
                        duration: 30
                    })
                }
            }
            this.setState({
                currQuestion: currQuestion + 1,
                duration: 30
            })
        } else {
            if(duration !==0) {
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
        fontSize: 36,
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
        backgroundColor: "#FF9500",
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
        marginHorizontal: 100,
        alignItems: 'center'
    },

});
export default TestScreen