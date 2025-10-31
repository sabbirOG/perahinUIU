// Example course data structure
const coursesData = [
  {
    code: "CSE4587",
    title: "CSE 4587 · Cloud Computing",
    prerequisite: "None",
    credits: 3,
    major: "ict",
    trimester: "elective",
    examDay: "Day 3",
    examSlot: "T3"
  },
  {
    code: "CSE4611",
    title: "CSE 4611 · Compiler Design",
    prerequisite: "CSE 2233",
    credits: 3,
    major: "computational-theory",
    trimester: "elective",
    examDay: "Day 4",
    examSlot: "T1"
  },
  {
    code: "CSE4891",
    title: "CSE 4891 · Data Mining",
    prerequisite: "CSE 3811",
    credits: 3,
    major: "data-science",
    trimester: "elective",
    examDay: "Day 7",
    examSlot: "T1"
  },
  {
    code: "CSE4181",
    title: "CSE 4181 · Mobile Application Development",
    prerequisite: "CSE 1115, CSE 1116",
    credits: 3,
    major: "ict",
    trimester: "elective",
    examDay: "Day 6",
    examSlot: "T3"
  }
  // Add more courses here following the same structure
];

// Export for use in courses.js
if (typeof window !== 'undefined') {
  window.coursesData = coursesData;
}
