__author__ = 'madhushrees'


import subprocess
import simplejson as json
import flask
import numpy as np
from scipy import stats


sum_followers=0
all_repos_followers=[]
normalize_follow=0
normalize_follow_array=[]


def do_normalized(given_list ,new_min, new_max):

    old_min = min(given_list)
    old_max = max(given_list)
    new_array = np.array(given_list)
    new_array = stats.zscore(new_array)
    given_mean = np.mean(new_array)

    given_length = len(given_list)
    sum = 0
    ##print(old_min)
    ##print(old_max)
    normalize_array = []
    for i in range(0,len(given_list)):
        sum += (given_list[i] - given_mean)

    attr_sum = float(sum)/given_length

    for i in range(0,len(given_list)):
        normalize = (float(given_list[i] - given_mean)/attr_sum) * 500
        normalize_array.append(normalize)

    return normalize_array


def main_func(year):
    year=str(year)
    color_ptr=open("color.json","r")
    color_dict=flask.json.load(color_ptr)
    color_ptr.close()
    file_ptr=open("repos.json","r")
    json_output_repos = flask.json.load(file_ptr)
    file_ptr.close()

    color_json = {"colors" : []}

    lang_list = []
    #Json format
    langugae_json={"year" : year, "repositories" : []}

    for i in range(0,len(json_output_repos)):
        repo_created_at = json_output_repos[i]['created_at'].split('-')[0]
        if repo_created_at == year:
            ##print("********REPO DETAILS********")
            followers = json_output_repos[i]['watchers']
            all_repos_followers.append(followers)

    ##print("***followers list***")
    ##print(all_repos_followers)
    normalize_follow_array = do_normalized(all_repos_followers, 5, 120)
    ##print("***normaliized followers list***")
    ##print(normalize_follow_array)
    cnt=0

    #For each repository, fetch the language details, lines of code and number of followers
    for i in range(0,len(json_output_repos)):
        full_name=json_output_repos[i]['full_name']
        repo_url =json_output_repos[i]['html_url']
        repo_lang = json_output_repos[i]['language']
        repo_size = json_output_repos[i]['size']
        repo_created_at = json_output_repos[i]['created_at'].split('-')[0]

        #if repo_created_at == year:
            ##print("********REPO DETAILS********")
            ##print(repo_lang)
            ##print(full_name)
            ##print(repo_url)
            ##print(repo_size)
            ##print(repo_created_at)

        if repo_created_at==year:
            json_output_languages_dict = json_output_repos[i]['languages']

            ##print("BEFORE")
            ##print(json_output_languages_dict)
            if len(json_output_languages_dict) == 0:
                if repo_lang == None:
                    break
                else:
                    json_output_languages_dict[repo_lang] = repo_size

            l =[]
            lang_line = []
            sum_languages=0
            for k,v in json_output_languages_dict.items():
                lang_line.append(v)

            #print("****normalized lang_line***")
            new_sum = sum(lang_line)
            ##print("****lang_line***")
            ##print(lang_line)
            new_measure = 245 -(len(lang_line)*5)
            for i in range(0, len(lang_line)):
                lang_line[i] = float(lang_line[i])*new_measure/new_sum
                #print(lang_line[i])

            ##print("****normalized lang_line***")
            ##print(lang_line)

            i = 0
            for k,v in json_output_languages_dict.items():
                lang_list.append(k)
                color = color_dict.get(k,"#000000")
                color_json[k] = str(color)
                x={"name":str(k),"lines":lang_line[i], "color":str(color)}
                i += 1
                l.append(x)
            ###print(l)

            l = sorted(l)
            langugae_json["repositories"].append({"name":cnt+1,"repository_name": full_name, "repository_url" :repo_url, "languages":l,"followers":int(normalize_follow_array[i])})
            cnt+=1

    lang_list = list(set(lang_list))

    for each_lang in lang_list:
        color = color_dict.get(each_lang, "#000000")
        color_json["colors"].append({"lang":each_lang, "color":color})

    ###print(color_json)
    file_ptr.close()
    return langugae_json, color_json

#main_func(2010)



