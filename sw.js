DEFAULT_OPTIONS = {
    highlightColors: {
        staging: '#FFA500',
        uat: '#FFFF33',
        prod: '#FF0000',
    },
    highlightEnabled: {
        test: true,
        prod: false,
    },
    availableOn: {
        wng: true,
        rclp: true,
        tfm: true,
        widget: true,
    }
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set(DEFAULT_OPTIONS);
});