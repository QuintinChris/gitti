import axios, { AxiosResponse } from 'axios'
import _ from 'lodash'
import { Issue, DefaultLabels, KeywordLocation, Query } from '../data/Interfaces'
const GithubApiUrl = 'https://api.github.com/'
const SearchIssuesGithubApiUrl = 'https://api.github.com/search/issues'
const generalQueryFilter = '-linked:pr no:assignee state:open'
class ApiClient {
    // TODO: handle null params in all the getQuery methods

    getIssuesFromGithub = async (url: string, query: string) => {
        let data
        let request: AxiosResponse = await axios
            .get(url, {
                params: {
                    q: query
                }
            })
            .then((response) => {
                data = response.data
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });

        return data
    }

    getLabelsQuery = (options: DefaultLabels[], customOption?: string) => {
        let labelsQuery: string = '';
        for (let i = 0; i < options.length; i++) {
            labelsQuery += `label:${options[i]} `
        }
        if (customOption) {
            labelsQuery += `label:${customOption}`
        }
        return labelsQuery;
    }

    getKeywordQuery = (keyword: string, location: KeywordLocation) => {
        // what if keyword or location is null?
        let keywordQuery: string = `${keyword} in:${location}`
        return keywordQuery
    }

    getLanguageQuery = (toInclude: string[], toExclude: string[]) => {
        // what if either of args is null?
        let includedLanguages: string = ''
        let excludedLanguages: string = ''
        for (let i = 0; i < toInclude.length; i++) {
            includedLanguages += `language:${toInclude[i]} `
        }
        for (let i = 0; i < toExclude.length; i++) {
            excludedLanguages += `-language:${toExclude[i]} `
        }
        return includedLanguages.concat(excludedLanguages);
    }

    getExcludedItems = (items: string[]) => {
        let excludedItemsQuery: string = ''
        for (let i = 0; i < items.length; i++) {
            excludedItemsQuery += `no:${items[i]}`
        }
        return excludedItemsQuery
    }

    constructQueryAndCallAPI = async (query: Query) => {
        const theQuery: string = `${query.labelsQuery ? query.labelsQuery : ''} ${query.languageQuery ? query.languageQuery : ''} ${query.keywordQuery ? query.keywordQuery : ''} ${query.excludedItems? query.excludedItems : ''} ${generalQueryFilter}`
        let result = await this.getIssuesFromGithub(SearchIssuesGithubApiUrl, theQuery);
        let issues: Issue[] = this.formatQueryResults(result)
        return issues;
    }

    formatQueryResults = (data: any) => {
        let issues: Issue[] = [];
        data.items.forEach((item: any) => {
            issues.push(this.toIssue(item));
        });
        console.log(issues);
        return issues
    }

    toIssue = (obj: any) => {
        let newIssue: Issue = {
            name: obj.title ?? '',
            labels: obj.labels ?? [],
            description: obj.body ?? '',
            repo: obj.url ?? '',
            assignees: obj.assignees,
            comments: obj.comments,
            link: obj.url,
            state: obj.state,
            createdAt: obj.created_at,
            lastUpdated: obj.updated_at
        }
        return newIssue
    }

    sortQueryResults = (data: Object) => {
        // Sort results here
        // default = by last updated
        // give user sorting options?
    }

    sendGetRequest = async (path: string): Promise<Object> => {
        const response: AxiosResponse<Object> = await axios.get<Object>(`http://${GithubApiUrl}/${path}`)
        return Promise.resolve(response.data);
    }
}

export default ApiClient;