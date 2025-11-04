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
    trimester: "Elective",
    examDay: "Day 4",
    examSlot: "T1"
  },
  {
    code: "CSE4621",
    title: "CSE 4621 · Computer Graphics(CG)",
    prerequisite: "MATH 2201, MATH 2183",
    credits: 3,
      major: "computational-theory",
    trimester: "Elective",
    examDay: "Day 2",
    examSlot: "T1"
  },
  {
    code: "CSE4889",
    title: "CSE 4889 · Machine Learning(ML)",
    prerequisite: "CSE 3811",
    credits: 3,
    major: "data-science",
    trimester: "elective",
    examDay: "Day 1",
    examSlot: "T3"
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
    code: "CSE4883",
    title: "CSE 4883 · Digital Image Processing(DIP)",
    prerequisite: "CSE 3811",
    credits: 3,
    major: "data-science",
    trimester: "elective",
    examDay: "Day 4",
    examSlot: "T3"
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
  },
  {
    code: "ENG 1011",
    title: "ENG 1011 · English I",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "1",
    examDay: "Day 1",
    examSlot: "T1"
  },
  {
    code: "BDS 1201",
    title: "BDS 1201 · History of the Emergence of Bangladesh(BDS)",
    prerequisite: "None",
    credits: 2,
    major: "",
    trimester: "1",
    examDay: "Day 6",
    examSlot: "T1"
  },
  {
    code: "CSE1110",
  title: "CSE 1110 · Introduction to Computer Systems Lab(ICS)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "1",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "MATH1151",
    title: "MATH 1151 · Fundamental Calculus",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "1",
    examDay: "Day 2",
    examSlot: "T2"
  },
  {
    code: "ENG1013",
    title: "ENG 1013 · English II",
    prerequisite: "ENG 1011",
    credits: 3,
    major: "",
    trimester: "2",
    examDay: "Day 1",
    examSlot: "T2"
  },
  {
    code: "CSE1111",
    title: "CSE 1111 · Structured Programming Language(SPL)",
    prerequisite: "CSE 1110",
    credits: 3,
    major: "",
    trimester: "2",
    examDay: "Day 4",
    examSlot: "T2"
  },
  {
    code: "CSE1112",
    title: "CSE 1112 · Structured Programming Language Laboratory(SPL Lab)",
    prerequisite: "CSE 1110",
    credits: 1,
    major: "",
    trimester: "2",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "CSE2213",
    title: "CSE 2213 · Discrete Mathematics(DM)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "2",
    examDay: "Day 3",
    examSlot: "T2"
  },
  {
    code: "MATH2183",
    title: "MATH 2183 · Calculus and Linear Algebra",
    prerequisite: "MATH 1151",
    credits: 3,
    major: "",
    trimester: "3",
    examDay: "Day 1",
    examSlot: "T3"
  },
  {
    code: "PHY2105",
    title: "PHY 2105 · Physics",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "3",
    examDay: "Day 7",
    examSlot: "T3"
  },
  {
    code: "PHY2106",
    title: "PHY 2106 · Physics Lab",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "3",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "CSE2215",
    title: "CSE 2215 · Data Structure and Algorithms I(DSA I)",
    prerequisite: "CSE 1111",
    credits: 3,
    major: "",
    trimester: "3",
    examDay: "Day 4",
    examSlot: "T2"
  },
  {
    code: "CSE2216",
    title: "CSE 2216 · Data Structure and Algorithms I Laboratory(DSA I Lab)",
    prerequisite: "CSE 1112",
    credits: 1,
    major: "",
    trimester: "3",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "MATH2201",
    title: "MATH 2201 · Coordinate Geometry and Vector Analysis(VECTOR)",
    prerequisite: "MATH 1151",
    credits: 3,
    major: "",
    trimester: "4",
    examDay: "Day 5",
    examSlot: "T1"
  },
  {
    code: "CSE1325",
    title: "CSE 1325 · Digital Logic Design(DLD)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "4",
    examDay: "Day 3",
    examSlot: "T3"
  },
  {
    code: "CSE1326",
    title: "CSE 1326 · Digital Logic Design Lab(DLD Lab)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "4",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "CSE1115",
    title: "CSE 1115 · Object Oriented Programming(OOP)",
    prerequisite: "CSE 2215",
    credits: 3,
    major: "",
    trimester: "4",
    examDay: "Day 6",
    examSlot: "T2"
  },
  {
    code: "CSE1116",
    title: "CSE 1116 · Object Oriented Programming Lab(OOP Lab)",
    prerequisite: "CSE 2216",
    credits: 1,
    major: "",
    trimester: "4",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "MATH2205",
    title: "MATH 2205 · Probability and Statistics(STATS)",
    prerequisite: "MATH 1151",
    credits: 3,
    major: "",
    trimester: "5",
    examDay: "Day 2",
    examSlot: "T3"
  },
  {
    code: "SOC2101",
    title: "SOC 2101 · Society, Technology and Engineering Ethics(SOC)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "5",
    examDay: "Day 1",
    examSlot: "T3"
  },
  {
    code: "CSE2217",
    title: "CSE 2217 · Data Structure and Algorithms II(DSA II)",
    prerequisite: "CSE 2215",
    credits: 3,
    major: "",
    trimester: "5",
    examDay: "Day 5",
    examSlot: "T2"
  },
  {
    code: "CSE2218",
    title: "CSE 2218 · Data Structure and Algorithms II Laboratory(DSA II Lab)",
    prerequisite: "CSE 2216",
    credits: 1,
    major: "",
    trimester: "5",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "EEE2113",
    title: "EEE 2113 · Electrical Circuits(EC)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "5",
    examDay: "Day 6",
    examSlot: "T3"
  },
  // Trimester 6
  {
    code: "CSE3521",
    title: "CSE 3521 · Database Management Systems(DBMS)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "6",
    examDay: "Day 2",
    examSlot: "T1"
  },
  {
    code: "CSE3522",
    title: "CSE 3522 · Database Management Systems Lab(DBMS Lab)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "6",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "EEE2123",
    title: "EEE 2123 · Electronics",
    prerequisite: "EEE 2113",
    credits: 3,
    major: "",
    trimester: "6",
    examDay: "Day 6",
    examSlot: "T3"
  },
  {
    code: "EEE2124",
    title: "EEE 2124 · Electronics Lab",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "6",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "CSE4165",
    title: "CSE 4165 · Web Programming(Web)",
    prerequisite: "CSE 1115, CSE 1116",
    credits: 3,
    major: "",
    trimester: "6",
    examDay: "Day 7",
    examSlot: "T1"
  },
  // Trimester 7
  {
    code: "CSE3313",
    title: "CSE 3313 · Computer Architecture(CA)",
    prerequisite: "CSE 1325",
    credits: 3,
    major: "",
    trimester: "7",
    examDay: "Day 1",
    examSlot: "T3"
  },
  {
    code: "CSE2118",
    title: "CSE 2118 · Advanced Object Oriented Programming Lab(AOOP)",
    prerequisite: "CSE 1116",
    credits: 1,
    major: "",
    trimester: "7",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "BIO3105",
    title: "BIO 3105 · Biology for Engineers(BIO)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "7",
    examDay: "Day 3",
    examSlot: "T3"
  },
  {
    code: "CSE3411",
    title: "CSE 3411 · System Analysis and Design(SAD)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "7",
    examDay: "Day 5",
    examSlot: "T1"
  },
  {
    code: "CSE3412",
    title: "CSE 3412 · System Analysis and Design Lab(SAD Lab)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "7",
    examDay: "N/A",
    examSlot: "N/A"
  },
  // Trimester 8
  {
    code: "CSE4325",
    title: "CSE 4325 · Microprocessors and Microcontrollers(Micro)",
    prerequisite: "CSE 3313",
    credits: 3,
    major: "",
    trimester: "8",
    examDay: "Day 2",
    examSlot: "T2"
  },
  {
    code: "CSE4326",
    title: "CSE 4326 · Microprocessors and Microcontrollers Lab(Micro Lab)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "8",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "CSE3421",
    title: "CSE 3421 · Software Engineering(SWE)",
    prerequisite: "CSE 3411",
    credits: 3,
    major: "",
    trimester: "8",
    examDay: "Day 5",
    examSlot: "T3"
  },
  {
    code: "CSE3422",
    title: "CSE 3422 · Software Engineering Lab(SWE Lab)",
    prerequisite: "CSE 3412",
    credits: 1,
    major: "",
    trimester: "8",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "CSE3811",
    title: "CSE 3811 · Artificial Intelligence(AI)",
    prerequisite: "MATH 2205",
    credits: 3,
    major: "",
    trimester: "8",
    examDay: "Day 3",
    examSlot: "T1"
  },
  {
    code: "CSE3812",
    title: "CSE 3812 · Artificial Intelligence Lab(AI Lab)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "8",
    examDay: "N/A",
    examSlot: "N/A"
  },
  // Trimester 9
  {
    code: "CSE2233",
    title: "CSE 2233 · Theory of Computation(TOC)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "9",
    examDay: "Day 7",
    examSlot: "T2"
  },
  {
    code: "GEDOPT1",
    title: "GED OPT1 · General Education Optional-I",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "9",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "PMG4101",
    title: "PMG 4101 · Project Management(PMG)",
    prerequisite: "CSE 3411",
    credits: 3,
    major: "",
    trimester: "9",
    examDay: "Day 3",
    examSlot: "T2"
  },
  {
    code: "CSE3711",
    title: "CSE 3711 · Computer Networks(CN)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "9",
    examDay: "Day 4",
    examSlot: "T3"
  },
  {
    code: "CSE3712",
    title: "CSE 3712 · Computer Networks Lab(CN Lab)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "9",
    examDay: "N/A",
    examSlot: "N/A"
  },
  // Trimester 10
  {
    code: "GEDOPT2",
    title: "GED OPT2 · General Education Optional-II",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "10",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "CSE4000A",
    title: "CSE 4000 A · Final Year Design Project - I",
    prerequisite: "None",
    credits: 2,
    major: "",
    trimester: "10",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "CSEELECTIVE1",
    title: "CSE **** · Elective – I",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "10",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "CSE4509",
    title: "CSE 4509 · Operating Systems(OS)",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "10",
    examDay: "Day 1",
    examSlot: "T1"
  },
  {
    code: "CSE4510",
    title: "CSE 4510 · Operating Systems Laboratory(OS Lab)",
    prerequisite: "None",
    credits: 1,
    major: "",
    trimester: "10",
    examDay: "N/A",
    examSlot: "N/A"
  },
  // Trimester 11
  {
    code: "GEDOPT3",
    title: "GED OPT3 · General Education Optional – III",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "11",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "CSEELECTIVE2",
    title: "CSE **** · Elective – II",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "11",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "CSEELECTIVE3",
    title: "CSE **** · Elective – III",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "11",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "CSE4000B",
    title: "CSE 4000 B · Final Year Design Project - II",
    prerequisite: "CSE 4000 A",
    credits: 2,
    major: "",
    trimester: "11",
    examDay: "N/A",
    examSlot: "N/A"
  },
  {
    code: "CSE4531",
    title: "CSE 4531 · Computer Security",
    prerequisite: "CSE 3711",
    credits: 3,
    major: "",
    trimester: "11",
    examDay: "Day 6",
    examSlot: "T3"
  },
  // Trimester 12
  {
    code: "CSE4000C",
    title: "CSE 4000 C · Final Year Design Project - III",
    prerequisite: "CSE 4000 A & CSE 4000 B",
    credits: 2,
    major: "",
    trimester: "12",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "EEE4261",
    title: "EEE 4261 · Green Computing",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "12",
    examDay: "Day 5",
    examSlot: "T1"
  },
  {
    code: "CSEELECTIVE4",
    title: "CSE **** · Elective – IV",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "12",
    examDay: "----",
    examSlot: "----"
  },
  {
    code: "CSEELECTIVE5",
    title: "CSE **** · Elective – V",
    prerequisite: "None",
    credits: 3,
    major: "",
    trimester: "12",
    examDay: "----",
    examSlot: "----"
  },
  // GED Courses
  {
    code: "ECO4101",
    title: "ECO 4101 · Economics",
    prerequisite: "None",
    credits: 3,
    major: "GED",
    trimester: "GED",
    examDay: "Day 6",
    examSlot: "T1"
  },
  {
    code: "ACT2111",
    title: "ACT 2111 · Financial and Managerial Accounting",
    prerequisite: "None",
    credits: 3,
    major: "GED",
    trimester: "GED",
    examDay: "Day 2",
    examSlot: "T3"
  },
  {
    code: "IPE3401",
    title: "IPE 3401 · Industrial and Operational Management(IPE)",
    prerequisite: "None",
    credits: 3,
    major: "GED",
    trimester: "GED",
    examDay: "Day 1",
    examSlot: "T1"
  },
  {
    code: "TEC2499",
    title: "TEC 2499 · Technology Entrepreneurship",
    prerequisite: "None",
    credits: 3,
    major: "GED",
    trimester: "GED",
    examDay: "Day 3",
    examSlot: "T2"
  },
  {
    code: "CSE4783",
    title: "CSE 4783 · Cryptography",
    prerequisite: "CSE 2213",
    credits: 3,
    major: "network-communications",
    trimester: "elective",
    examDay: "Day 6",
    examSlot: "T2"
  },
  {
    code: "CSE4777",
    title: "CSE 4777 · Network Security",
    prerequisite: "CSE 3711",
    credits: 3,
    major: "network-communications",
    trimester: "elective",
    examDay: "Day 3",
    examSlot: "T3"
  },
  {
    code: "CSE4451",
    title: "CSE 4451 · Human Computer Interaction(HCI)",
    prerequisite: "None",
    credits: 3,
    major: "software",
    trimester: "elective",
    examDay: "Day 3",
    examSlot: "T1"
  },
  {
    code: "CSE4435",
    title: "CSE 4435 · Software Architecture(SA)",
    prerequisite: "None",
    credits: 3,
    major: "software",
    trimester: "elective",
    examDay: "Day 4",
    examSlot: "T2"
  },
  {
    code: "CSE4181",
    title: "CSE 4181 · Mobile Application Development",
    prerequisite: "CSE 1115, CSE 1116",
    credits: 3,
    major: "software",
    trimester: "elective",
    examDay: "Day 6",
    examSlot: "T3"
  },
  {
    code: "CSE4495",
    title: "CSE 4495 · Software Testing and Quality Assurance(SQA)",
    prerequisite: "CSE 3421",
    credits: 3,
    major: "software",
    trimester: "elective",
    examDay: "Day 7",
    examSlot: "T3"
  },
  {
    code: "CSE4945",
    title: "CSE 4945 · UI: Concepts and Design",
    prerequisite: "None",
    credits: 3,
    major: "ict",
    trimester: "elective",
    examDay: "Day 1",
    examSlot: "T2"
  },
  {
    code: "CSE4495",
    title: "CSE 4495 · Software Testing and Quality Assurance(SQA)",
    prerequisite: "CSE 3421",
    credits: 3,
    major: "ict",
    trimester: "elective",
    examDay: "Day 7",
    examSlot: "T3"
  },
  // Add more courses here following the same structure
];

// Export for use in courses.js
if (typeof window !== 'undefined') {
  window.coursesData = coursesData;
}
