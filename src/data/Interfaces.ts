interface Issue {
    name: string,
    labels?: string[] | string,
    description: string,
    repo: string,
    assignees: string | string[],
    comments: string,
    link: string,
    state: string,
    createdAt: Date,
    lastUpdated: Date
}

interface IssueProps {
    issue: Issue
}

type AppState = {
    issues: Issue[],
    apiClient: ApiClient,
    status: 'Loading' | 'Failure' | 'Success'
}
interface AppProps extends IssueProps {
    
}

interface ApiClient {
    constructQueryAndCallAPI(query: Query): Promise<Issue[]>,
    getLabelsQuery(options: DefaultLabels[], customOption?: string): string,
    getKeywordQuery(keyword: string, location: KeywordLocation): string,
    getLanguageQuery(toInclude: string[], toExclude: string[]): string,
    getExcludedItems(items: string[]): string
}

type DefaultLabels =
    'good first issue' |
    'help wanted' |
    'enhancement' |
    'priority' |
    'first timers only' |
    'documentation' |
    'bug' |
    'invalid' |
    'question' |
    'wontfix' |
    'duplicate'

type KeywordLocation = 'body' | 'title' | 'comments'

type Query = {
    languageQuery?: string,
    labelsQuery?: string,
    keywordQuery?: string,
    excludedItems?: string
}

export type {Issue, IssueProps, AppState, AppProps, DefaultLabels, KeywordLocation, Query}