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
      for (const cookie of requiredCookies) {
        await chromeApi.setCookie(cookie, activeTab);
      }
      onSubmit({ color: "text-green-600", message: "Cookies is all set" });
      setTimeout(() => onSubmit(null), 2000);
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
