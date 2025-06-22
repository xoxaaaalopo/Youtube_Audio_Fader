document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");

    startButton.addEventListener("click", () => {
        const startDelay = Number(document.getElementById("start-delay").value);
        const fadeDuration = Number(document.getElementById("fade-duration").value);

        chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                args: [startDelay, fadeDuration],
                func: (startDelay, fadeDuration) => {
                    const video = document.querySelector("video");
                    if (!video) return;
                    setTimeout(() => {
                        const initialVolume = video.volume;
                        let step = 0;
                        const fade = setInterval(() => {
                            step++;
                            video.volume = Math.max(0, initialVolume * ((fadeDuration * 10 - step)/ (fadeDuration * 10)));
                            if (step >= fadeDuration * 10) clearInterval(fade);
                        }, 100);
                    }, startDelay * 1000);
                }
            });
        });
    });
});

