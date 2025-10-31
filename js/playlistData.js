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
		name: 'Object Oriented Programming',
		trimester: 4,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjwBwhdQ-zCwreAag48ReAr&si=30ngblQ49acr3X5j',
		by: 'Fahim Shahriar'
	},
	{
		code: 'CSE 2215',
		name: 'Data Structure and Algorithms I',
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
		name: 'Artificial Intelligence',
		trimester: 8,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjqdSnQokgNsjCQUwcMsMIB&si=9I-0qPH9_LU0-J35',
		by: 'Rubaiya Ratin Khan'
	},
	{
		code: 'CSE 2233',
		name: 'Theory of Computation',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPiZrS0emDuD0NqFusfnV5bf&si=s0NFmzzeCCo-zTOn',
		by: 'Nabila Sabrin Sworna'
	},
	{
		code: 'CSE 3521',
		name: 'Database Management Systems',
		trimester: 6,
		url: 'https://youtube.com/playlist?list=PLLcmBPjTlvV0bwHpQZXDiyEVguULMGTVX&si=Zjx42Q18fx7_dOFA',
		by: 'Imam Hossain'
	},
	{
		code: 'CSE 3313',
		name: 'Computer Architecture',
		trimester: 7,
		url: 'https://youtube.com/playlist?list=PL1wysh73nDqREHHKru0TaGu6qUWZTddOF&si=T5lqHGH5yg6uLtyd',
		by: 'Shoaib Ahmed Shourov'
	},
	{
		code: 'CSE 3411',
		name: 'System Analysis and Design',
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
		name: 'Electrical Circuits',
		trimester: 5,
		url: 'https://youtube.com/playlist?list=PLeZJy4pEspfXnRNQVBZNWV3o6iW1EFkuh&si=l59tf1v9oguhgF7y',
		by: 'Fahim Hafiz'
	},
	{
		code: 'GED OPT1',
		name: 'General Education Optional – I (ACT 2111)',
		trimester: 9,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPgUezIIsAcggyH5Ob6ly4VP&si=lbqiM1pHpKhzb8BH',
		by: 'Mohamad Amzad Hossain'
	},
	{
		code: 'GED OPT3',
		name: 'General Education Optional – III (IPE - 3401)',
		trimester: 11,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPifXICH5aBFgZHJkFvsxg_I&si=MvvIVd7WXnUbqjvd',
		by: 'Gourab Kumar Roy'
	},
	{
		code: 'CSE 4325',
		name: 'Microprocessors and Microcontrollers',
		trimester: 8,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPj4JqidihQwAzmK6T8H_ln7&si=qFMRorag4BSrdkfZ',
		by: 'Mahbub hossain raton'
	},
	{
		code: 'MATH 2201',
		name: 'Coordinate Geometry and Vector Analysis',
		trimester: 4,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPiW7q4h1Map9mKpILTn48Vo&si=zRKrOE_J_-q2Ph00',
		by: 'Mr. Muhaiminul Islam Adnan'
	},
	{
		code: 'CSE 3521',
		name: 'Database Management Systems',
		trimester: 6,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjUjQUH8rol0iR5dgUIv52c&si=L4Jm3BPZFxN8Mz_u',
		by: 'Imam Hossain'
	},
	{
		code: 'CSE 4621',
		name: 'Compute Graphics',
		trimester: 0,
		url: 'https://youtube.com/playlist?list=PL3_ATDyQLqPjxuC5hFfLxwHp6stDFe6DM&si=7RnTzfyFzkin_p4o',
		by: 'Md. Hasan Al Kayem'
	}
	
];
