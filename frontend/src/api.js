import axios from "axios";

const URL = "http://localhost:3000"

export async function getVisits() {
    const response = await axios.get('${URL}/VisitHistory')

    if (response.status === 200) {
        return response.data
    }
    else {
        return
    }
}

export async function getVisit(id) {
    const response = await axios.get('${URL}/VisitHistory/${id}')

    if (response.status === 200) {
        return response.data
    }
    else {
        return
    }
}

export async function createVisit(VisitHistory) {
    const response = await axios.post('${URL}/VisitHistory', VisitHistory)
    return response
}

export async function updateVisit(id, VisitHistory) {
    const response = await axios.put('${URL}/VisitHistory/${id}', VisitHistory)
    return response
}

export async function deleteVisit(id) {
    const response = await axios.delete('${URL}/VisitHistory/${id}')
    return response
}