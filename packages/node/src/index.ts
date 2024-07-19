import { XcrowInput } from "./contracts";

export class Xcrow {
  private apiKey: string;
  private apiSecret: string;

  constructor(input: XcrowInput) {
    this.apiKey = input.apiKey;
    this.apiSecret = input.apiSecret;
  }
}