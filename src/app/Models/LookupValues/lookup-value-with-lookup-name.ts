export class LookupValueWithLookupName {
  constructor(
    public valueId: number,
    public valueName: string,
    public lookupId: number,
    public lookupname?: string
  ) {}
}
