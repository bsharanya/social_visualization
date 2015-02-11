import subprocess
import simplejson as json
import flask


def normalize_repo(year_repo, repo_list):
    new_repo = []
    if len(repo_list) == 1:
        for lang in year_repo.keys():
            language_details = {}
            language_details["language"] = lang
            language_details["length"] = 10
            new_repo.append(language_details)
    elif len(repo_list) > 1:
        new_min = 10
        new_max = 80
        min_repo = min(repo_list)
        max_repo = max(repo_list)
        for lang in year_repo.keys():
            language_details = {}
            language_details["language"] = lang
            language_details["length"] = ((year_repo.get(lang) - min_repo) * (new_max - new_min))/(max_repo - min_repo) + new_min
            new_repo.append(language_details)

    return new_repo

def main_func():
    f1 = open("repos.json", "r")
    json_output_repos = flask.json.load(f1)
    f1.close()

    year_2008 = {}
    year_2009 = {}
    year_2010 = {}
    year_2011 = {}
    year_2012 = {}
    year_2013 = {}
    year_2014 = {}

    #For each repository, fetch the language details, lines of code and number of followers
    for i in range(0,len(json_output_repos)):
        full_name=json_output_repos[i]['full_name']
        repo_created_at = json_output_repos[i]['created_at'].split('-')[0]

        json_output_languages_dict = json_output_repos[i]['languages']

        if repo_created_at == "2008":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2008.keys():
                    year_2008[each_lang] += 1
                else:
                    year_2008[each_lang] = 1

        if repo_created_at == "2009":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2009.keys():
                    year_2009[each_lang] += 1
                else:
                    year_2009[each_lang] = 1

        if repo_created_at == "2010":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2010.keys():
                    year_2010[each_lang] += 1
                else:
                    year_2010[each_lang] = 1

        if repo_created_at == "2011":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2011.keys():
                    year_2011[each_lang] += 1
                else:
                    year_2011[each_lang] = 1


        if repo_created_at == "2012":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2012.keys():
                    year_2012[each_lang] += 1
                else:
                    year_2012[each_lang] = 1

        if repo_created_at == "2013":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2013.keys():
                    year_2013[each_lang] += 1
                else:
                    year_2013[each_lang] = 1

        if repo_created_at == "2014":
            for each_lang in json_output_languages_dict.keys():
                if each_lang in year_2014.keys():
                    year_2014[each_lang] += 1
                else:
                    year_2014[each_lang] = 1


    total_lang = year_2008.keys() + year_2009.keys() + year_2010.keys() + year_2011.keys() + year_2012.keys() + year_2013.keys() + year_2014.keys()
    total_lang = list(set(total_lang))

    total_repo = year_2008.values() + year_2009.values() + year_2010.values() + year_2011.values() + year_2012.values() + year_2013.values() + year_2014.values()
    total_repo = list(set(total_repo))

    year_2008 = normalize_repo(year_2008, total_repo)
    year_2009 = normalize_repo(year_2009, total_repo)
    year_2010 = normalize_repo(year_2010, total_repo)
    year_2011 = normalize_repo(year_2011, total_repo)
    year_2012 = normalize_repo(year_2012, total_repo)
    year_2013 = normalize_repo(year_2013, total_repo)
    year_2014 = normalize_repo(year_2014, total_repo)

    total_years = {}
    final_json = {}
    years = [2008, 2009, 2010, 2011, 2012, 2013, 2014]

    total_years["2008"] = year_2008
    total_years["2009"] = year_2009
    total_years["2010"] = year_2010
    total_years["2011"] = year_2011
    total_years["2012"] = year_2012
    total_years["2013"] = year_2013
    total_years["2014"] = year_2014

    final_json["years"] = years
    final_json["languages"] = total_lang
    final_json["details"] = total_years

    #file_ptr2 = open("samples/"+name+"-overview.json","w")
    #json.dump(final_json,file_ptr2)
    #file_ptr2.close()

    return final_json