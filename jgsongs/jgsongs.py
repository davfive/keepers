#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json
import csv
import pprint as pp

# Get justinguitar.com/songs songStore which is stored in a script tag
r = requests.get('https://justinguitar.com/songs')
soup = BeautifulSoup(r.text, 'html.parser')
songStore = json.loads(soup.find('script', attrs={"data-js-react-on-rails-store": "songStore"}).text)

# There are other things bug these two objects are what I care about
# { 'artists': { data: [{type=artist, ...} ...], included=[{type=song, ...} ...] } }
artists = songStore['artists']['data']
songs = songStore['artists']['included']

with open('JustinGuitarSongs.csv', 'w', newline='') as csvfile:
  fieldnames = ['gradeId', 'artist', 'title', 'hasChords', 'hasTabs', 'url', 'youtubeViews', 'youtubeDuration', 'originalArtist' ]
  writer = csv.DictWriter(csvfile, fieldnames=fieldnames, extrasaction='ignore')
  writer.writeheader()
  for song in songs:
    # songs (included) has some other things in it, I just want type=song
    if song['type'] != 'song' or song['attributes']['playedOn'] != 'guitar':
      continue
    song = song['attributes']
    song['url'] = f"https://justinguitar.com/songs/{song['slug']}"
    song['hasChords'] = 'yes' if song['hasChords'] == True else 'no'
    song['hasTabs'] = 'yes' if song['hasTabs'] == True else 'no'
    writer.writerow(song)