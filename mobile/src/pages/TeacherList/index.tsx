import React, { useState, useEffect } from 'react';
import { View, Text,TextInput } from 'react-native';
import PageHeader from '../../components/PageHeader';
import styles from './styles'
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage'

function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isfiltersVisible, setIsFiltersVisible] = useState(false)
    const [week_day,setWeekDay] = useState('')
    const [time,setTime] = useState('')
    const [subject,setSubject] = useState('')

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response=>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) =>{
                    return teacher.id;
                })

                setFavorites(JSON.parse(response))
            }
        })
    }



    function handleToggleFilterVisible(){
        setIsFiltersVisible(!isfiltersVisible);
    }

    async function handleFiltersSubmit(){
        loadFavorites()
       
    const response = await api.get('classes', {
        params:{
            subject,
            week_day,
            time,

    }
})
setIsFiltersVisible(false)
setTeachers(response.data)
    }
    
    return (
    <View style={styles.container}>
<PageHeader title="Proffys disponiveis" headerRight={(
                                               
             <BorderlessButton onPress={handleToggleFilterVisible}>
                 <Feather name="filter" size={20} color="#FFF"/> 
             </BorderlessButton>                                 
         )}>
             
                 {isfiltersVisible && (
                 
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput style={styles.input}
                        value={subject}
                        onChangeText={text=>setSubject(text)}
                        placeholder="Qual a matéria"
                        placeholderTextColor='#c1bccc'
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                            <TextInput style={styles.input}
                        placeholder="Qual o dia"
                        value={week_day}
                        onChangeText={text=>setWeekDay(text)}
                        placeholderTextColor='#c1bccc'/> 
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                            <TextInput style={styles.input}
                        placeholder="Qual horario?"
                        value={time}
                        onChangeText={text=>setTime(text)}
                        placeholderTextColor='#c1bccc'/> 
                            </View>
                        
                    </View>

                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                    </View>
                 )} 
         </PageHeader>
        
        <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
            paddingHorizontal:16,
            paddingBottom:16,
        }}
        
        >
            {teachers.map((teacher:Teacher) => {
            
            return <TeacherItem 
            key={teacher.id} 

            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
            />
           
            } )}
            </ScrollView>
    </View>
    )
}

export default TeacherList;