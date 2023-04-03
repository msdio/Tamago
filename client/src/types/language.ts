// BasicLanguageType : code가 아닌 language
export type NationLanguageType = 'korean' | 'english';
export type ProgrammingLanguageType = 'javascript' | 'python' | 'java'; // TODO : random add

export type LanguageType = NationLanguageType | ProgrammingLanguageType;

export type SelectLanguageType = NationLanguageType | 'random' | 'code';
export type SelectProgrammingLanguageType = ProgrammingLanguageType | 'random';
