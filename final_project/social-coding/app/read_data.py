import requests
import flask
import numpy as np
from scipy import stats
from operator import itemgetter


new_min = 5000
new_max = 10000


def read_details(url):
    r = requests.get(url, auth=('SocialCodingCS467', 'socialcoding123'))
    data = r.json()
    i = 2
    while len(r.json()) != 0:
        r = requests.get(url + "?page=" + str(i), auth=('SocialCodingCS467', 'socialcoding123'))
        data.extend(r.json())
        i += 1

    for repo in data:
        url = repo["languages_url"]
        r = requests.get(url, auth=('SocialCodingCS467', 'socialcoding123'))
        repo["languages"] = r.json()

    file_ptr = open('repos.json', 'w')
    flask.json.dump(data, file_ptr)


def read_overview(name):
    url = "https://api.github.com/users/" + name
    r = requests.get(url, auth=('SocialCodingCS467', 'socialcoding123'))
    data = flask.json.loads(r.text)
    file_ptr = open('profile.json', 'w')
    flask.json.dump(data, file_ptr)

    read_details(data["repos_url"])


def read_language_details_for(language):
    file_ptr = open('repos.json', 'r')
    repos = flask.json.load(file_ptr)

    data = {"language": language,
            "max": 0,
            "years": {"2008": {"repos": []}, "2009": {"repos": []}, "2010": {"repos": []}, "2011": {"repos": []},
                      "2012": {"repos": []}, "2013": {"repos": []}, "2014": {"repos": []}}}

    year_normalization = {"2008": {"total": 0, "language": 0}, "2009": {"total": 0, "language": 0},
                          "2010": {"total": 0, "language": 0}, "2011": {"total": 0, "language": 0},
                          "2012": {"total": 0, "language": 0}, "2013": {"total": 0, "language": 0},
                          "2014": {"total": 0, "language": 0}}

    for repo in repos:
        year = repo["created_at"].split("-")[0]
        year_normalization[year]["total"] += 1
        if language in repo["languages"]:
            repo_details = {"name": repo["name"], "repo_url": repo["html_url"],
                            "profile_url": repo["owner"]["html_url"]}
            data["years"][year]["repos"].append(repo_details)
            year_normalization[year]["language"] += 1

    max = 0
    width = 65
    for year in year_normalization:
        language_count = year_normalization[year]["language"]
        if language_count > max:
            max = language_count
        total_count = year_normalization[year]["total"]

        if language_count != 0 and total_count != 0:
            ratio = float(language_count)/total_count
        else:
            ratio = 0
        data["years"][year]["ratio"] = int(ratio * width)

    data["max"] = max

    return data


def normalize_followers(followers_list, watcher):

    min_foll = min(followers_list)
    max_foll = max(followers_list)


    sum1 = 0
    normalize = 0
    if watcher != 0 and len(followers_list) != 0:
        new_array = np.array(followers_list)
        given_mean = np.mean(new_array)

        given_length = len(followers_list)
        normalize_array = []
        for i in range(0,len(followers_list)):
            sum1 += abs(followers_list[i] - given_mean)

        attr_sum = float(sum1)/given_length
        normalize = abs(float(watcher - given_mean)/(attr_sum + 1)) * 80
        if normalize > 150:
            normalize = 110

    return normalize


def do_min_max_norm(repo_line, lines_list):
    old_min = min(lines_list)
    old_max = max(lines_list)
    #new_min = 2000
    #new_max = 10000
    new_value = ((repo_line - old_min) * (new_max - new_min))/(old_max - old_min + 1) + new_min
    return new_value


def normalize_language_lines_count(lines_language, lang_len, total):
    measure = 245 * total / float(new_max)
    new_measure = measure
    if measure > (5*lang_len):
        new_measure = measure - (lang_len * 5)
    norm_line = float(lines_language) * new_measure / total
    return norm_line


