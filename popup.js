document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".fade-btn");
    button.addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: () => {
                    const video = document.querySelector("video");
                    if (!video) return;
                    setTimeout(() => {
                        const initialVolume = video.volume;
                        let step = 0;
                        const fade = setInterval(() => {
                            step++;
                            video.volume = Math.max(0, initialVolume * (60 - step)/ 60);
                            if (step >= 60) clearInterval(fade);
                        }, 1000);
                    }, 1000);
                }
            });
        });
    });
});

