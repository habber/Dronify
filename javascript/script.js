/*
  This was an exercise for me to learn more about the web audio api and how to use external apis like SoundCloud.

  Thanks to @DonKarlssonSan for this awesome blog pot http://codepen.io/DonKarlssonSan/blog/fun-with-web-audio-api

  Thanks to @chrisdavidmills who helped me out and wrote MDN's Web Audio API docs
  https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode

  More details here (resources, helpful links, etc) https://docs.google.com/presentation/d/12G4dOEdJloS32DelfCPSQAPs_b7SwlYWxqr9PpeF18U/edit?usp=sharing

*/

var audio;

(function() {
  var AudioContext = window.AudioContext ||
      window.webkitAudioContext;
  var audioContext;
  var biquadFilter;

  // var frequencySlider = document.getElementById("frequencySlider");
  // var qSlider = document.getElementById("qSlider");
  // var gainSlider = document.getElementById("gainSlider");
  //

  // Types of Web Audio API filters - for reference, so that I know what characteristics each filter type contains. I was using this in a dropdown menu while deciding what I wanted the buttons to apply
  // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type
  // q and gain value of the corresponding slider
  // var filters = { "lowpass": {
  //     q: true,
  //     gain: false
  //   }, "highpass": {
  //     q: true,
  //     gain: false
  //   }, "bandpass": {
  //     q: true,
  //     gain: false
  //   }, "lowshelf": {
  //     q: false,
  //     gain: true
  //   }, "highshelf": {
  //     q: false,
  //     gain: true
  //   }, "peaking": {
  //     q: true,
  //     gain: true
  //   }, "notch": {
  //     q: true,
  //     gain: false
  //   }, "allpass": {
  //     q: true,
  //     gain: false
  //   }
  // };

// Making the soundcloud audio work with the web audio api filters.
// What is crossOrigin? In HTML5, some HTML elements which provide support for CORS, such as <img> or <video>, have a crossorigin attribute (crossOrigin property), which lets you configure the CORS requests for the element's fetched data. These attributes are enumerated, and have the following possible values: 'anonymous' or use-credentials https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes

  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  window.addEventListener("load", function(e) {
    audio = document.getElementById("theSong");
    audio.crossOrigin = "anonymous"; // no credentials flag set

// This adds a sight lowpass filter to the song right away - before user toggles buttons
    var source = audioContext.createMediaElementSource(audio); // source variable
    biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = 1000;
    biquadFilter.Q.value = 10;
    biquadFilter.gain.value = 20;

    source.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);
    // updateFrequencyResponse();


// Habber's rate slider
        var rateSlider = document.getElementById("rateSlider");
        rateSlider.addEventListener("change", function () {
        //audio.playbackRate = .5;
        audio.playbackRate = rateSlider.value;
        // source.playbackRate.value = this.value;
  }, false);

// end rate slider


// Habber's new filter buttons that toggle filters on/off
// FILTERS USED - Highpass, Lowshelf, Lowpass
// variables w/in filters. See docs for what applies to which filter type https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
// biquadFilter.gain.value... 1-25
// biquadFilter.frequency... 0 to 3000
// biquadFilter.Q.value... 1 - 100



// FILTER ONE DREAMY DRONE
// Highpass uses Frequency and Q
// biquadFilter.gain.value 1-25
// biquadFilter.frequency.value = xx // up to 3000
// biquadFilter.Q.value = xx; // 1 - 100

    var filterone = document.getElementById("filterone");
    filterone.addEventListener("click", filterToggleOne);

    function filterToggleOne(event) {
      // console.log(this.id);
      biquadFilter.type = "highpass";

      if(this.className == "active") {
      // Unactivate the filter
      biquadFilter.frequency.value = 1000;
      biquadFilter.Q.value = 0;
      // biquadFilter.gain.value = 0;
      this.className = "inactive";
      filterone.style.backgroundColor = 'rgb(25, 236, 242)';
      filterone.style.color = 'rgb(60, 60, 60)';

    } else {
      // Activate filter
      biquadFilter.frequency.value = 1000;
      biquadFilter.Q.value = 20;
      // biquadFilter.gain.value = 10;
      this.className = "active";
      filterone.style.backgroundColor = 'rgba(25, 175, 180, 0.8)';
      filterone.style.color = 'rgb(65, 65, 65)';

      // alert(this.className);
    }
      event.preventDefault();
    }


  // FILTER TWO HEAVY DRONE
  // Lowshelf uses Frequency and Gain
  // biquadFilter.gain.value 1-25
  // biquarFilter.frequency.value = xx // up to 3000

    var filtertwo = document.getElementById("filtertwo");
    filtertwo.addEventListener("click", filterToggleTwo);

    function filterToggleTwo(event) {
      biquadFilter.type = "lowshelf";

      if(this.className == "active") {
      // Unactivate the filter
      biquadFilter.frequency.value = 1000;
      biquadFilter.gain.value = 0;
      this.className = "inactive";
      filtertwo.style.backgroundColor = 'rgb(25, 236, 242)';
      filtertwo.style.color = 'rgb(60, 60, 60)';

    } else {
      // activate filter
      biquadFilter.frequency.value = 1000;
      biquadFilter.gain.value = 10;
      this.className = "active";
      // document.getElementById(id).style.background = 'rgb(25, 236, 242)';
      filtertwo.style.backgroundColor = 'rgba(25, 175, 180, 0.8)';
      filtertwo.style.color = 'rgb(65, 65, 65)';

    }
      event.preventDefault();
    }


    // FILTER THREE SMOOTH DRONE
    // Lowpass uses Frequency and Q value
    // biquarFilter.frequency.value = xx // up to 3000
    // biquadFilter.Q.value = xx; // 1 - 100
      var filterthree = document.getElementById("filterthree");
      filterthree.addEventListener("click", filterToggleThree);
      //filterthree.onclick = filterToggleThree;

      function filterToggleThree(event) {
        // console.log(this.id);
        biquadFilter.type = "lowpass";

        if(this.className == "active") {
          // Unactivate the filter
          biquadFilter.frequency.value = 1000;
          biquadFilter.Q.value = 0;
          this.className = "inactive";
          filterthree.style.backgroundColor = 'rgb(25, 236, 242)';
          filterthree.style.color = 'rgb(60, 60, 60)';

          // alert(this.className);
        } else {
          //unactivate the filter
          biquadFilter.frequency.value = 1000;
          biquadFilter.Q.value = 20;
          this.className = "active";
          filterthree.style.backgroundColor = 'rgba(25, 175, 180, 0.8)';
          filterthree.style.color = 'rgb(65, 65, 65)';

          // alert(this.className);

        }
        event.preventDefault();
      }
  });

// end filter toggles


  /////////////////////////
  // Soundcloud stuff    //
  ////////////////////////

  function get(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        callback(request.responseText);
      }
    }

    request.open("GET", url, true);
    request.send(null);
  }