def read_year_details(year):
    file_ptr = open('repos.json', 'r')
    repos = flask.json.load(file_ptr)

    color_ptr = open('color.json', 'r')
    colors_map = flask.json.load(color_ptr)

    languages_in_year = set()
    repositories_json = {"repositories": []}

    time_ordered_data = []

    followers = []
    for repo in repos:
        repo_details = repo
        this_year = repo_details["created_at"].split("-")[0]
        if year == this_year:
            followers.append(repo_details["watchers"])

    i = 1
    total_repo_lines = 0
    repo_lines_list = {}
    repo_dict_lines = {}
    repo_lang_dict = {}
    for repo in repos:
        repo_details = repo
        this_year = repo_details["created_at"].split("-")[0]
        repo_name = repo_details["full_name"]
        if year == this_year and repo_details["language"] is not None:
            total_number_of_lines = 0
            details = {"repository_url": repo_details["html_url"], "repository_name": repo_details["full_name"], "languages": []}

            language_s = set()
            details["followers"] = normalize_followers(followers, repo_details["watchers"])
            if len(repo_details["languages"]) == 0:
                if repo_details["language"] is not None:
                    language = repo_details["language"]
                    language_s.add(language)
                    if repo_name in repo_dict_lines.keys():
                        repo_dict_lines[repo_name].append(tuple([language,new_min]))
                    else:
                        repo_dict_lines[repo_name] = [tuple([language,new_min])]
                    languages_in_year.add(language)
                    total_number_of_lines += new_min
            else:
                for language in repo_details["languages"]:
                    language_s.add(language)
                    total_number_of_lines += repo_details["languages"][language]
                    if repo_name in repo_dict_lines.keys():
                        repo_dict_lines[repo_name].append(tuple([language,repo_details["languages"][language]]))
                    else:
                        repo_dict_lines[repo_name] = [tuple([language, repo_details["languages"][language]])]
                    languages_in_year.add(language)


            repo_lines_list[repo_name] = total_number_of_lines
            language_s = list(sorted(language_s))
            repo_lang_dict[repo_name] = language_s

            month = repo_details["created_at"].split("-")[1]
            day = (repo_details["created_at"].split("-")[2]).split("T")[0]
            time_ordered_data.append([month, day, details])

            i += 1


    line_sum_list = []
    for k in repo_lines_list.keys():
        line_sum_list.append(repo_lines_list.get(k))


    repo_lines_dict_new = {}
    for k in repo_lines_list.keys():
        new_sum_val = do_min_max_norm(repo_lines_list.get(k), line_sum_list)
        repo_lines_dict_new[k] = new_sum_val


    final_repo_lang_dict = {}
    for each_repo in repo_dict_lines.keys():
        line_list = repo_dict_lines.get(each_repo)
        length_of_language = len(line_list)
        repo_line_old_sum = repo_lines_list.get(each_repo)
        repo_line_new_sum = repo_lines_dict_new.get(each_repo)
        lang_list = repo_lang_dict[each_repo]
        new_line_list = [0] * len(lang_list)
        for each_tuple in line_list:
            new_line_count = each_tuple[1] * repo_line_new_sum / repo_line_old_sum
            lines = normalize_language_lines_count(new_line_count, length_of_language, repo_line_new_sum)
            #lines = new_line_count
            if lines < 1:
                lines = 1

            if each_tuple[0] in colors_map:
                color = colors_map[each_tuple[0]]
            else:
                color = "#717171"
            index = lang_list.index(each_tuple[0])
            new_line_list[index] = {"name:": each_tuple[0], "lines": lines, "color": color}

        final_repo_lang_dict[each_repo] = new_line_list

    repositories = sorted(time_ordered_data, key=itemgetter(0, 1))
    repositories_json["year"] = year

    for i in range(0, len(repositories)):
        repository = repositories[i][2]
        repository["name"] = i + 1
        repository["languages"] = final_repo_lang_dict.get(repository["repository_name"])
        repositories_json["repositories"].append(repository)

    languages_in_year = sorted(languages_in_year)
    colors_json = {"colors": []}
    for language in languages_in_year:
        if language in colors_map:
            color = colors_map[language]
        else:
            color = "#717171"
        colors_json["colors"].append({"lang": language, "color": color})

    return repositories_json, colors_json
