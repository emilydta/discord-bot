function youtubeCheck(
  client,
  fs,
  readline,
  google,
  OAuth2,
  playlistId,
  uploadsChannel
) {

  // If modifying these scopes, delete your previously saved credentials
  // at ~/.credentials/youtube-nodejs-quickstart.json
  var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content), getPlaylist);
    //authorize(JSON.parse(content), getPlaylistItems);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
      rl.close();
      oauth2Client.getToken(code, function (err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  function storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) throw err;
      console.log('Token stored to ' + TOKEN_PATH);
    });
  }

  /**
   * Lists the names and IDs of up to 10 files.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */

  //Fetches list of videos inside specified playlist, and posts the URL of the latest video in the designated Discord channel.
  function getPlaylistItems(auth) {
    var service = google.youtube('v3');
    service.playlistItems.list({
      auth: auth,
      part: 'snippet,contentDetails',
      playlistId: playlistId
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var videos = response.data.items;
      if (videos.length == 0) {
        console.log('No videos found.');
      } else {
        client.channels.cache.get(uploadsChannel).send(`https://www.youtube.com/watch?v=${videos[0].contentDetails.videoId}`);
      }
    });
  }

  function getPlaylist(auth) {
    var service = google.youtube('v3');
    service.playlists.list({
      auth: auth,
      part: 'snippet,contentDetails',
      id: playlistId
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var playlist = response.data.items;
      const liveItemCount = playlist[0].contentDetails.itemCount;
      if (playlist.length == 0) {
        console.log('No playlist found.');
      } else {
        fs.readFile('models/playlistItemCount.json', (err, content) => {
          if (err) {
            console.log('Error loading playlist item count file: ' + err);
            return;
          }
          //Checks if the playlist itemCount saved on filesystem is different to the live itemCount. If it is, it will call the getPlaylistItems function, 
          //and replace the previous value inside the itemCount file.
          if (JSON.parse(content) < liveItemCount) {
            getPlaylistItems(auth);
          }
          if (JSON.parse(content) < liveItemCount || JSON.parse(content) > liveItemCount) {
            fs.writeFile('models/playlistItemCount.json', liveItemCount.toString(), (err) => {
              if (err) {
                console.log('Error loading playlist item count file: ' + err);
                return;
              }
            });  
          }
        })
      }
    });
  }
}

export default youtubeCheck;