// habber's client key
  var clientParameter = "client_id=9bf8bff0bdb5b353618c208a84636d01"


  var trackPermalinkUrl =
      // song from The Ex
      "https://soundcloud.com/the-ex/bicycle-illusion";

      // Additional SC URLs to try w/ permission from myself since they are my own songs
          // "https://soundcloud.com/hollyhabstritt/05-magicians-hat";
          // "https://soundcloud.com/hollyhabstritt/08-thought-leader";

  function findTrack() {
    get("http://api.soundcloud.com/resolve.json?url=" + trackPermalinkUrl + "&" + clientParameter,
      function (response) {
        var trackInfo = JSON.parse(response);
        audio.src = trackInfo.stream_url + "?" + clientParameter;


      // artist track information from trackPermaLinkURL
      document.getElementById("artistUrl").href = trackInfo.user.permalink_url;
      document.getElementById("artistAvatar").src = trackInfo.user.avatar_url;
      document.getElementById("artistName").innerHTML = trackInfo.user.username;
      document.getElementById("trackUrl").href = trackInfo.permalink_url;
      // document.getElementById("tc").style.backgroundImage = "url(" + trackInfo.user.avatar_url + ")";
      if(trackInfo.artwork_url) {
        document.getElementById("trackArt").src = trackInfo.artwork_url;
      } else {
        document.getElementById("trackArt").src = "";
      }
      document.getElementById("trackName").innerHTML = trackInfo.title;
      // innerHTML allows me ot alter the text of an HTML element. Also used for updating ArtistName
      streamUrl = trackInfo.stream_url + "?" + clientParameter;

      }
    );
  };

  findTrack(); // this still needs to be here when grabbing the first track that I'm manually populating with the URL

  // Field to enter unique SoundCloud URL
  document.getElementById("findButton").addEventListener("click", function(){
    trackPermalinkUrl = document.getElementById("trackUrlSearch").value;
    findTrack();
  });

})();
