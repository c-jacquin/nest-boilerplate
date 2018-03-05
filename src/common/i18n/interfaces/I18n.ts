export interface I18n {
  locale(): string;
  setLocale(locale: string): void;
  translate(phrase: string, variables?: any): string;
}
