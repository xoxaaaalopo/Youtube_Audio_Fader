console.log("Youtube Auto Fader loaded");

const waitForVideo = () => {
    // console.log("waitForVideo fired");
    const video = document.querySelector('video');
    if (video) {
        startFade(video);
        return true;
    }
    return false;
};

const observer = new MutationObserver(() => {
    // console.log("observer fired");
    if (waitForVideo()) {
        observer.disconnect();
    }
});

observer.observe(document.body, {childList: true, subtree: true});

function startFade(video) {
    setTimeout(() => {
        const initialVolume = video.volume;
        let step = 0;
        const fade = setInterval(() => {
            step++;
            video.volume = Math.max(0, initialVolume * (60 - step)/ 60);
            if (step >= 60) clearInterval(fade);
        }, 500);
    }, 1000);
} 