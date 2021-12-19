import { getData } from "../../utils/data";

const state = () => ({
    list: getData(100),
    usersPerPage: 15,
    currentPage: 1
})

const getters = {
    usersPaginatedList(state) {
        return state.list.slice(
            (state.currentPage - 1) * state.usersPerPage,
            state.currentPage * state.usersPerPage
        );
    },
    totalPages(state) {
        return Math.ceil(state.list.length / state.usersPerPage);
    }
}

const mutations = {
    changeCurrentPage(state, pageNumber) {
        state.currentPage = pageNumber
    }
}

export default {
    state,
    getters,
    mutations
}