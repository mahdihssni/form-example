import { getData } from "../../utils/data";

const dialogTriggerEnums = {
    create: "isCreateDialogOpen",
    edit: "isEditDialogOpen",
    delete: "isDeleteDialogOpen",
};

const state = () => ({
    list: getData(100),
    usersPerPage: 15,
    currentPage: 1,
    isCreateDialogOpen: false,
    isDeleteDialogOpen: false,
    isEditDialogOpen: false,
    selectedUser: null,
});

const getters = {
    usersPaginatedList(state) {
        return state.list.slice((state.currentPage - 1) * state.usersPerPage, state.currentPage * state.usersPerPage);
    },
    totalPages(state) {
        return Math.ceil(state.list.length / state.usersPerPage);
    },
    getDialogStatus(state) {
        return (dialogName) => {
            return state[dialogTriggerEnums[dialogName]];
        };
    },
};

const mutations = {
    changeCurrentPage(state, pageNumber) {
        state.currentPage = pageNumber;
    },
    dialogTrigger(state, options) {
        let { dialogName, isOpen, users } = options;

        state[dialogTriggerEnums[dialogName]] = isOpen;
        state.selectedUser = ["edit", "delete"].includes(dialogName) && users ? users : null;
    },
    addUser(state, user) {
        state.list.unshift(user);
    },
};

export default {
    state,
    getters,
    mutations,
};
