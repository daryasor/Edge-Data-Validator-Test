Edge-Data-Validator-test
just a quick tool i'm building to validate data packets between my local transcription nodes and teh edge worker. basicly, i noticed some audio chunks were getting lost during sync, so this is supposed to check if teh stream is complete or not.

why this?
the audio-to-text pipeline is sensitive to latency. if a chunk is missing, the whole transcript goes crazy. this validator sits in teh middle to make sure everything is reaching the destination.

todo list:
[ ] fix teh logging issue (it's flooding the console right now)

[ ] add more validation rules for text-to-speech headers

[ ] maybe add a dashboard? idk  

how to run
honestly, just deploy it to vercel and set teh MAIN_NODE_IP env. i havent tested it locally yet because i'm lazy lol.  

Note to myself: dont forget to update the sync path next week.
