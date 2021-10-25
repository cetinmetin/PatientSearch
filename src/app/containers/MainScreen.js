import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Dropdown, Button } from 'react-bootstrap';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

export default function MainScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedTeams, setSelectedTeams] = React.useState([])
    const K_OPTIONS = [
        {
            item: 'Given Name',
            id: 'JUVE',
        },
        {
            item: 'Familiy Name',
            id: 'RM',
        },
        {
            item: 'ID',
            id: 'BR',
        },
        {
            item: 'National ID',
            id: 'BR20',
        }
    ]
    function onMultiChange() {
        return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View>
            <View class="row">
                <View>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                <View>
                    <SelectBox
                        label=""
                        options={K_OPTIONS}
                        selectedValues={selectedTeams}
                        onMultiSelect={onMultiChange()}
                        onTapClose={onMultiChange()}
                        isMulti
                        containerStyle={{ marginVertical: "2%" }}
                        toggleIconColor="blue"
                        searchIconColor="blue"
                        arrowIconColor="blue"
                        multiOptionContainerStyle={{ backgroundColor: "blue" }}
                    />
                </View>
            </View>
            <Button variant="primary" size="lg">
                Search
            </Button>
            <StatusBar style="auto" />
        </View>
    )
}