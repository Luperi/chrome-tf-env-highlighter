DEFAULT_OPTIONS = {
    highlightColors: {
        test: '#FFA500',
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