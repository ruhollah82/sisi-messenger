// src/utils/navigation.js
/**
 * Navigation utility for programmatic navigation
 * This works with the data router from react-router-dom
 */

let navigator;

// This function will be called in your components to set the navigator
export const setNavigator = (nav) => {
  navigator = nav;
};

// Navigation functions
export const navigateTo = (path) => {
  if (navigator) {
    navigator(path);
  } else {
    console.warn("Navigator not initialized. Falling back to window.location");
    window.location.href = path;
  }
};

export const replaceTo = (path) => {
  if (navigator) {
    navigator(path, { replace: true });
  } else {
    console.warn("Navigator not initialized. Falling back to window.location");
    window.location.replace(path);
  }
};

export const goBack = () => {
  if (navigator) {
    navigator(-1);
  } else {
    console.warn("Navigator not initialized. Falling back to window.history");
    window.history.back();
  }
};
