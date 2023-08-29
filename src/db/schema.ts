import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  used: integer("used").notNull().default(0),
});

export type Link = typeof links.$inferSelect;
export type InsertLink = typeof links.$inferInsert;
