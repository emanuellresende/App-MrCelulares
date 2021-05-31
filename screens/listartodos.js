import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from 'firebase'
import Colors from '../utils/colors';
const listartodos = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.firestore().collection("celulares").onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.docs.forEach((doc) => {
                const { nome, modelo, datas, problema, estado, ordem } = doc.data();
                users.push({
                    id: doc.id,
                    nome,
                    modelo,
                    datas,
                    problema,
                    estado,
                    ordem,
                });
            });
            setUsers(users);
        });
    }, []);

    return (
        <ScrollView style={styles.container}>

            {users.map((user) => {
                return (
                    <ListItem
                        key={user.id}
                        bottomDivider
                        onPress={() => {
                            props.navigation.navigate("Detalhada", {
                                userId: user.id,
                            });
                        }}
                    >
                        <ListItem.Chevron />
                        <Avatar
                            source={{
                                uri:
                                    "https://lh3.googleusercontent.com/pw/ACtC-3cbZecp3PXMwoerXfUSNTV2C3avF-Gn8rRovQxMQzzQAYB4LppzJNmLYneC1Qc0XFBBJUzni-CXEJg8lhqeEgtr9R6i5x12wYHe0rwrqCMghby5B1dqBSJdcY9oE35XBWSNHVhtvtWf9YAYiDurdxnjDQ=s656-no?authuser=0",
                            }}
                            rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.nome}</ListItem.Title>
                            <ListItem.Subtitle>{user.ordem}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
};

export default listartodos;

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: Colors.mediumGrey
    },
    backButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    }
  });
  