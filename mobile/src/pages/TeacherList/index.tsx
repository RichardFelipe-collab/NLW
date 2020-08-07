import React from 'react';
import { View } from 'react-native';
import PageHeader from '../../components/PageHeader';
import styles from './styles'
import TeacherItem from '../../components/TeacherItem';


function TeacherList(){
    return (
    <View style={styles.container}>
         <PageHeader title="Proffys disponiveis"/>
        <TeacherItem/>
    </View>
    )
}

export default TeacherList;