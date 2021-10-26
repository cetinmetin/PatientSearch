import store from '../redux/store'
import { setTabledata, resetTableData } from '../redux/actions/actions'
export async function GETFromApi(searchQuery, selectedParameters) {
    try {
        if (selectedParameters.length > 0 && searchQuery.length >= 2) {
            store.dispatch(resetTableData())
            let informations = [[]]
            let index = 0
            let idSearch = false
            let url,idIndex, givenIndex, familyIndex;
            selectedParameters.map((item, index) => {
                if (item.id == 'id') {
                    idIndex = index
                    idSearch = true
                }
                else if (item.id == 'given') {
                    givenIndex = index
                }
                else if (item.id == 'family') {
                    familyIndex = index
                }
            })
            for (let i = 0; i < selectedParameters.length; i++) {
                if (givenIndex == i || familyIndex == i) {
                    url = `https://fhir.imagerad.com/dummy/Patient/?${selectedParameters[i].id}=*${searchQuery}*`
                    let response = await fetch(url);
                    let responseApi = await response.json();
                    if (response.Response !== 'False') {
                        responseApi.entry.map((item) => {
                            informations[index] = [item.resource.name[0].given[0], item.resource.name[0].family,
                            item.resource.id, item.resource.gender, item.resource.telecom[0].value,
                            item.resource.address[0].line[0]], index++
                        })
                    }
                }

                if (searchQuery.length == 11 && idIndex == i) {
                    url = `https://fhir.imagerad.com/dummy/Patient/?id=${searchQuery}`
                    let response = await fetch(url);
                    let responseApi = await response.json();
                    if (response.Response !== 'False') {
                        responseApi.entry.map((item) => {
                            informations[index] = [item.resource.name[0].given[0], item.resource.name[0].family,
                            item.resource.id, item.resource.gender, item.resource.telecom[0].value,
                            item.resource.address[0].line[0]], index++
                        })
                        i = selectedParameters.length
                    }
                }
            }
            store.dispatch(setTabledata(informations))
        }
        else {
            console.log('Check Parameters and Search Keys')
        }
    } catch (e) {
        console.log("Error when GETFromApi" + e)
    }
}