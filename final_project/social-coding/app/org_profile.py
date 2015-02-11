import sys
import subprocess
import flask

def main_func():
    file_ptr=open("profile.json","r")
    json_output = flask.json.load(file_ptr)


    name=json_output['name']
    created_at=json_output['created_at']
    html_url=json_output['html_url']
    image = json_output['avatar_url']
    followers=json_output['followers']
    no_of_public_repos = json_output['public_repos']

    #Fetch all the repositories of an organisation
    file_repos_ptr=open("repos.json","r")
    json_output_repos=flask.json.load(file_repos_ptr)


    #Add  all the languages to set: no duplication
    languages_set = set([])
    for i in range(0,len(json_output_repos)):
        languages=json_output_repos[i]['language']
        languages_set.add(languages)

    #Create json for overview left pane
    org_json = {"profile" : { "name": name, "created_at": created_at, "html_url": html_url, "avatar_url": image, "languages": []}}

    for item in languages_set:
         org_json["profile"]["languages"].append(item)

    #print org_json
    file_ptr.close()
    file_repos_ptr.close()
    return org_json


#main_func("twi")
