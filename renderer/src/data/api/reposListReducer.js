import { CHANGE_REPO, LIST_REPOS, ADD_REPO_IN_LIST, REMOVE_REPO } from '../../../../utils/events'

export default (list, { type, payload }) => {
    switch (type) {
        case LIST_REPOS:
            return [...payload]
        case ADD_REPO_IN_LIST:
            return [payload, ...list]
        case CHANGE_REPO:
            return list.map(item =>
                item.pathname === payload.pathname ? { ...item, ...payload } : item,
            )
        case REMOVE_REPO:
            return list.filter(({ pathname }) => pathname !== payload)
        default:
            return list
    }
}
