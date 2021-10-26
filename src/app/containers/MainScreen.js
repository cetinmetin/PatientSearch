import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Dropdown, Button } from 'react-bootstrap';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { Table, TableWrapper, Row, Rows } from '../components/table';

import { useDispatch } from "react-redux";
import store from '../redux/store';
import { setSearchParameters, setName } from '../redux/actions/actions'
import { GETFromApi } from '../api/apiHelper'

export default function MainScreen() {
    const dispatch = useDispatch()
    store.subscribe(() => {
        setSelectedParameters(store.getState().userReducer.searchParameters);
        setTableData(store.getState().userReducer.tableData)
    })
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedParameters, setSelectedParameters] = React.useState([])
    const [tableData, setTableData] = React.useState([])
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const K_OPTIONS = [
        {
            item: 'Given Name',
            id: 'given',
        },
        {
            item: 'Familiy Name',
            id: 'family',
        },
        {
            item: 'National ID',
            id: 'id',
        }
    ]
    const tableHead = ['Patient Name', 'Family Name', 'National ID', 'Gender', 'Phone', 'Address']
    const tableTitle = ['Title', 'Title2', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4', 'Title3', 'Title4', 'Title2', 'Title3', 'Title4']
    // const tableData = [
    //     // ['1', '2', '3', '2', '3', '2'],
    // ]

    function onMultiChange() {
        return (item) => { dispatch(setSearchParameters((xorBy(selectedParameters, [item], 'id')))) }

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
                        selectedValues={selectedParameters}
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
            <Button variant="primary" size="lg" onClick={() => { GETFromApi(searchQuery,selectedParameters) }}>
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
        </View >
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