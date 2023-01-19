import React, {useState} from 'react';import {View, TextInput, Button, StyleSheet, NativeModules} from 'react-native';
//import SharedGroupPreferences from 'react-native-shared-group-preferences';
const group = 'group.asap';
const SharedStorage = NativeModules.SharedStorage;

const App = () => {
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const widgetData = { type, value };
    const handleSubmit = async () => {
        if (type == '' || value == ''){
            return;
        }
        /* try {
            // iOS
            await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
        } catch (error) {
            console.log({error});
        } */
        // Android
        //SharedStorage.set(JSON.stringify(type), JSON.stringify(value));
        SharedStorage.set(type, value);
    };

    return (
        <View style={styles.container}>
        <Button
        title="Initialize Storage"
        color="#1DB954"
        onPress={() => SharedStorage.initStorage() } />
        <TextInput style={styles.input}
        onChangeText={newText => setType(newText)}
        value={type}
        returnKeyType="send"
        onEndEditing={handleSubmit}
        placeholder="Enter view identifier."/>
        <TextInput style={styles.input}
        onChangeText={newText => setValue(newText)}
        value={value}
        returnKeyType="send"
        onEndEditing={handleSubmit}
        placeholder="Enter the value."/>
        <Button
        title="Update widget"
        color="#1DB954"
        onPress={() => SharedStorage.updateWidget() } />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        marginTop: '50%',
        paddingHorizontal: 24,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        fontSize: 20,
        minHeight: 40,
    },

});