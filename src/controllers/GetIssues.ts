import axios, { AxiosResponse } from 'axios'
const GithubApiUrl = 'https://api.github.com/'
const SearchIssuesGithubApiUrl = 'https://api.github.com/search/issues'

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

const getIssuesFromGithub = async (url: string, query: string) => {
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

const getLabelsQuery = (options: DefaultLabels[], customOption: string) => {
    let labelsQuery: string = '';
    for (let i = 0; i < options.length; i++) {
        labelsQuery += `label:${DefaultLabels[options[i]]} `
    }
    if (customOption) {
        labelsQuery += `label:${customOption}`
    }
    return labelsQuery;
}

const getKeywordQuery = (keyword: string, location: KeywordLocation) => {
    let keywordQuery: string = `${keyword} in:${KeywordLocation[location]}`
    return keywordQuery
}

const getLanguageQuery = (toInclude: string[], toExclude: string[]) => {
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

const getExcludedItems = (items: string[]) => {}

module.exports = getIssuesFromGithub;


/*
--SORTING OPTIONS--
1. SORT BY LAST UPDATED

--FILTER OUT BEFORE SHOWING USER--
1. -linked:pr
2. no:assignee
3. is:open / state:open


--FILTERING OPTIONS--
SO YOU CAN QUERY GITHUB API KINDA LIKE JQL FOR JIRA,
✔ FILTER BY LANGUAGE => LANGUAGE:TS/JS/RUBY/ETC, 
✔ FILTER FOR TERMS IN BODY OF ISSUE => TESTS IN:BODY 
✔ FILTER BY PRIORITY LABELS => LABEL:PRIORITY
SEARCH THINGS THAT HAVE NO SOMETHING => NO:ASSIGNEE, NO:LABEL
✔ SEARCH WORDS IN THE TITLE, BODY, OR COMMENTS => WORDS IN:TITLE/BODY/COMMENTS
FILTER OUT ISSUES LINKED TO A PR => -LINKED:PR
FILTER OUT ISSUES THAT HAVE SOMETHING => -LABEL:RESOLVED, -STATE:CLOSED, ETC

IDEA IS TO LET USER CONTROL/CHOOSE WHAT THEY WANT TO FILTER BY
SO ON THE FRONT END, WE WILL HAVE A FORM WITH BUTTONS/TEXTBOXES TO LET USERS TELL WHAT ISSUES THEY WANT TO SEE
I.E.
    LABELS => BUTTONS FOR EACH LABEL, THEY CAN CHOOSE MORE THAN 1
    KEYWORDS => TEXTBOX, THEY ENTER TEXT THEY WANT TO SEE CONTAINED WITHIN (TITLE, BODY, OR COMMENTS? BUTTONS FOR THOSE?)
*/