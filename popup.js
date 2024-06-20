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

const saveOptions = () => {
  const highlightColorStaging = getValue('highlight-color-staging');
  const highlightColorUAT = getValue('highlight-color-uat');
  const highlightEnabledTest = getCheckedValue('highlight-enabled-test');
  const highlightColorProd = getValue('highlight-color-prod');
  const highlightEnabledProd = getCheckedValue('highlight-enabled-prod');
  const availableOnWNG = getCheckedValue('highlight-available-wng');
  const availableOnRCLP = getCheckedValue('highlight-available-rclp');
  const availableOnTFM = getCheckedValue('highlight-available-tfm');
  const availableOnWidget = getCheckedValue('highlight-available-widget');

  chrome.storage.sync.set(
    {
      highlightColors: {
        staging: highlightColorStaging,
        uat: highlightColorUAT,
        prod: highlightColorProd,
      },
      highlightEnabled: {
        test: highlightEnabledTest,
        prod: highlightEnabledProd,
      },
      availableOn: {
        wng: availableOnWNG,
        rclp: availableOnRCLP,
        tfm: availableOnTFM,
        widget: availableOnWidget,
      }
    },
    () => {
      // Update status to let user know options were saved.
      setStatus('Options saved.');
      setTimeout(() => {
        setStatus('');
      }, 750);
    }
  );
};

// Restores inputs state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (items) => {
      setValue('highlight-color-staging', items.highlightColors.staging);
      setValue('highlight-color-uat', items.highlightColors.uat);
      setCheckedValue('highlight-enabled-test', items.highlightEnabled.test);
      setValue('highlight-color-prod', items.highlightColors.prod);
      setCheckedValue('highlight-enabled-prod', items.highlightEnabled.prod);
      setCheckedValue('highlight-available-wng', items.availableOn.wng);
      setCheckedValue('highlight-available-rclp', items.availableOn.rclp);
      setCheckedValue('highlight-available-tfm', items.availableOn.tfm);
      setCheckedValue('highlight-available-widget', items.availableOn.widget);
    }
  );
};

const getValue = (elementId) => {
  return document.getElementById(elementId).value;
};

const getCheckedValue = (elementId) => {
  return document.getElementById(elementId).checked;
};

const setValue = (elementId, value) => {
  document.getElementById(elementId).value = value;
};

const setCheckedValue = (elementId, checked) => {
  document.getElementById(elementId).checked = checked;
};

const setStatus = (message) => {
  const status = document.getElementById('status');
  status.textContent = message;
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);