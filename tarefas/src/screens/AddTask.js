import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, Platform, TouchableHighlightBase } from 'react-native';
import moment from 'moment';
import DateTimePiker from '@react-native-community/datetimepicker';

import commonStyles from '../commonStyles';

const initialState = { desc: '', date: new Date(), showDatePiker: false }

export default class AddTask extends Component {

    state ={
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState })
    }

    getDatePiker = () => {
        let datePiker = <DateTimePiker 
                value={this.state.date}
                onChange={(_, date) => this.setState({ date, showDatePiker: false })} 
                mode='date' />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android') {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePiker: true })}>
                        <Text styles={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePiker && datePiker}
                </View>
            )
        }

        return datePiker
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} 
                onRequestClose={this.props.onCancel}
                animationType='slide'>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.backgound}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} 
                        placeholder="Informe a descrição..."
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc}/>
                    {this.getDatePiker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.backgound}>

                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    backgound: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 18
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40, 
        margin: 15,
        marginLeft: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
})