const filter = {
    state: {
        filterTable: {
            SET_TRANSACTION_TYPE: '',
            SET_TRANSACTION_STATUS: '',
            SET_TRANSACTION_SLOC: '',
            SET_TRANSACTION_DATE_BEGIN: '',
            SET_TRANSACTION_DATE_END: '',
        }
    },
    mutations: {
        setFilter(state, payload) {
            state.filterTable.push(payload)
        }
    },
    actions: {

    },
    getters: {

    }
}

export default filter