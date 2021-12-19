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
        let { dialogName, isOpen, user } = options;

        state[dialogTriggerEnums[dialogName]] = isOpen;
        state.selectedUser = ["edit", "delete"].includes(dialogName) && user ? user : null;
    },
    modifySelectedUser(state, options) {
        let { user, clear } = options;
        if (clear) return (state.selectedUser = null);

        state.selectedUser = 
            state.selectedUser instanceof Object && !(state.selectedUser instanceof Array)
            ? Object.assign(state.selectedUser, user)
            : user;
    },
    addUser(state, user) {
        state.list.unshift(user);
    },
    editUser(state, user) {
        state.list = state.list.map((item) => {
            if (item.id === user.id) {
                return user;
            } else {
                return item;
            }
        });
    },
    deleteUser(state, user) {
        const indexOfUser = state.list.findIndex(
            (item) => item.id == user.id
        );

        state.list.splice(indexOfUser, 1);
    }
};

export default {
    state,
    getters,
    mutations,
};
