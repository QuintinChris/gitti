import axios, { AxiosResponse } from 'axios'
const GithubApiUrl = 'https://api.github.com/'
const SearchIssuesGithubApiUrl = 'https://api.github.com/search/issues'
const generalQueryFilter = '-linked:pr no:assignee state:open'

enum DefaultLabels {
    'good first issue',
    'help wanted',
    'enhancement',
    'priority',
    'first timers only',
    'documentation',
    'bug',
    'invalid',
    'question',
    'wontfix',
    'duplicate'
}

enum KeywordLocation {
    body = 0,
    title = 1,
    comments = 2
}

type Query = {
    languageQuery: string,
    labelsQuery: string,
    keywordQuery: string,
    excludedItems: string
}

class ApiClient {

    getIssuesFromGithub = async (url: string, query: string) => {
        let result: AxiosResponse = await axios
            .get(url, {
                params: {
                    q: `"${query}"`
                }
            })
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        return result.data;
    }

    getLabelsQuery = (options: DefaultLabels[], customOption: string) => {
        let labelsQuery: string = '';
        for (let i = 0; i < options.length; i++) {
            labelsQuery += `label:${DefaultLabels[options[i]]} `
        }
        if (customOption) {
            labelsQuery += `label:${customOption}`
        }
        return labelsQuery;
    }

    getKeywordQuery = (keyword: string, location: KeywordLocation) => {
        let keywordQuery: string = `${keyword} in:${KeywordLocation[location]}`
        return keywordQuery
    }

    getLanguageQuery = (toInclude: string[], toExclude: string[]) => {
        let includedLanguages: string = ''
        let excludedLanguages: string = ''
        for (let i = 0; i < toInclude.length; i++) {
            includedLanguages += `language:${toInclude[i]} `
        }
        for (let i = 0; i < toExclude.length; i++) {
            excludedLanguages += `-language:${toExclude[i]} `
        }
        return { includedLanguages, excludedLanguages }
    }

    getExcludedItems = (items: string[]) => {
        let excludedItemsQuery: string = ''
        for (let i = 0; i < items.length; i++) {
            excludedItemsQuery += `no:${items[i]}`
        }
        return excludedItemsQuery
    }

    constructQuery = (labelsQuery: string, languageQuery: string, keywordQuery: string, excludedItems: string) => {
        const query: string = `${labelsQuery} ${languageQuery} ${keywordQuery} ${excludedItems}`;
        return query
    }

    constructQueryAndCallAPI = () => {
        // Do stuff here, get final query, call API with that query + generalQueryFilter
        // const results = getIssuesFromGithub()
        // const sorted = sortQueryResults(results)
        // return sorted
    }

    sortQueryResults = (data: Object) => {
        // Sort results here
        // default = by last updated
        // give user sorting options?
    }

    sendGetRequest = async(path: string): Promise<Object> => {
		const response: AxiosResponse<Object> = await axios.get<Object>(`http://${GithubApiUrl}/${path}`);
		return Promise.resolve(response.data);
	}
}

export default ApiClient;