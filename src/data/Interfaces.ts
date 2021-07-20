interface Issue {
    name: string,
    title: string,
    labels?: string[],
    description: string,
    repo: string,
}

interface IssueProps {
    issues: Issue[]
}

interface ApiClient {
    constructQueryAndCallAPI(): void
}

type AppState = {
    apiClient: ApiClient
}
interface AppProps extends IssueProps {
    // status: 'Loading' | 'Failure' | 'Success'
    status: string
}

export type {Issue, IssueProps, AppState, AppProps}