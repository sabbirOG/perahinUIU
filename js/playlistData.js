// Dynamic playlist data for Perahin UIU (simplified)
// Add a new object to the playlists array for each course playlist
window.playlists = [
	{
		code: 'ENG 1011',
		name: 'English I',
		trimester: 1,
		url: 'https://youtube.com/playlist?list=PLPKuptha2cLlTrmho6RMbcEVQ8Dta2-1N&si=xYRmo6yVXaZ3GWBN',
		by: 'Student'
	},
	{
		code: 'ENG 1013',
		name: 'English II',
		trimester: 2,
		url: 'https://youtube.com/playlist?list=PLPKuptha2cLm5qw8gWrc8Zqd48z2e12D7&si=8qncilhY_Y0FW2H1',
		by: 'Student'
	},
	{
		code: 'CSE 1115',
		name: 'Object Oriented Programming(OOP)',
		trimester: 4,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjwBwhdQ-zCwreAag48ReAr&si=30ngblQ49acr3X5j',
		by: 'Fahim Shahriar'
	},
	{
		code: 'CSE 2215',
		name: 'Data Structure and Algorithms I(DSA I)',
		trimester: 3,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPiE99cj8vTDBqoIe1RPx2xB&si=r5nBRPe65LIWraWQ',
		by: 'Dr. Nurul Huda'
	},
	{
		code: 'MATH 1151',
		name: 'Fundamental Calculus',
		trimester: 1,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPgSXzY50bxmyipW0ob2UThn&si=0uO3GMg2eRaMeZlu',
		by: 'JAS. Jashodhan Saha'
	},
	{
		code: 'CSE 3811',
		name: 'Artificial Intelligence(AI)',
		trimester: 8,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjqdSnQokgNsjCQUwcMsMIB&si=9I-0qPH9_LU0-J35',
		by: 'Rubaiya Ratin Khan'
	},
	{
		code: 'CSE 2233',
		name: 'Theory of Computation(TOC)',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPiZrS0emDuD0NqFusfnV5bf&si=s0NFmzzeCCo-zTOn',
		by: 'Nabila Sabrin Sworna'
	},
	{
		code: 'CSE 3521',
		name: 'Database Management Systems(DBMS)',
		trimester: 6,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV0bwHpQZXDiyEVguULMGTVX&si=Zjx42Q18fx7_dOFA',
		by: 'Imam Hossain'
	},
	{
		code: 'CSE 3313',
		name: 'Computer Architecture(CA)',
		trimester: 7,
		url: 'https://youtube.com/playlist?list=PL1wysh73nDqREHHKru0TaGu6qUWZTddOF&si=T5lqHGH5yg6uLtyd',
		by: 'Shoaib Ahmed Shourov'
	},
	{
		code: 'CSE 3411',
		name: 'System Analysis and Design(SAD)',
		trimester: 7,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPi8dfAhsyq2KQxcPECqHeRg&si=jAAiG4g2l6rhCnc_',
		by: 'Farhanaz Farheen'
	},
	{
		code: 'EEE 2123',
		name: 'Electronics',
		trimester: 6,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPi0d6MXE7qf4NDv6Zpf44Hh&si=8AEzBLoG-Ozq5YPd',
		by: 'Abir Hassan'
	},
	{
		code: 'EEE 2113',
		name: 'Electrical Circuits(EC)',
		trimester: 5,
		url: 'https://youtube.com/playlist?list=PLeZJy4pEspfXnRNQVBZNWV3o6iW1EFkuh&si=l59tf1v9oguhgF7y',
		by: 'Fahim Hafiz'
	},
	{
		code: 'ACT 2111',
		name: 'Financial and Managerial Accounting(ACT)',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPgUezIIsAcggyH5Ob6ly4VP&si=lbqiM1pHpKhzb8BH',
		by: 'Mohamad Amzad Hossain'
	},
	{
		code: 'IPE 3404',
		name: 'Industrial and Operational Management(IPE)',
		trimester: 10,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPifXICH5aBFgZHJkFvsxg_I&si=MvvIVd7WXnUbqjvd',
		by: 'Gourab Kumar Roy'
	},
	{
		code: 'CSE 4325',
		name: 'Microprocessors and Microcontrollers(MICRO)',
		trimester: 8,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPj4JqidihQwAzmK6T8H_ln7&si=qFMRorag4BSrdkfZ',
		by: 'Mahbub hossain raton'
	},
	{
		code: 'MATH 2201',
		name: 'Coordinate Geometry and Vector Analysis(VECTOR)',
		trimester: 4,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPiW7q4h1Map9mKpILTn48Vo&si=zRKrOE_J_-q2Ph00',
		by: 'Mr. Muhaiminul Islam Adnan'
	},
	{
		code: 'CSE 3521',
		name: 'Database Management Systems(DBMS)',
		trimester: 6,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjUjQUH8rol0iR5dgUIv52c&si=L4Jm3BPZFxN8Mz_u',
		by: 'Imam Hossain'
	},
	{
		code: 'CSE 4621',
		name: 'Computer Graphics(CG)',
		trimester: 0,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjxuC5hFfLxwHp6stDFe6DM&si=7RnTzfyFzkin_p4o',
		by: 'Md. Hasan Al Kayem'
	},
	{
		code: 'CSE 4587',
		name: 'Cloud Computing(CC)',
		trimester: 0,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPh30o4BPIiPsrYnxi9NuReU&si=Us_X56QfigmzTakj',
		by: 'Dr. A.K.M. Muzahidul Islam'
	},
	{
		code: 'CSE 2118',
		name: 'Advanced Object Oriented Programming Lab(AOOP)',
		trimester: 7,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPgrFOBI4YxNSOEBbD6h4hXE&si=xxRNvxG6-b2PCJrh',
		by: 'Fahim Shahriar'
	},
	{
		code: 'CSE 2217',
		name: 'Data Structure & Algorithm II(DSA II)',
		trimester: 5,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPgBw7cPso8WfaTGLdR2zJZQ&si=n24YxIVKkSeOXqaw',
		by: 'DR. Mohammad Shahriar Rahman'
	},
	{
		code: 'CSE 3313',
		name: 'Computer Architecture(CA)',
		trimester: 7,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjOxfWbmx-H3PiF0Xabi0HU&si=0fKVd3lwBAQtjnsi',
		by: 'Nabila Sabrin'
	},
	{
		code: 'CSE 3421',
		name: 'Software Engineering(SWE)',
		trimester: 8,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPgepsuDv5zQX97CTQWu5_Rr&si=KAID62pJgt3yhJRE',
		by: 'Rafi Ur Rashid'
	},
	{
		code: 'MATH 2205',
		name: 'Probability and Statistics(STAT)',
		trimester: 5,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPgs2CYLjpU0zCEzPxDoOjhm&si=z0jb3KsctzkJQRgh',
		by: 'Mahtab Uddin'
	},
	{
		code: 'MATH 2201',
		name: 'Coordinate Geometry and Vector Analysis(VECTOR)',
		trimester: 4,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPhmia6qm42wjpffVJsFBp6b&si=ePBpZDGjV3AQEgrx',
		by: 'Ms. Maliha Tasmiah Noushin'
	},
	{
		code: 'CSE 4509',
		name: 'Operating System(OS)',
		trimester: 10,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPiuxm-GjBI8lXFp9M19v-lD&si=D_Q2p51Odoz9i95Y',
		by: 'Md. Rayhan Ahmed'
	},
	{
		code: 'MATH 1151',
		name: 'Fundamental Calculas(CAL)',
		trimester: 1,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPj0gnQgBIlKPrcdiDMWKOHR&si=6BfnpgvksFe8UH1X',
		by: 'Ms. Maliha Tasmia Noushin'
	},
	{
		code: 'CSE 3711',
		name: 'Computer Networks(CN)',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjylxInMoRv6p3ZnU9JRNha&si=ZH1TRwC0NegsKIB6',
		by: 'Azim Uddin Chowdhury'
	},
	{
		code: 'PHY 2105',
		name: 'Physics',
		trimester: 3,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjMqC_lEN4UU5YsW2yDfQ_S&si=emcj7Fj9UFiekw4V',
		by: 'Tuhin Ahmed Imran'
	},
	{
		code: 'CSE 1325',
		name: 'Digital Logic Design(DLD)',
		trimester: 4,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPhZFbjQa36MqE5MLLUjGYc3&si=E7my9vf4kh10uPRq',
		by: 'Md. Abir Hassan'
	},
	{
		code: 'BIO 3105',
		name: 'Biology for Engineers(BIO)',
		trimester: 7,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPieRPfsVf6jiFSOvT-Zq9tN&si=cAc3bObxehBvTp7D',
		by: 'Nipa Roy'
	},
	{
		code: 'CSE 4611',
		name: 'Compiler Design(CD)',
		trimester: 0,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPidPjIs1Zh9opdanOP3mgKQ&si=NVkLFzXEU1erpiO7',
		by: 'Nahid Hossain'
	},
	{
		code: 'CSE 2233',
		name: 'Theory of Computation(TOC)',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV2EIaHOTsuny-SgrqVW4rq6&si=5AA4M5IxtrgFvXqA',
		by: 'Nabila Showrna'
	},
	{
		code: 'CSE 3711',
		name: 'Computer Networks(CN)',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV2Dqx74QpAWFltxWTfdyTkv&si=5z0QJDrY2lGFsOF3',
		by: ' Mohammad Mamun Elahi'
	},
	{
		code: 'CSE 4165',
		name: 'Web Programming(WP)',
		trimester: 6,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV3vemWU5s_3ar1CKlrOrmAi&si=0y0lRJAStU6uNOzB',
		by: 'Md. Saidul Hoque Anik'
	},
	{
		code: '',
		name: 'Computer Graphics(CG)',
		trimester: 0,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV0ayK6DC8q3u9sDat8P68j4&si=6qKb5NdhWo1v7Mqw',
		by: 'Md. Ashikur Rahman'
	},
	{
		code: 'CSE 2218',
		name: 'Data Structure and Algorithm II Lab(DSA II)',
		trimester: 5,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV1Oaag99Ng5MdefQeG1Wtdj&si=3I9XlYjvV34lcesq',
		by: 'Mohammad Imam Hossain'
	},
	{
		code: 'CSE 4889',
		name: 'Machine Learning(ML)',
		trimester: 0,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV1Oaag99Ng5MdefQeG1Wtdj&si=3I9XlYjvV34lcesq',
		by: 'Chowdhury Rafeed Rahman'
	},
	{
		code: 'CSE 1110',
		name: 'Introduction to Computer Systems Lab(ICS)',
		trimester: 1,
		url: 'https://youtube.com/playlist?list=PLPKuptha2cLl7i6BXy1APo1MHnrPf8tdi&si=DFwxJCh6LI_IC41i',
		by:'student'
	},
	{
		code: 'CSE 2213',
		name: 'Discrete Mathematics(DM)',
		trimester: 2,
		url: 'https://youtube.com/playlist?list=PLcjm5nirmcB_rsLqi1RKGweFXqhj_UEzj&si=Xr5Y8Rc6jvIlxALw',
		by: 'Minhajurl Bashir'
	},
	{
		code: 'CSE 2213',
		name: 'Discrete Mathematics(DM)',
		trimester: 2,
		url: 'https://youtube.com/playlist?list=PLGuoZAsot0sJTP7nPADNh3mWjXpLciVen&si=oI4dozsaEPh83NDb',
		by: 'Shoumik Saha'
	},
	{
		code: 'CSE 2213',
		name: 'Discrete Mathematics(DM)',
		trimester: 2,
		url: 'https://youtube.com/playlist?list=PLPKuptha2cLmcncrJCIC5nMy0GiczS9e0&si=9LKQSBaB6Z0aDgKW ',
		by: 'Student'
	},
	{
		code: 'CSE 4509',
		name: 'Operating System(OS) - MID',
		trimester: 10,
		url: 'https://youtube.com/playlist?list=PLsdVtztJ1W36p6rswwcfskvPnAhvcP1Vx&si=cWUtjO7hQSVg2iAt',
		by: 'Student'
	},
	{
		code: 'CSE 3711',
		name: 'Computer Networks(CN) - FINAL',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PLsdVtztJ1W37aqm8lDVp6zduSKRZhmvKa&si=nmkGYzTwCrlPCUAV',
		by: 'Student'
	},
	{
		code: 'CSE 3711',
		name: 'Computer Networks(CN) - MID',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PLsdVtztJ1W36ntho1Zd9MZ2ZJ9QLoW9MD&si=FvheJCDdV82YrKTP',
		by: 'Student'
	},
	{
		code: 'CSE 1115',
		name: 'Object Oriented Programming (OOP java)',
		trimester: 4,
		url: 'https://youtube.com/playlist?list=PLqleLpAMfxGCbdaJ6SoExDfHrTfRDeWeG&si=7FeWLGxK5svqBUsq',
		by: 'suggested'
	},
	{
		code: 'CSE 1111',
		name: 'Structured Programming Language(SPL)',
		trimester: 2,
		url: 'https://youtube.com/playlist?list=PLcjm5nirmcB_efZqrcnKHHM8pfV6mhrPp&si=5QSrXKkqA1Qk8SRI',
		by: 'Ahmed Fahim'
	},
	{
		code: 'CSE 1111',
		name: 'Structured Programming Language(SPL)',
		trimester: 2,
		url: 'https://youtu.be/gehNUCX5KAU?si=6GRJEpdXzRPIhV-8',
		by: 'Final QS Solve'
	},
	{
		code: 'CSE 1111',
		name: 'Structured Programming Language(SPL)',
		trimester: 2,
		url: 'https://www.youtube.com/live/w7kYR1P48a8?si=LarYg0s3o2TTcd-o',
		by: 'MID QS Solve'
	},
	{
		code: 'CSE 3421',
		name: 'Software Engineering(SWE)',
		trimester: 8,
		url: 'https://www.youtube.com/playlist?list=PLkO3e8HCh8uL8zOsHGuWiL68mSy9qSSjv',
		by: 'Samin Sharaf Shomik'
	},
	{
		code: 'BDS 1201',
		name: 'History of the Emergence of Bangladesh(BDS)',
		trimester: 1,
		url: 'https://youtube.com/playlist?list=PLPKuptha2cLnhGaO4IqR38ftLWTW7wuR-&si=43PlLASAerutOpqw',
		by: 'Student'
	}
];
