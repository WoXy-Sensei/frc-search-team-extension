export function useWebExtensionI18n() {
  const t = (key, substitutions) => {
    return chrome.i18n.getMessage(key, substitutions);
  };

  return { t };
}
