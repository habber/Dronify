/*
  Thanks to @DonKarlssonSan
  http://codepen.io/DonKarlssonSan/blog/fun-with-web-audio-api

  Thanks to @chrisdavidmills who helped me out and wrote MDN's Web Audio API docs

  Browser support for Web Audio API:
  http://caniuse.com/#feat=audio-api
*/


// var playbackControl = document.querySelector('.playback-rate-control');
// var playbackValue = document.querySelector('.playback-rate-value');
// playbackControl.setAttribute('disabled', 'disabled');


var audio;

(function() {
  var AudioContext = window.AudioContext ||
      window.webkitAudioContext;
  var audioContext;
  var biquadFilter;

  var frequencySlider = document.getElementById("frequencySlider");
  var qSlider = document.getElementById("qSlider");
  var gainSlider = document.getElementById("gainSlider");


  // All Web Audio API filters
  // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type
  // q and gain controls of the corresponding slider
  var filters = { "lowpass": {
      q: true,
      gain: false
    }, "highpass": {
      q: true,
      gain: false
    }, "bandpass": {
      q: true,
      gain: false
    }, "lowshelf": {
      q: false,
      gain: true
    }, "highshelf": {
      q: false,
      gain: true
    }, "peaking": {
      q: true,
      gain: true
    }, "notch": {
      q: true,
      gain: false
    }, "allpass": {
      q: true,
      gain: false
    }
  };

// TURNED OFF VISUALIZATIONS IN HTML
  var canvas = document.getElementById("canvas");
  var canvasContext = canvas.getContext("2d");

  var frequencyBars = 100;
  // Array containing all the frequencies we want to get
  // response for when calling getFrequencyResponse()
  var myFrequencyArray = new Float32Array(frequencyBars);
  for(var i = 0; i < frequencyBars; ++i) {
    myFrequencyArray[i] = 2000/frequencyBars*(i+1);
  }

  // We receive the result in these two when calling
  // getFrequencyResponse()
  var magResponseOutput = new Float32Array(frequencyBars); // magnitude
  var phaseResponseOutput = new Float32Array(frequencyBars);

  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  window.addEventListener("load", function(e) {
    audio = document.getElementById("theSong");
    audio.crossOrigin = "anonymous";

    var source = audioContext.createMediaElementSource(audio); // source variable
    // var source = audioContext.createMediaElementSource(audio); // source variable
    biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = 1000;
    biquadFilter.Q.value = 10;
    biquadFilter.gain.value = 20;

    source.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);

    // updateFrequencyResponse();


// Habber's new rate slider - that works!
        var rateSlider = document.getElementById("rateSlider");
        // playbackRate.connect(audioContext.destination);
        // source2.connect(audioContext.destination);

        rateSlider.addEventListener("change", function () {
        //audio.playbackRate = .5;
        audio.playbackRate = rateSlider.value;
        // source.playbackRate.value = this.value;
  }, false);


// Habber grabbing artist name
// document.getElementById("artistName").innerHTML = trackInfo.user.username;

// Habber's new filter button that sort of works - once filter works, add if/than state to toggle off/on
// tried a few things like this .classList.toggle("filterone");

// FILTER ONE DREAMY DRONE
// Highpass uses Frequency and Q
// biquadFilter.gain.value 1-25
// biquarFilter.frequency.value = xx // up to 3000
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
    } else {
      // Activate filter
      biquadFilter.frequency.value = 1000;
      biquadFilter.Q.value = 20;
      // biquadFilter.gain.value = 10;
      this.className = "active";
      filterone.style.backgroundColor = 'rgb(255, 255, 255)';
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

    } else {
      // activate filter
      biquadFilter.frequency.value = 1000;
      biquadFilter.gain.value = 10;
      this.className = "active";
      // document.getElementById(id).style.background = 'rgb(25, 236, 242)';
      filtertwo.style.backgroundColor = 'rgb(255, 255, 255)';
    }
      event.preventDefault();
    }


    // FILTER THREE BUTTERY DRONE
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

          // alert(this.className);
        } else {
          //unactivate the filter
          biquadFilter.frequency.value = 1000;
          biquadFilter.Q.value = 20;
          this.className = "active";
          filterthree.style.backgroundColor = 'rgb(255, 255, 255)';
          // alert(this.className);

        }
        event.preventDefault();


      }
  });

  // end Habber's additions


  //////////////////////////////////////
  // Visualizations   - will omit      //
  //////////////////////////////////////
  //
  // function drawFrequencyResponse(mag, phase) {
  //   canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  //   var barWidth = 400 / frequencyBars;
  //
  //   // Magnitude
  //   canvasContext.strokeStyle = "white";
  //   canvasContext.beginPath();
  //   for(var frequencyStep = 0; frequencyStep < frequencyBars; ++frequencyStep) {
  //     canvasContext.lineTo(
  //       frequencyStep * barWidth,
  //       canvas.height - mag[frequencyStep]*90);
  //   }
  //   canvasContext.stroke();
  //
  //   // Phase
  //   canvasContext.strokeStyle = "red";
  //   canvasContext.beginPath();
  //   for(var frequencyStep = 0; frequencyStep < frequencyBars; ++frequencyStep) {
  //     canvasContext.lineTo(
  //       frequencyStep * barWidth,
  //       canvas.height - (phase[frequencyStep]*90 + 300)/Math.PI);
  //   }
  //   canvasContext.stroke();
  // }
  //
  // function updateFrequencyResponse() {
  //   biquadFilter.getFrequencyResponse(
  //     myFrequencyArray,
  //     magResponseOutput,
  //     phaseResponseOutput);
  //   drawFrequencyResponse(magResponseOutput, phaseResponseOutput);
  // }
  //
  // frequencySlider.addEventListener("change", function () {
  //   biquadFilter.frequency.value = this.value;
  // });
  //
  // frequencySlider.addEventListener("mousemove", function () {
  //   biquadFilter.frequency.value = this.value;
  //   updateFrequencyResponse();
  // });
  //
  // qSlider.addEventListener("mousemove", function () {
  //   biquadFilter.Q.value = this.value;
  //   updateFrequencyResponse();
  // });
  //
  // gainSlider.addEventListener("mousemove", function () {
  //   biquadFilter.gain.value = this.value;
  //   updateFrequencyResponse();
  // });
  //
  // var filtersDropdown = document.getElementById("filtersDropdown");
  //
  // for(var item in filters) {
  //   var option = document.createElement("option");
  //   option.innerHTML = item;
  //   // This will cause a re-flow of the page but we don't care
  //   filtersDropdown.appendChild(option);
  // };
  //
  // function filterClicked (event) {
  //   event = event || window.event;
  //   var target = event.target || event.srcElement;
  //   var filterName = target.value;
  //   biquadFilter.type = filterName;
  //   updateFrequencyResponse();
  //   qSlider.disabled = !filters[filterName].q;
  //   gainSlider.disabled = !filters[filterName].gain;
  // };
  // filtersDropdown.addEventListener("change", filterClicked, false);





  ////////////////////////////
  // Soundcloud stuff below //
  ////////////////////////////

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

// habber's song w/ permission from myself because I wrote it :)
  var trackPermalinkUrl =
      // "https://soundcloud.com/hollyhabstritt/05-magicians-hat";
      // "https://soundcloud.com/hollyhabstritt/08-thought-leader";
      // song from the ex amsterdam
      "https://soundcloud.com/the-ex/bicycle-illusion";

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
      if(trackInfo.artwork_url) {
        document.getElementById("trackArt").src = trackInfo.artwork_url;
      } else {
        document.getElementById("trackArt").src = "";
      }
      document.getElementById("trackName").innerHTML = trackInfo.title;
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
