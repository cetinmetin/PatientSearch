import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { Table, TableWrapper, Row, Rows } from '../components/table';

import { useDispatch } from "react-redux";
import store from '../redux/store';
import { setSearchParameters } from '../redux/actions/actions'
import { GETFromApi } from '../api/apiHelper'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MainScreen() {
    const dispatch = useDispatch()
    store.subscribe(() => {
        setSelectedParameters(store.getState().userReducer.searchParameters);
        setTableData(store.getState().userReducer.tableData)
    })
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedParameters, setSelectedParameters] = React.useState([])
    const [tableData, setTableData] = React.useState([])
    const widthArr = [windowWidth * 0.4, windowWidth * 0.4,
    windowWidth * 0.4, windowWidth * 0.4, windowWidth * 0.4, windowWidth * 0.4]
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
            <View>
                <Button
                    onPress={() => { GETFromApi(searchQuery, selectedParameters) }}
                    title="Search"
                    color="blue"
                />
            </View>
            <ScrollView horizontal={true} style={styles.container}>
                <View style={{ flex: 1, height: windowHeight * 0.4, alignSelf: "center" }}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                                tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                        textStyle={styles.text}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: { paddingTop: 10, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: 'aqua' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
});