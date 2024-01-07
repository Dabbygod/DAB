import { useState, useEffect } from "preact/hooks";
import { set } from "../../util/IDB";
import { uninstallServiceWorkers } from "../../util/SWHelper";
import { useTranslation } from "react-i18next";

interface BareInputProps {
  placeholder: string;
  storageKey: string;
}

function BareInput(props: BareInputProps) {
  const { t } = useTranslation();
  const value = localStorage.getItem(props.storageKey) || "/bare/";
  const [inputValue, setInputValue] = useState(value);
  function validateUrl(url: string) {
    let finalUrl = url;
    if (url === "/bare/" || url === "/bare") {
      finalUrl = "/bare/";
      return finalUrl;
    }
    if (url === null || url === undefined || url === "") {
      finalUrl = "/bare/";
      return finalUrl;
    }
    if (!url.endsWith("/")) {
      finalUrl = url + "/";
    }
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    return finalUrl;
  }
  function handleChange() {
    const url = validateUrl(
      (document.getElementById("input") as HTMLInputElement).value
    );
    setInputValue((document.getElementById("input") as HTMLInputElement).value);
    set(props.storageKey, url);
    localStorage.setItem(props.storageKey, url);
    uninstallServiceWorkers();
    window.location.reload();
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <input
        type="text"
        placeholder={props.placeholder}
        value={inputValue}
        id="input"
        className="font-roboto flex h-14 w-56 flex-row whitespace-nowrap rounded-2xl border border-input-border-color bg-input p-4 text-center text-xl text-input-text"
      />
      <button
        className="font-roboto flex h-6 w-28 flex-row items-center justify-center rounded-2xl border border-input-border-color bg-input p-4 text-center text-xl text-input-text"
        onClick={handleChange}
      >
        {t("settings.bare.select")}
      </button>
    </div>
  );
}

export default BareInput;
