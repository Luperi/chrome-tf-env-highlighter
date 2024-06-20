const regexPatterns = {
  staging: /staging|preprod/i,
  uat: /uat/i,
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
    staging: items.highlightColors.staging,
    uat: items.highlightColors.uat,
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
  return isStaging() || isUat();
}

function isStaging() {
  return regexPatterns.staging.test(window.location.hostname);
}

function isUat() {
  return regexPatterns.uat.test(window.location.hostname);
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
  var borderColor;
  if (isTestEnv()) {
    if (isStaging()) {
      borderColor = options.highlightColors.staging;
    } else if (isUat()) {
      borderColor = options.highlightColors.uat;
    }
  } else {
    borderColor = options.highlightColors.prod;
  }
  overlay.style.borderColor = borderColor;
  document.body.appendChild(overlay);
}
