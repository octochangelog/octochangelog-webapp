// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string): void => {
  window.gtag('config', process.env.GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
interface Event {
  action: string;
  category: string;
  label: string;
  value: string;
}
export const event = ({ action, category, label, value }: Event): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
