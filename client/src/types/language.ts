// BasicLanguageType : code가 아닌 language
export type NationLanguageType = 'KOREAN' | 'ENGLISH';
export type ProgrammingLanguageType = 'JAVASCRIPT' | 'PYTHON' | 'JAVA' | 'C';

export type LanguageType = NationLanguageType | ProgrammingLanguageType;

export type SelectLanguageType = NationLanguageType | 'RANDOM' | 'CODE';
export type SelectProgrammingLanguageType = ProgrammingLanguageType | 'RANDOM';

export interface SelectLanguageItemType {
  value: SelectLanguageType;
  label: string;
}

export interface SelectProgrammingLanguageItemType {
  value: SelectProgrammingLanguageType;
  label: string;
}
