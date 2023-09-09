import { Database } from "bun:sqlite";
import crypto from "crypto";
import { Link } from "./types/link";

const db = new Database("short-links.db", { create: true });

export function addLink(url: string): string {
  try {
    const id = crypto.randomBytes(8).toString("base64url");
    console.log(`Adding link ${id} -> ${url}`);

    const query = db.query("INSERT INTO links (id, url) VALUES (?1, ?2)");
    query.run(id, url);

    return id;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export function useLink(id: string): string {
  try {
    const query = db.query("SELECT url FROM links WHERE id = ?1");
    const link = query.get(id) as { url: string } | undefined;

    if (!link) {
      throw new Error(`Link ${id} not found`);
    }

    const update = db.query(
      "UPDATE links SET use_count = use_count + 1 WHERE id = ?1",
    );
    update.run(id);

    return link.url;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export function getLinks(): Link[] {
  try {
    const query = db.query("SELECT * FROM links");
    const raw_links = query.all();

    Bun.sleepSync(2000);

    const links: Link[] = raw_links.map((link: any) => ({
      id: link.id,
      url: link.url,
      createdAt: new Date(link.created_at),
      useCount: link.use_count,
    }));

    return links as Link[];
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export function deleteLink(id: string): void {
  try {
    const query = db.query("DELETE FROM links WHERE id = ?1");
    query.run(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
