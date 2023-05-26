const PROD_HOST = "10.0.0.2";
const DEV_HOST = "64.225.86.210";
const ALIAS_HOST = "bse-nokia.dataviss.com";
const LOCALHOST = "localhost";

const ANALYTICS_PROD_HOST = "10.0.0.6";
const ANALYTICS_DEV_HOST = "174.138.120.87";
const ANALYTICS_ALIAS_HOST = "analytics-nokia.dataviss.com"

export const environment = {
  production: false,
  GATEWAY_NOTIFICATION: true,

  SOCKET_URL: "wss://" + LOCALHOST + ":3001/",
  API_BASE_URL: "https://" + LOCALHOST + ":8001/api/",
  USER_BASE_URL: "https://" + LOCALHOST + ":5000/api/",
  HELPDESK_API_BASE_URL: "https://" + LOCALHOST + ":5010/api/",

  ANALYTICS_API_BASE_URL: "https://" + LOCALHOST + ":8052/",
  GATEWAY_MONITORING_SOCKET_URL_TVH: "wss://" + LOCALHOST + ":3055/",
  RECENT_ACTIVITIES: "https://" + LOCALHOST + ":4055/",
  MQTT_ACTIVITIES: "https://" + LOCALHOST + ":4545/",
  USER_ACTIVITIES_SOCKET_URL: "wss://" + LOCALHOST + ":4051/",

  GATEWAY_MONITORING_SOCKET_URL_PACIFICA: "wss://" + LOCALHOST + ":3065/",
  GATEWAY_MONITORING_SOCKET_URL_ORAGADAM: "wss://" + LOCALHOST + ":3022/",

  PACIFICA_SOCKET_URL: "wss://" + LOCALHOST + ":3002/",
  ORAGADAM_SOCKET_URL: "wss://" + LOCALHOST + ":3003/",

};
