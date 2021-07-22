interface Issue {
    name: string,
    title: string,
    labels?: string[],
    description: string,
    repo: string,
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
    constructQueryAndCallAPI(query: Query): Issue[],
    getLabelsQuery(options: DefaultLabels[], customOption?: string): string,
    getKeywordQuery(keyword: string, location: KeywordLocation): string,
    getLanguageQuery(toInclude: string[], toExclude: string[]): string,
    getExcludedItems(items: string[]): string
}

type DefaultLabels = {
    label: 'good first issue' | 'help wanted' | 'enhancement' | 'priority' | 'first timers only' | 'documentation' | 'bug' | 'invalid' | 'question' | 'wontfix' | 'duplicate'
}

type KeywordLocation = {
    location: 'body' | 'title' | 'comments'
    // body = 0,
    // title = 1,
    // comments = 2
}

type Query = {
    languageQuery?: string,
    labelsQuery?: string,
    keywordQuery?: string,
    excludedItems?: string
}

export type {Issue, IssueProps, AppState, AppProps, DefaultLabels, KeywordLocation, Query}