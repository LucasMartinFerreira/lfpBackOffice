export const URL: string = 'https://tft-node.herokuapp.com';
export const URL_2: string = 'https://top-futbol-api.herokuapp.com';

export class Constants {
  public static get HOME_DEV(): string { return URL_2 };

  public static get HOME_DEV_Multipart(): string { return URL_2 };

  public static get formatData(): string {return 'DD-MM-YYYY'}

  public static get exprNumber() : string {return '^\\d+$'}

  public static get exprDate(): string {return '^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$'}

  public static get exprLink(): string {return '^http:\\/\\/www\\.|^https:\\/\\/www\\.|^http:\\/\\/|^https:\\/\\/?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'}

}
