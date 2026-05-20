import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const analysesTable = pgTable("analyses", {
  id: serial("id").primaryKey(),
  storeName: text("store_name").notNull(),
  storeUrl: text("store_url"),
  storeDescription: text("store_description"),
  productSamples: text("product_samples"),
  shippingPolicy: text("shipping_policy"),
  returnPolicy: text("return_policy"),
  faqContent: text("faq_content"),
  aboutContent: text("about_content"),
  merchantIntent: text("merchant_intent"),
  category: text("category"),
  status: text("status").notNull().default("pending"),
  overallScore: integer("overall_score"),
  overallGrade: text("overall_grade"),
  aiPerception: text("ai_perception"),
  dimensions: jsonb("dimensions"),
  recommendations: jsonb("recommendations"),
  perceptionGap: jsonb("perception_gap"),
  scoreDelta: integer("score_delta"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const insertAnalysisSchema = createInsertSchema(analysesTable).omit({
  id: true,
  createdAt: true,
  completedAt: true,
  status: true,
  overallScore: true,
  overallGrade: true,
  aiPerception: true,
  dimensions: true,
  recommendations: true,
  perceptionGap: true,
  scoreDelta: true,
});
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analysesTable.$inferSelect;
