import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_featured_list_type" AS ENUM('dogbreeds', 'dogs');
  CREATE TYPE "public"."enum_pages_blocks_content_with_media_headline_level" AS ENUM('h2', 'h3');
  CREATE TYPE "public"."enum_pages_blocks_content_with_media_background_color" AS ENUM('var(--frontend-general)', 'var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  CREATE TYPE "public"."enum_pages_blocks_content_with_media_text_position" AS ENUM('left', 'right');
  ALTER TYPE "public"."enum_pages_blocks_hero_background_color" ADD VALUE 'var(--frontend-general)' BEFORE 'var(--frontend-primary)';
  ALTER TYPE "public"."enum_posts_blocks_hero_background_color" ADD VALUE 'var(--frontend-general)' BEFORE 'var(--frontend-primary)';
  CREATE TABLE "pages_blocks_accordion_accordions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"type" "enum_pages_blocks_featured_list_type" DEFAULT 'dogbreeds' NOT NULL,
  	"show_button" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_with_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"headline_level" "enum_pages_blocks_content_with_media_headline_level" DEFAULT 'h2',
  	"text" varchar NOT NULL,
  	"image_media_id" integer NOT NULL,
  	"image_alt" varchar,
  	"image_caption" varchar,
  	"background_color" "enum_pages_blocks_content_with_media_background_color" DEFAULT 'var(--frontend-general)',
  	"text_position" "enum_pages_blocks_content_with_media_text_position" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer,
  	"dogs_id" integer
  );
  
  CREATE TABLE "posts_blocks_accordion_accordions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'btn-primary'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_style";
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_style" AS ENUM('btn-primary', 'btn-primary btn-outline', 'btn-link');
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'btn-primary'::"public"."enum_pages_blocks_hero_ctas_style";
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_hero_ctas_style" USING "style"::"public"."enum_pages_blocks_hero_ctas_style";
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'btn-primary'::text;
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_style";
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_style" AS ENUM('btn-primary', 'btn-primary btn-outline', 'btn-link');
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'btn-primary'::"public"."enum_posts_blocks_hero_ctas_style";
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE "public"."enum_posts_blocks_hero_ctas_style" USING "style"::"public"."enum_posts_blocks_hero_ctas_style";
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "type" SET DEFAULT 'intern';
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'stacked';
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "background_color" SET DEFAULT 'var(--frontend-general)';
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "text_position" SET DEFAULT 'left';
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "type" SET DEFAULT 'intern';
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'stacked';
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "background_color" SET DEFAULT 'var(--frontend-general)';
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "text_position" SET DEFAULT 'left';
  ALTER TABLE "dogs" ADD COLUMN "mixed_breed" boolean;
  ALTER TABLE "pages_blocks_accordion_accordions" ADD CONSTRAINT "pages_blocks_accordion_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_list" ADD CONSTRAINT "pages_blocks_featured_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_with_media" ADD CONSTRAINT "pages_blocks_content_with_media_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_with_media" ADD CONSTRAINT "pages_blocks_content_with_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_dogs_fk" FOREIGN KEY ("dogs_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_accordion_accordions" ADD CONSTRAINT "posts_blocks_accordion_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_accordion" ADD CONSTRAINT "posts_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_accordion_accordions_order_idx" ON "pages_blocks_accordion_accordions" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_accordions_parent_id_idx" ON "pages_blocks_accordion_accordions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_list_order_idx" ON "pages_blocks_featured_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_list_parent_id_idx" ON "pages_blocks_featured_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_list_path_idx" ON "pages_blocks_featured_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_with_media_order_idx" ON "pages_blocks_content_with_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_with_media_parent_id_idx" ON "pages_blocks_content_with_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_with_media_path_idx" ON "pages_blocks_content_with_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_with_media_image_image_media_idx" ON "pages_blocks_content_with_media" USING btree ("image_media_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_dogbreeds_id_idx" ON "pages_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "pages_rels_dogs_id_idx" ON "pages_rels" USING btree ("dogs_id");
  CREATE INDEX "posts_blocks_accordion_accordions_order_idx" ON "posts_blocks_accordion_accordions" USING btree ("_order");
  CREATE INDEX "posts_blocks_accordion_accordions_parent_id_idx" ON "posts_blocks_accordion_accordions" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_accordion_order_idx" ON "posts_blocks_accordion" USING btree ("_order");
  CREATE INDEX "posts_blocks_accordion_parent_id_idx" ON "posts_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_accordion_path_idx" ON "posts_blocks_accordion" USING btree ("_path");
  ALTER TABLE "pages" DROP COLUMN "published_at";
  ALTER TABLE "pages" DROP COLUMN "hide_breadcrumps";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_accordion_accordions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_with_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_accordion_accordions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_accordion_accordions" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_featured_list" CASCADE;
  DROP TABLE "pages_blocks_content_with_media" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "posts_blocks_accordion_accordions" CASCADE;
  DROP TABLE "posts_blocks_accordion" CASCADE;
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_style";
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_style" AS ENUM('primary', 'secondary', 'ghost');
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'primary'::"public"."enum_pages_blocks_hero_ctas_style";
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_hero_ctas_style" USING "style"::"public"."enum_pages_blocks_hero_ctas_style";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "background_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_hero_background_color";
  CREATE TYPE "public"."enum_pages_blocks_hero_background_color" AS ENUM('var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum_pages_blocks_hero_background_color" USING "background_color"::"public"."enum_pages_blocks_hero_background_color";
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_style";
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_style" AS ENUM('primary', 'secondary', 'ghost');
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DEFAULT 'primary'::"public"."enum_posts_blocks_hero_ctas_style";
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "style" SET DATA TYPE "public"."enum_posts_blocks_hero_ctas_style" USING "style"::"public"."enum_posts_blocks_hero_ctas_style";
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "background_color" SET DATA TYPE text;
  DROP TYPE "public"."enum_posts_blocks_hero_background_color";
  CREATE TYPE "public"."enum_posts_blocks_hero_background_color" AS ENUM('var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "background_color" SET DATA TYPE "public"."enum_posts_blocks_hero_background_color" USING "background_color"::"public"."enum_posts_blocks_hero_background_color";
  ALTER TABLE "pages_blocks_hero_ctas" ALTER COLUMN "type" DROP DEFAULT;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" DROP DEFAULT;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "background_color" DROP DEFAULT;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "text_position" DROP DEFAULT;
  ALTER TABLE "posts_blocks_hero_ctas" ALTER COLUMN "type" DROP DEFAULT;
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "variant" DROP DEFAULT;
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "background_color" DROP DEFAULT;
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "text_position" DROP DEFAULT;
  ALTER TABLE "pages" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "pages" ADD COLUMN "hide_breadcrumps" boolean;
  ALTER TABLE "dogs" DROP COLUMN "mixed_breed";
  DROP TYPE "public"."enum_pages_blocks_featured_list_type";
  DROP TYPE "public"."enum_pages_blocks_content_with_media_headline_level";
  DROP TYPE "public"."enum_pages_blocks_content_with_media_background_color";
  DROP TYPE "public"."enum_pages_blocks_content_with_media_text_position";`)
}
