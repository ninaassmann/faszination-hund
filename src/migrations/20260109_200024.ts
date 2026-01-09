import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_dogs_images_type" AS ENUM('thumbnail', 'gallery');
  CREATE TYPE "public"."enum_dogs_gender" AS ENUM('female', 'male');
  CREATE TYPE "public"."enum_dogs_castration" AS ENUM('yes', 'tooYoung', 'no');
  CREATE TYPE "public"."enum_dogs_adoption_status" AS ENUM('available', 'reserved', 'adopted');
  CREATE TYPE "public"."enum_dogs_location_type" AS ENUM('fosterHome', 'shelter', 'euthanasiaCenter');
  CREATE TYPE "public"."enum_dogs_earliest_arrival_type" AS ENUM('fixed', 'estimated', 'unknown');
  CREATE TYPE "public"."enum_dogs_birth_date_type" AS ENUM('exact', 'estimated', 'unknown');
  CREATE TYPE "public"."enum_dogs_breed_type" AS ENUM('known', 'estimated', 'unknown');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_type" AS ENUM('intern', 'extern');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_style" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('stacked', 'split', 'imageBackground');
  CREATE TYPE "public"."enum_pages_blocks_hero_background_color" AS ENUM('var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  CREATE TYPE "public"."enum_pages_blocks_hero_text_position" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_type" AS ENUM('intern', 'extern');
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_style" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_hero_variant" AS ENUM('stacked', 'split', 'imageBackground');
  CREATE TYPE "public"."enum_posts_blocks_hero_background_color" AS ENUM('var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  CREATE TYPE "public"."enum_posts_blocks_hero_text_position" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TABLE "dogs_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"type" "enum_dogs_images_type" NOT NULL
  );
  
  CREATE TABLE "dogs_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "dogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"gender" "enum_dogs_gender",
  	"castration" "enum_dogs_castration",
  	"castration_info" varchar,
  	"adoption_status" "enum_dogs_adoption_status",
  	"adoption_date" timestamp(3) with time zone,
  	"location" varchar NOT NULL,
  	"location_type" "enum_dogs_location_type",
  	"earliest_arrival_type" "enum_dogs_earliest_arrival_type" DEFAULT 'unknown',
  	"earliest_arrival_date" timestamp(3) with time zone,
  	"birth_date" timestamp(3) with time zone,
  	"birth_date_type" "enum_dogs_birth_date_type" DEFAULT 'unknown',
  	"breed_type" "enum_dogs_breed_type" DEFAULT 'unknown',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dogs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
  CREATE TABLE "dogbreeds_descriptions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"source" varchar
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_pages_blocks_hero_ctas_type" NOT NULL,
  	"intern_id" integer,
  	"extern" varchar,
  	"style" "enum_pages_blocks_hero_ctas_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar NOT NULL,
  	"text" varchar,
  	"image_id" integer,
  	"background_color" "enum_pages_blocks_hero_background_color",
  	"text_position" "enum_pages_blocks_hero_text_position",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_pages_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"hide_breadcrumps" boolean,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_posts_blocks_hero_ctas_type" NOT NULL,
  	"intern_id" integer,
  	"extern" varchar,
  	"style" "enum_posts_blocks_hero_ctas_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "posts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_hero_variant" NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar NOT NULL,
  	"text" varchar,
  	"image_id" integer,
  	"background_color" "enum_posts_blocks_hero_background_color",
  	"text_position" "enum_posts_blocks_hero_text_position",
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_posts_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"light_mode_icon_id" integer,
  	"light_mode_logo_id" integer,
  	"dark_mode_icon_id" integer,
  	"dark_mode_logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "dogbreeds" DROP CONSTRAINT "dogbreeds_details_coat_types_id_coat_types_id_fk";
  
  DROP INDEX "dogbreeds_details_details_coat_types_idx";
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_weight_female" SET DATA TYPE varchar;
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_weight_male" SET DATA TYPE varchar;
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_height_female" SET DATA TYPE varchar;
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_height_male" SET DATA TYPE varchar;
  ALTER TABLE "media" ADD COLUMN "source" varchar;
  ALTER TABLE "dogbreeds_rels" ADD COLUMN "coat_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dogs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "dogs_images" ADD CONSTRAINT "dogs_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogs_images" ADD CONSTRAINT "dogs_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogs_blocks_content" ADD CONSTRAINT "dogs_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogs" ADD CONSTRAINT "dogs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogs_rels" ADD CONSTRAINT "dogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogs_rels" ADD CONSTRAINT "dogs_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_descriptions" ADD CONSTRAINT "dogbreeds_descriptions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_intern_id_pages_id_fk" FOREIGN KEY ("intern_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_ctas" ADD CONSTRAINT "posts_blocks_hero_ctas_intern_id_pages_id_fk" FOREIGN KEY ("intern_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_ctas" ADD CONSTRAINT "posts_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content" ADD CONSTRAINT "posts_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_sources" ADD CONSTRAINT "posts_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_light_mode_icon_id_media_id_fk" FOREIGN KEY ("light_mode_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_light_mode_logo_id_media_id_fk" FOREIGN KEY ("light_mode_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_dark_mode_icon_id_media_id_fk" FOREIGN KEY ("dark_mode_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_dark_mode_logo_id_media_id_fk" FOREIGN KEY ("dark_mode_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "dogs_images_order_idx" ON "dogs_images" USING btree ("_order");
  CREATE INDEX "dogs_images_parent_id_idx" ON "dogs_images" USING btree ("_parent_id");
  CREATE INDEX "dogs_images_media_idx" ON "dogs_images" USING btree ("media_id");
  CREATE INDEX "dogs_blocks_content_order_idx" ON "dogs_blocks_content" USING btree ("_order");
  CREATE INDEX "dogs_blocks_content_parent_id_idx" ON "dogs_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "dogs_blocks_content_path_idx" ON "dogs_blocks_content" USING btree ("_path");
  CREATE INDEX "dogs_meta_meta_image_idx" ON "dogs" USING btree ("meta_image_id");
  CREATE INDEX "dogs_updated_at_idx" ON "dogs" USING btree ("updated_at");
  CREATE INDEX "dogs_created_at_idx" ON "dogs" USING btree ("created_at");
  CREATE INDEX "dogs_rels_order_idx" ON "dogs_rels" USING btree ("order");
  CREATE INDEX "dogs_rels_parent_idx" ON "dogs_rels" USING btree ("parent_id");
  CREATE INDEX "dogs_rels_path_idx" ON "dogs_rels" USING btree ("path");
  CREATE INDEX "dogs_rels_dogbreeds_id_idx" ON "dogs_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "dogbreeds_descriptions_order_idx" ON "dogbreeds_descriptions" USING btree ("_order");
  CREATE INDEX "dogbreeds_descriptions_parent_id_idx" ON "dogbreeds_descriptions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_intern_idx" ON "pages_blocks_hero_ctas" USING btree ("intern_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_title_idx" ON "pages" USING btree ("title");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "posts_blocks_hero_ctas_order_idx" ON "posts_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_ctas_parent_id_idx" ON "posts_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_ctas_intern_idx" ON "posts_blocks_hero_ctas" USING btree ("intern_id");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_image_idx" ON "posts_blocks_hero" USING btree ("image_id");
  CREATE INDEX "posts_blocks_content_order_idx" ON "posts_blocks_content" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_parent_id_idx" ON "posts_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_path_idx" ON "posts_blocks_content" USING btree ("_path");
  CREATE INDEX "posts_sources_order_idx" ON "posts_sources" USING btree ("_order");
  CREATE INDEX "posts_sources_parent_id_idx" ON "posts_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_dogbreeds_id_idx" ON "posts_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "settings_light_mode_icon_idx" ON "settings" USING btree ("light_mode_icon_id");
  CREATE INDEX "settings_light_mode_logo_idx" ON "settings" USING btree ("light_mode_logo_id");
  CREATE INDEX "settings_dark_mode_icon_idx" ON "settings" USING btree ("dark_mode_icon_id");
  CREATE INDEX "settings_dark_mode_logo_idx" ON "settings" USING btree ("dark_mode_logo_id");
  ALTER TABLE "dogbreeds_rels" ADD CONSTRAINT "dogbreeds_rels_coat_types_fk" FOREIGN KEY ("coat_types_id") REFERENCES "public"."coat_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dogs_fk" FOREIGN KEY ("dogs_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "dogbreeds_rels_coat_types_id_idx" ON "dogbreeds_rels" USING btree ("coat_types_id");
  CREATE INDEX "payload_locked_documents_rels_dogs_id_idx" ON "payload_locked_documents_rels" USING btree ("dogs_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  ALTER TABLE "dogbreeds" DROP COLUMN "details_coat_types_id";
  ALTER TABLE "dogbreeds" DROP COLUMN "descriptions_general";
  ALTER TABLE "dogbreeds" DROP COLUMN "descriptions_appearance";
  ALTER TABLE "dogbreeds" DROP COLUMN "descriptions_character";
  ALTER TABLE "dogbreeds" DROP COLUMN "descriptions_training";
  ALTER TABLE "dogbreeds" DROP COLUMN "descriptions_roles";
  ALTER TABLE "dogbreeds" DROP COLUMN "descriptions_health";
  ALTER TABLE "dogbreeds" DROP COLUMN "descriptions_fun_facts";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dogs_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dogs_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dogs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dogs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dogbreeds_descriptions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_sources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dogs_images" CASCADE;
  DROP TABLE "dogs_blocks_content" CASCADE;
  DROP TABLE "dogs" CASCADE;
  DROP TABLE "dogs_rels" CASCADE;
  DROP TABLE "dogbreeds_descriptions" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "posts_blocks_hero_ctas" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_content" CASCADE;
  DROP TABLE "posts_sources" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "settings" CASCADE;
  ALTER TABLE "dogbreeds_rels" DROP CONSTRAINT "dogbreeds_rels_coat_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dogs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  DROP INDEX "dogbreeds_rels_coat_types_id_idx";
  DROP INDEX "payload_locked_documents_rels_dogs_id_idx";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_weight_female" SET DATA TYPE numeric;
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_weight_male" SET DATA TYPE numeric;
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_height_female" SET DATA TYPE numeric;
  ALTER TABLE "dogbreeds" ALTER COLUMN "details_height_male" SET DATA TYPE numeric;
  ALTER TABLE "dogbreeds" ADD COLUMN "details_coat_types_id" integer;
  ALTER TABLE "dogbreeds" ADD COLUMN "descriptions_general" varchar;
  ALTER TABLE "dogbreeds" ADD COLUMN "descriptions_appearance" varchar;
  ALTER TABLE "dogbreeds" ADD COLUMN "descriptions_character" varchar;
  ALTER TABLE "dogbreeds" ADD COLUMN "descriptions_training" varchar;
  ALTER TABLE "dogbreeds" ADD COLUMN "descriptions_roles" varchar;
  ALTER TABLE "dogbreeds" ADD COLUMN "descriptions_health" varchar;
  ALTER TABLE "dogbreeds" ADD COLUMN "descriptions_fun_facts" varchar;
  ALTER TABLE "dogbreeds" ADD CONSTRAINT "dogbreeds_details_coat_types_id_coat_types_id_fk" FOREIGN KEY ("details_coat_types_id") REFERENCES "public"."coat_types"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "dogbreeds_details_details_coat_types_idx" ON "dogbreeds" USING btree ("details_coat_types_id");
  ALTER TABLE "media" DROP COLUMN "source";
  ALTER TABLE "dogbreeds_rels" DROP COLUMN "coat_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dogs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_dogs_images_type";
  DROP TYPE "public"."enum_dogs_gender";
  DROP TYPE "public"."enum_dogs_castration";
  DROP TYPE "public"."enum_dogs_adoption_status";
  DROP TYPE "public"."enum_dogs_location_type";
  DROP TYPE "public"."enum_dogs_earliest_arrival_type";
  DROP TYPE "public"."enum_dogs_birth_date_type";
  DROP TYPE "public"."enum_dogs_breed_type";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_type";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_style";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_background_color";
  DROP TYPE "public"."enum_pages_blocks_hero_text_position";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_type";
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_style";
  DROP TYPE "public"."enum_posts_blocks_hero_variant";
  DROP TYPE "public"."enum_posts_blocks_hero_background_color";
  DROP TYPE "public"."enum_posts_blocks_hero_text_position";
  DROP TYPE "public"."enum_posts_status";`)
}
