import useRepos from './hooks/useRepos'
import useBranches from './hooks/useBranches'

export default () => {
    const repos = useRepos()
    const branches = useBranches()

    return { ...repos, ...branches }
}
