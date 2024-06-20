const regexPatterns = {
  testEnv: /uat|staging|preprod/i,
  tfm: /manager/i,
  rclp: /restaurant-information/i,
  widget: /widget/i,
};

const options = {
  highlightColors: {},
  highlightEnabled: {},
  availableOn: {},
};

chrome.storage.sync.get().then((items) => {
  options.highlightColors = {
    test: items.highlightColors.test,
    prod: items.highlightColors.prod,
  };
  options.highlightEnabled = {
    test: items.highlightEnabled.test,
    prod: items.highlightEnabled.prod,
  };
  options.availableOn = {
    wng: items.availableOn.wng,
    rclp: items.availableOn.rclp,
    tfm: items.availableOn.tfm,
    widget: items.availableOn.widget,
  };
  if ((isTfm() && options.availableOn.tfm) ||
    (isWidget() && options.availableOn.widget) ||
    (isRclp() && options.availableOn.rclp) ||
    (isWng() && options.availableOn.wng)) {
    if (isTestEnv() && options.highlightEnabled.test) {
    createOverlay();
    } else if (!isTestEnv() && options.highlightEnabled.prod) {
    createOverlay();
    }
  }

});

function isTestEnv() {
  return regexPatterns.testEnv.test(window.location.hostname);
}

function isTfm() {
  return regexPatterns.tfm.test(window.location.hostname);
}

function isRclp() {
  return regexPatterns.rclp.test(window.location.hostname);
}

function isWidget() {
  return regexPatterns.widget.test(window.location.hostname);
}

function isWng() {
  return !isTfm() && !isRclp() && !isWidget();
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.style.pointerEvents = 'none';
  overlay.style.border = "0.5rem solid";
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = "9999999999999999";
  overlay.style.borderColor = isTestEnv() ? options.highlightColors.test : options.highlightColors.prod;
  document.body.appendChild(overlay);
}
