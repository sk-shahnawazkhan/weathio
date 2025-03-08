export const convertUnixToLocalTime = (unixTimestamp, timezoneSeconds) => {
  const date = new Date(unixTimestamp * 1000);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
    timeZone: getTimeZoneName(timezoneSeconds),
  })
    .format(date)
    .replace("am", "AM")
    .replace("pm", "PM");
};

export const convertUnixToLocalDateTime = (unixTimestamp, timezoneSeconds) => {
  const date = new Date(unixTimestamp * 1000);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
    timeZone: getTimeZoneName(timezoneSeconds),
  })
    .format(date)
    .replace("am", "AM")
    .replace("pm", "PM");
};

const getTimeZoneName = (timezoneSeconds) => {
  const timeZones = {
    0: "UTC", // Coordinated Universal Time
    19800: "Asia/Kolkata", // IST (India Standard Time, UTC+5:30)
    18000: "Asia/karachi", // IST (Pakistan Standard Time, UTC+5:00)
    20700: "Asia/Kathmandu", // NPT (Nepal Time, UTC+5:45)
    21600: "Asia/Dhaka", // BST (Bangladesh Time, UTC+6)
    25200: "Asia/Jakarta", // WIB (Western Indonesia Time, UTC+7)
    28800: "Asia/Shanghai", // CST (China Standard Time, UTC+8)
    32400: "Asia/Tokyo", // JST (Japan Standard Time, UTC+9)
    36000: "Australia/Sydney", // AEST (Australian Eastern Standard Time, UTC+10)
    12600: "Asia/Tehran", // IRST (Iran Standard Time, UTC+3:30)
    14400: "Asia/Dubai", // GST (Gulf Standard Time, UTC+4)
    10800: "Europe/Moscow", // MSK (Moscow Time, UTC+3)
    7200: "Europe/Berlin", // CET (Central European Time, UTC+2)
    3600: "Europe/London", // BST (British Summer Time, UTC+1)
    46800: "Pacific/Auckland", // NZST (New Zealand Standard Time)
    "-18000": "America/New_York", // EST (Eastern Standard Time, UTC-5)
    "-21600": "America/Chicago", // CST (Central Standard Time, UTC-6)
    "-25200": "America/Denver", // MST (Mountain Standard Time, UTC-7)
    "-28800": "America/Los_Angeles", // PST (Pacific Standard Time, UTC-8)
    "-32400": "America/Anchorage", // AKST (Alaska Standard Time, UTC-9)
    "-36000": "Pacific/Honolulu", // HST (Hawaii Standard Time, UTC-10)
  };
  return timeZones[timezoneSeconds.toString()] || "UTC"; // Convert timezoneSeconds to string for lookup
};
