import React from "react";
import { Button } from "../elements";
import * as chromeApi from "../api/chrome";

const ImportCookie = ({ disabled, currentProfile, onSubmit }) => {
  const handleImport = async () => {
    if (!currentProfile.allCookies && currentProfile.cookies.length === 0) {
      return;
    }

    try {
      const allCookies = await chromeApi.getAllCookies(currentProfile);
      let requiredCookies = allCookies;
      if (!currentProfile.allCookies) {
        requiredCookies = allCookies.filter((cookie) =>
          currentProfile.cookies.includes(cookie.name)
        );
      }

      const activeTab = await chromeApi.getActiveTab();
      const activeStore = await chromeApi.getStoreIdByTab(activeTab.id);
      for (const cookie of requiredCookies) {
        await chromeApi.setCookie(cookie, activeTab, activeStore);
      }
      onSubmit({ color: "text-green-600", message: "Cookies is all set" });
    } catch (err) {
      onSubmit({ color: "text-red-600", message: err.message });
    }
  };

  return (
    <Button main type="button" onClick={handleImport} disabled={disabled}>
      Import
    </Button>
  );
};

export default ImportCookie;
