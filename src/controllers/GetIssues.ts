import axios, { AxiosResponse } from 'axios'
const GithubApiUrl = 'https://api.github.com/'
const SearchIssuesGithubApiUrl = 'https://api.github.com/search/issues'


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

const createQueryParams = (option: string) => {
    let query: string = ''
    switch (option) {
        case 'GFI':
            query = 'good first issue'
            break;
        case 'FTO':
            query = 'first-timers-only'
            break;
        case 'ENH':
            query = 'enhancement'
            break;
        case 'HW':
            query = 'help wanted'
            break;
        default:
            break;
    }
    return query;
}

const getLanguageQueryParams = (toInclude: string[], toExclude: string[]) => {
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

module.exports = getIssuesFromGithub;


/*
--SORTING OPTIONS--
1. SORT BY LAST UPDATED

--FILTER OUT BEFORE SHOWING USER--
1. LABELS CONTAINS X
2. ASSIGNEE OR ASIGNEES ARE BOTH EMPTY
3. LOCKED = FALSE
4. STATE = 'OPEN'

--FILTERING OPTIONS--
SO YOU CAN QUERY GITHUB API KINDA LIKE JQL FOR JIRA,
FILTER BY LANGUAGE => LANGUAGE:TS/JS/RUBY/ETC,
FILTER FOR TERMS IN BODY OF ISSUE => TESTS IN:BODY
FILTER BY PRIORITY LABELS => LABEL:PRIORITY
SEARCH THINGS THAT HAVE NO SOMETHING => NO:ASSIGNEE, NO:LABEL
SEARCH WORDS IN THE TITLE, BODY, OR COMMENTS => WORDS IN:TITLE/BODY/COMMENTS
SEARCH OPEN/CLOSED => IS:OPEN OR STATE:OPEN
FILTER OUT ISSUES LINKED TO A PR => -LINKED:PR
FILTER OUT ISSUES THAT HAVE SOMETHING => -LABEL:RESOLVED, -STATE:CLOSED, ETC

IDEA IS TO LET USER CONTROL/CHOOSE WHAT THEY WANT TO FILTER BY
SO ON THE FRONT END, WE WILL HAVE A FORM WITH BUTTONS/TEXTBOXES TO LET USERS TELL WHAT ISSUES THEY WANT TO SEE
I.E. 
    LABELS => BUTTONS FOR EACH LABEL, THEY CAN CHOOSE MORE THAN 1
    KEYWORDS => TEXTBOX, THEY ENTER TEXT THEY WANT TO SEE CONTAINED WITHIN (TITLE, BODY, OR COMMENTS? BUTTONS FOR THOSE?)
*/