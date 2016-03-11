declare module "i18n-client" {
  export interface I18n {
    add(lang: string, translations: Object): void;
    translate(key: string, args?: any): string;
    initTranslator(prefix: string): (key: string) => string;
  }
  export let i18n: I18n;
  export function __(key: string, args?: any): string;
}
