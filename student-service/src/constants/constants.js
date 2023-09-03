export const address = '0x99F870B4B95c3d905EEf4a0Ab1DC420BF00bC652';
export const abi = [
  {
    inputs: [
      { internalType: 'address[]', name: '_users', type: 'address[]' },
      { internalType: 'string[]', name: '_exams', type: 'string[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: 'examResult',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'grade',
        type: 'uint256',
      },
    ],
    name: 'examGraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'student',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'examResult',
        type: 'string',
      },
    ],
    name: 'examRegistered',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'bool', name: '_isProfessor', type: 'bool' },
    ],
    name: 'getExamResults',
    outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getExams',
    outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
    name: 'getUser',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_examResult', type: 'string' },
      { internalType: 'uint8', name: '_grade', type: 'uint8' },
    ],
    name: 'gradeExam',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_professor', type: 'address' },
      { internalType: 'string', name: '_examResult', type: 'string' },
    ],
    name: 'registerExam',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];
