import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Dropdown, Button } from 'react-bootstrap';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { Table, TableWrapper, Row, Rows } from '../components/table';

export default function MainScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedTeams, setSelectedTeams] = React.useState([])
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
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
    const tableHead = ['Patient Name', 'Family Name', 'National ID', 'Gender', 'Phone', 'Address']
    const tableTitle = ['Title', 'Title2', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4']
    const tableData = [
        // ['1', '2', '3', '2', '3', '2'],
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
            <ScrollView style={{ height: windowHeight * 0.4, marginVertical: "2%", width: windowWidth * 0.4 }}>
                <Table style={styles.containerTable}>
                    <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />

                    <TableWrapper style={styles.wrapper}>
                        <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                    </TableWrapper>

                </Table>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    containerTable: { flex: 1, backgroundColor: '#fff', height: 20 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }
});