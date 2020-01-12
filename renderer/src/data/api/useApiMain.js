import useRepos from './hooks/useRepos'

export default () => {
    const repos = useRepos()

    return { ...repos }
}
