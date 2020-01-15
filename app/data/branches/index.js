const { app, ipcMain } = require('electron')
const notif = require('../../notif')

const {
    CHANGE_CURRENT_REPO,
    CLEAR_BRANCHES,
    LIST_BRANCHES,
    CURRENT_BRANCH,
    ADD_BRANCH,
    CHECKOUT_BRANCH,
    REMOVE_BRANCH,
} = require('../../../utils/events')
const { CURRENT } = require('../repos/vars')
const Git = require('../../git')

module.exports = (sender, storage) => {
    let git

    const reloadInfoBranch = async () => {
        const branches = await git.branch()

        sender.send(LIST_BRANCHES, branches)

        const currentBranch = branches.find(({ head }) => !!head)
        sender.send(CURRENT_BRANCH, currentBranch ? currentBranch.name : '')
    }

    const handlerReloadBaranch = async () => {
        const current = await storage.get(CURRENT)
        if (git) git.destroy()

        git = new Git(current)
        sender.send(CLEAR_BRANCHES)

        git.on('error', console.error)

        await reloadInfoBranch()
    }

    const handleCheckoutBranch = async (_, name) => {
        try {
            await git.checkout(name)
            await reloadInfoBranch()
        } catch (e) {
            notif.error('branch', e.message)
        }
    }

    const handlerAddBranch = async (_, name) => {
        try {
            await git.addBranch(name)
            await handleCheckoutBranch(null, name)
            notif.info('branch', `Branch ${name} created successfully`)
        } catch (e) {
            notif.error('branch', e.message)
        }
    }

    const handleRemoveBranch = async (_, name) => {
        if (!(await notif.confirm('branch', `Remove branch ${name}?`))) return

        try {
            await git.removeBranch(name)
            await reloadInfoBranch()
            notif.info('branch', `Branch ${name} removed successfully`)
        } catch (e) {
            notif.error('branch', e.message)
        }
    }

    handlerReloadBaranch()

    app.on(CHANGE_CURRENT_REPO, handlerReloadBaranch)
    ipcMain.on(ADD_BRANCH, handlerAddBranch)
    ipcMain.on(CHECKOUT_BRANCH, handleCheckoutBranch)
    ipcMain.on(REMOVE_BRANCH, handleRemoveBranch)

    return () => {
        app.removeListener(CHANGE_CURRENT_REPO, handlerReloadBaranch)
        ipcMain.removeListener(ADD_BRANCH, handlerAddBranch)
        ipcMain.removeListener(CHECKOUT_BRANCH, handleCheckoutBranch)
        ipcMain.removeListener(REMOVE_BRANCH, handleRemoveBranch)
    }
}
