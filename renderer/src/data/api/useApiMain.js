import useRepos from './hooks/useRepos'
import useBranches from './hooks/useBranches'
import useStatus from './hooks/useStatus'

export default () => {
    const repos = useRepos()
    const branches = useBranches()
    const status = useStatus()

    return { ...repos, ...branches, ...status }
}
