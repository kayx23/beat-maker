class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null; // set up to prevent start() function get called while the track is playing
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
            bar.style.animation = "playTrack 0.3s ease-in-out alternate 2"  // style.animationDirection is alternate
            // play sounds if active
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    // set audio currentTime to 0 every time a pad is active 
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                } else if (bar.classList.contains("snare-pad")) {
                    // set audio currentTime to 0 every time a pad is active 
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                } else if (bar.classList.contains("hihat-pad")) {
                    // set audio currentTime to 0 every time a pad is active 
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
        console.log(step);
    }
    start() {

        // prevent starting if it's already playing
        if (this.isPlaying) {
            return;
        } else {
            this.isPlaying = "Playing";
        }

        // tempo
        const interval = (60 / this.bpm) * 1000;
        setInterval(() => {
            this.repeat();
        }, interval)  // invokes repeat() every 1 sec; goes on forever
    }
    activePad() {
        this.classList.toggle("active");
    }
}

const drumKit = new DrumKit();

// click to start
document.querySelector("#play-button button").addEventListener("click", () => {
    drumKit.start();
})

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
        // reset html style tag after animation is done
        // so that when style tag is updated again, keyframes animation starts
    });
})
