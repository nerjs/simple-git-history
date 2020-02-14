import useRepos from './hooks/useRepos'
import useBranches from './hooks/useBranches'
import useStatus from './hooks/useStatus'
import useLogs from './hooks/useLogs'

export default () => {
    const repos = useRepos()
    const branches = useBranches()
    const status = useStatus()
    const logs = useLogs(repos)

    return { ...repos, ...branches, ...status, ...logs }
}
