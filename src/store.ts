import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import Hashids from "hashids";
import { Link, links } from "./db/schema";
import { desc, eq } from "drizzle-orm";

const sqlite = new Database("short.db");
const hashids = new Hashids(process.env.SALT, 10);

export class Store {
  private static _instance?: Store;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private _db: BetterSQLite3Database = drizzle(sqlite);

  public async addLink(url: string): Promise<string> {
    const inserted = await this._db
      .insert(links)
      .values({
        url: url,
        createdAt: new Date(),
      })
      .returning({ insertedId: links.id });

    const id = inserted[0].insertedId;
    return hashids.encode(id);
  }

  public async getLink(id: string): Promise<string | undefined> {
    try {
      const [numericId] = hashids.decode(id);

      if (!numericId || typeof numericId !== "number") return undefined;

      const [link] = await this._db
        .select()
        .from(links)
        .where(eq(links.id, numericId))
        .limit(1);

      if (!link) return undefined;

      await this._db
        .update(links)
        .set({
          used: link.used + 1,
        })
        .where(eq(links.id, numericId));

      return link.url;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  public async list(): Promise<(Omit<Link, "id"> & { id: string })[]> {
    const list = await this._db
      .select()
      .from(links)
      .orderBy(desc(links.createdAt));

    return list.map((link) => ({
      id: hashids.encode(link.id),
      url: link.url,
      createdAt: link.createdAt,
      used: link.used,
    }));
  }

  public async remove(id: string): Promise<void> {
    const [numericId] = hashids.decode(id);

    if (!numericId || typeof numericId !== "number") return undefined;
    await this._db.delete(links).where(eq(links.id, numericId));
  }
}
