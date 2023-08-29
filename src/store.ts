import { randomBytes } from "crypto";

export class Store {
  private static _instance?: Store;

  private constructor() { }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }


  private _store = new Map<string, string>()

  public addLink(url: string): string {
    const id = randomBytes(8).toString('base64url')
    this._store.set(id, url)
    return id
  }

  public getLink(id: string): string | undefined {
    return this._store.get(id)
  }

  public list(): {id: string, url: string}[] {
    const list: {id: string, url: string}[] = []

    this._store.forEach((value, key) => {
      list.push({
        id: key,
        url: value
      })
    })

    return list
  }

}
