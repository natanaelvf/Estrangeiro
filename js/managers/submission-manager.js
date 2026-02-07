// Submission Manager - Handles data storage and retrieval

export class SubmissionManager {
  constructor() {
    this.storageKey = "estrangeiro_submissions";
    this.submissions = this.loadSubmissions();
  }

  loadSubmissions() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveSubmissions() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.submissions));
  }

  addSubmission(submission) {
    const newSubmission = {
      id: this.generateId(),
      ...submission,
      timestamp: Date.now(),
      views: 0,
    };
    this.submissions.unshift(newSubmission);
    this.saveSubmissions();
    return newSubmission;
  }

  getSubmissions(type = null, sortBy = "recent") {
    let filtered = type
      ? this.submissions.filter((s) => s.type === type)
      : this.submissions;

    if (sortBy === "popular") {
      filtered.sort((a, b) => b.views - a.views);
    } else {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }

    return filtered;
  }

  getSubmissionById(id) {
    return this.submissions.find((s) => s.id === id);
  }

  incrementViews(id) {
    const submission = this.getSubmissionById(id);
    if (submission) {
      submission.views++;
      this.saveSubmissions();
    }
  }

  deleteSubmission(id) {
    this.submissions = this.submissions.filter((s) => s.id !== id);
    this.saveSubmissions();
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
