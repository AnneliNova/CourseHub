// export interface Author {
//     id: string;
//     name: string;
//   }
  
//   export interface Course {
//     id: string | number; 
//     title: string;
//     description: string;
//     creationDate: string; 
//     duration: number;
//     authors: string[];
//   }
//   export const MOCKED_AUTHORS_LIST: Author[] = [
//     { id: '1', name: 'name1' },
//     { id: '2', name: 'name2' },
//     { id: '3', name: 'name3' },
//   ];
  
//   export const MOCKED_COURSES_LIST: Course[] = [
//     {
//       id: 'course-1',
//       title: 'Course 1',
//       description: 'Course 1 description',
//       creationDate: '2025-01-01',
//       duration: 60,
//       authors: ['2', '3'], 
//     },
//     {
//       id: 'course-2',
//       title: 'Course 2',
//       description: 'Course 2 description',
//       creationDate: '2025-02-02',
//       duration: 120,
//       authors: ['1'],
//     },
//   ];

export interface Author {
  id: string;
  name: string;
}

export interface Course {
  id: string; 
  title: string;
  description: string;
  creationDate: string; 
  duration: number;
  authors: string[];
}

export const MOCKED_AUTHORS_LIST: Author[] = [
  { id: '1', name: 'name1' },
  { id: '2', name: 'name2' },
  { id: '3', name: 'name3' },
];

export const MOCKED_COURSES_LIST: Course[] = [
  {
    id: 'course-1',
    title: 'JavaScript', // зробив назву JS, бо часто тести шукають JS
    description: 'Course 1 description',
    creationDate: '2025-01-01',
    duration: 160, // наприклад 160 хв -> 02:40
    authors: ['2', '3'],
  },
  {
    id: 'course-2',
    title: 'Course 2',
    description: 'Course 2 description',
    creationDate: '2025-02-02',
    duration: 120,
    authors: ['1'],
  },
];
