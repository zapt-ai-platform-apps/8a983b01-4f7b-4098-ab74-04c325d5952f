// Event bus for application-wide events
export class EventBus {
  constructor() {
    this.subscribers = {};
  }

  // Subscribe to an event
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
    
    // Return unsubscribe function
    return () => this.unsubscribe(event, callback);
  }

  // Publish an event
  publish(event, data) {
    if (!this.subscribers[event]) return;
    
    this.subscribers[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event subscriber for '${event}':`, error);
      }
    });
  }

  // Unsubscribe from an event
  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    
    this.subscribers[event] = this.subscribers[event]
      .filter(cb => cb !== callback);
  }
}

// Single instance of EventBus
export const eventBus = new EventBus();

// Define application events
export const events = {
  // Auth events
  USER_SIGNED_IN: 'user/signedIn',
  USER_SIGNED_OUT: 'user/signedOut',
  
  // Report events
  REPORT_GENERATED: 'report/generated',
  REPORT_SAVED: 'report/saved',
  REPORT_EXPORT_STARTED: 'report/exportStarted',
  REPORT_EXPORT_COMPLETED: 'report/exportCompleted',
  REPORT_EXPORT_FAILED: 'report/exportFailed',
  
  // UI events
  TOAST_SHOW: 'ui/toastShow',
  MODAL_OPEN: 'ui/modalOpen',
  MODAL_CLOSE: 'ui/modalClose',
  
  // Navigation events
  VIEW_CHANGED: 'navigation/viewChanged',
  
  // Filter events
  FILTER_CHANGED: 'filter/changed',
  SORT_CHANGED: 'sort/changed',
  
  // Search events
  SEARCH_STARTED: 'search/started',
  SEARCH_COMPLETED: 'search/completed',
  SEARCH_CLEAR: 'search/clear',
};