import requests, json
import flask

def test_write_to_file(name):
    url = "https://api.github.com/orgs/" + name
    r = requests.get(url, auth=('SocialCodingCS467','socialcoding123'))
    data = flask.json.loads(r.text)
    file_ptr = open('data.json', 'w')
    flask.json.dump(data, file_ptr)
    return "Hello World"
