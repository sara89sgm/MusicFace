from pyechonest import song # import echonest API 
from pyechonest import config 

config.ECHO_NEST_API_KEY="SFXNKMTRAZ3ULHK6U"

search_result = song.search(artist='radiohead', title='karma police')

print search_result

karma_police = search_result[0]

# print search_result[0]
# creat a song object

print 'danceability', karma_police.audio_summary['danceability']
print 'energy', karma_police.audio_summary['energy']
print 'tempo:',karma_police.audio_summary['tempo']

# print karma_police.artist_location
#print 'tempo:',karma_police.audio_summary['tempo'],'duration:',karma_police.audio_summary['duration']