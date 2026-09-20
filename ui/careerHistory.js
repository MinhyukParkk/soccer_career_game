// Past completed careers, persisted in the browser via localStorage (unlike
// sessionStorage, this survives closing the tab). Used by summary.html
// (saves a record when a career ends) and history.html (lists them).

const STORAGE_KEY = "clubCarreraHistory";

export function getCareerHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not read career history:", err);
    return [];
  }
}

// Adds one completed career to the front of the list (newest first).
export function saveCareerRecord(record) {
  const history = getCareerHistory();
  history.unshift(record);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (err) {
    console.warn("Could not save career history:", err);
    return false;
  }
}

export function clearCareerHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

// Removes one record by its id, leaving the rest untouched.
export function deleteCareerRecord(id) {
  const history = getCareerHistory().filter((rec) => rec.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (err) {
    console.warn("Could not delete career record:", err);
    return false;
  }
}