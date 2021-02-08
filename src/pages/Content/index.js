function LOG(msg) {
  console.info('Pipmeet [Content]: ' + msg);
}

LOG('Background Content Script');

var VIDEO_READY_STATE = 4;

function initializeVideosSearch() {
  LOG('Initializing videos search...');
  var videos = document.querySelectorAll('video');

  /* Filter videos */
  var filteredVideos = [];
  videos.forEach((video, index) => {
    if (index != 0 && video.readyState === VIDEO_READY_STATE) {
      var userName = video.parentElement.parentElement.querySelector(
        'div[data-self-name]'
      ).innerHTML;

      var userImage = video.parentElement.parentElement.querySelector('img')
        .src;

      filteredVideos.push({ userName, userImage, video });
    }
  });

  return filteredVideos;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  LOG('Videos Found! Sending videos to background...');
  var { action } = request;

  switch (action) {
    case 'searchForVideos':
      var videosFound = initializeVideosSearch();
      LOG('Videos Found! Sending videos to background...');
      sendResponse(videosFound);
      break;
    case 'requestPip':
      LOG('Requesting PiP...');
      let userName = request.user;

      if (userName) {
        let videos = initializeVideosSearch();
        videos.forEach((video) => {
          if (video.userName === userName) {
            video.video.requestPictureInPicture();
            sendResponse({ code: 200, message: 'PiP Request sent.' });
          }
        });
      } else {
        sendResponse({ code: 404, message: 'User not found!' });
      }
      break;
    default:
      LOG('No action detected.');
      break;
  }
});
