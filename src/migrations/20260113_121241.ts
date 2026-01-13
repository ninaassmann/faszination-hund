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
  CREATE TYPE "public"."enum_dogbreeds_images_type" AS ENUM('thumbnail', 'gallery');
  CREATE TYPE "public"."enum_dogbreeds_influencers_platform" AS ENUM('instagram', 'tiktok', 'youtube', 'other');
  CREATE TYPE "public"."enum_dogbreeds_status" AS ENUM('draft', 'published', 'partial');
  CREATE TYPE "public"."enum_dogbreeds_fci_fci_status" AS ENUM('recognized', 'provisional', 'not_recognized');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_type" AS ENUM('intern', 'extern');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_style" AS ENUM('btn-primary', 'btn-primary btn-outline', 'btn-link');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('stacked', 'split', 'imageBackground');
  CREATE TYPE "public"."enum_pages_blocks_hero_background_color" AS ENUM('var(--frontend-general)', 'var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  CREATE TYPE "public"."enum_pages_blocks_hero_text_position" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum_pages_blocks_featured_list_type" AS ENUM('dogbreeds', 'dogs');
  CREATE TYPE "public"."enum_pages_blocks_content_with_media_headline_level" AS ENUM('h2', 'h3');
  CREATE TYPE "public"."enum_pages_blocks_content_with_media_background_color" AS ENUM('var(--frontend-general)', 'var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  CREATE TYPE "public"."enum_pages_blocks_content_with_media_text_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_type" AS ENUM('intern', 'extern');
  CREATE TYPE "public"."enum_posts_blocks_hero_ctas_style" AS ENUM('btn-primary', 'btn-primary btn-outline', 'btn-link');
  CREATE TYPE "public"."enum_posts_blocks_hero_variant" AS ENUM('stacked', 'split', 'imageBackground');
  CREATE TYPE "public"."enum_posts_blocks_hero_background_color" AS ENUM('var(--frontend-general)', 'var(--frontend-primary)', 'var(--frontend-secondary)', 'var(--frontend-base-200)', 'var(--frontend-neutral)');
  CREATE TYPE "public"."enum_posts_blocks_hero_text_position" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_coat_colors_group" AS ENUM('solid', 'multi', 'pattern');
  CREATE TYPE "public"."enum_tags_category" AS ENUM('size', 'training', 'character', 'social', 'health', 'roles', 'behavior');
  CREATE TYPE "public"."enum_countries_continent" AS ENUM('europe', 'asia', 'africa', 'north_america', 'south_america', 'oceania');
  CREATE TYPE "public"."enum_roles_training_requirements_importance" AS ENUM('low', 'medium', 'high');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
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
  	"earliest_arrival_type" "enum_dogs_earliest_arrival_type",
  	"earliest_arrival_date" timestamp(3) with time zone,
  	"birth_date" timestamp(3) with time zone,
  	"birth_date_type" "enum_dogs_birth_date_type",
  	"breed_type" "enum_dogs_breed_type",
  	"mixed_breed" boolean,
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
  
  CREATE TABLE "dogbreeds_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"type" "enum_dogbreeds_images_type" NOT NULL
  );
  
  CREATE TABLE "dogbreeds_descriptions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"source" varchar
  );
  
  CREATE TABLE "dogbreeds_breeders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"website" varchar,
  	"contact" varchar
  );
  
  CREATE TABLE "dogbreeds_influencers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"platform" "enum_dogbreeds_influencers_platform",
  	"link" varchar,
  	"notes" varchar
  );
  
  CREATE TABLE "dogbreeds" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"breed" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_dogbreeds_status" NOT NULL,
  	"general_is_hybrid" boolean,
  	"general_is_variant" boolean,
  	"general_main_breeds_id" integer,
  	"fci_fci_status" "enum_dogbreeds_fci_fci_status",
  	"fci_fci_group_id" integer,
  	"fci_fci_section_id" integer,
  	"fci_fci_acceptance_date" timestamp(3) with time zone,
  	"fci_fci_publication_date" timestamp(3) with time zone,
  	"fci_fci_source" varchar,
  	"fci_fci_source_p_d_f" varchar,
  	"details_weight_female" varchar,
  	"details_weight_male" varchar,
  	"details_height_female" varchar,
  	"details_height_male" varchar,
  	"details_age_female" varchar,
  	"details_age_male" varchar,
  	"details_origin_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dogbreeds_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "dogbreeds_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer,
  	"dogbreeds_id" integer,
  	"coat_colors_id" integer,
  	"coat_types_id" integer,
  	"roles_id" integer
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
  	"style" "enum_pages_blocks_hero_ctas_style"
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
  	"type" "enum_pages_blocks_featured_list_type" NOT NULL,
  	"show_button" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_with_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"headline_level" "enum_pages_blocks_content_with_media_headline_level",
  	"text" varchar NOT NULL,
  	"image_media_id" integer NOT NULL,
  	"image_alt" varchar,
  	"image_caption" varchar,
  	"background_color" "enum_pages_blocks_content_with_media_background_color",
  	"text_position" "enum_pages_blocks_content_with_media_text_position",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_pages_status" NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer,
  	"dogs_id" integer
  );
  
  CREATE TABLE "posts_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_posts_blocks_hero_ctas_type" NOT NULL,
  	"intern_id" integer,
  	"extern" varchar,
  	"style" "enum_posts_blocks_hero_ctas_style"
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
  	"status" "enum_posts_status" NOT NULL,
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
  
  CREATE TABLE "coat_colors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"group" "enum_coat_colors_group",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "coat_colors_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "coat_colors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
  CREATE TABLE "coat_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "coat_types_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_tags_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"continent" "enum_countries_continent",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
  CREATE TABLE "roles_training_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"requirement" varchar NOT NULL,
  	"importance" "enum_roles_training_requirements_importance" DEFAULT 'medium'
  );
  
  CREATE TABLE "roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "roles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"dogbreeds_id" integer
  );
  
  CREATE TABLE "fci_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"number" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "fci_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"number" numeric NOT NULL,
  	"group_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"dogs_id" integer,
  	"dogbreeds_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"coat_colors_id" integer,
  	"coat_types_id" integer,
  	"tags_id" integer,
  	"countries_id" integer,
  	"roles_id" integer,
  	"fci_groups_id" integer,
  	"fci_sections_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogs_images" ADD CONSTRAINT "dogs_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogs_images" ADD CONSTRAINT "dogs_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogs_blocks_content" ADD CONSTRAINT "dogs_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogs" ADD CONSTRAINT "dogs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogs_rels" ADD CONSTRAINT "dogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogs_rels" ADD CONSTRAINT "dogs_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_images" ADD CONSTRAINT "dogbreeds_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogbreeds_images" ADD CONSTRAINT "dogbreeds_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_descriptions" ADD CONSTRAINT "dogbreeds_descriptions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_breeders" ADD CONSTRAINT "dogbreeds_breeders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_influencers" ADD CONSTRAINT "dogbreeds_influencers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds" ADD CONSTRAINT "dogbreeds_general_main_breeds_id_dogbreeds_id_fk" FOREIGN KEY ("general_main_breeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogbreeds" ADD CONSTRAINT "dogbreeds_fci_fci_group_id_fci_groups_id_fk" FOREIGN KEY ("fci_fci_group_id") REFERENCES "public"."fci_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogbreeds" ADD CONSTRAINT "dogbreeds_fci_fci_section_id_fci_sections_id_fk" FOREIGN KEY ("fci_fci_section_id") REFERENCES "public"."fci_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogbreeds" ADD CONSTRAINT "dogbreeds_details_origin_id_countries_id_fk" FOREIGN KEY ("details_origin_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogbreeds" ADD CONSTRAINT "dogbreeds_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dogbreeds_texts" ADD CONSTRAINT "dogbreeds_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_rels" ADD CONSTRAINT "dogbreeds_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_rels" ADD CONSTRAINT "dogbreeds_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_rels" ADD CONSTRAINT "dogbreeds_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_rels" ADD CONSTRAINT "dogbreeds_rels_coat_colors_fk" FOREIGN KEY ("coat_colors_id") REFERENCES "public"."coat_colors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_rels" ADD CONSTRAINT "dogbreeds_rels_coat_types_fk" FOREIGN KEY ("coat_types_id") REFERENCES "public"."coat_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dogbreeds_rels" ADD CONSTRAINT "dogbreeds_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_intern_id_pages_id_fk" FOREIGN KEY ("intern_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_accordions" ADD CONSTRAINT "pages_blocks_accordion_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_list" ADD CONSTRAINT "pages_blocks_featured_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_with_media" ADD CONSTRAINT "pages_blocks_content_with_media_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_with_media" ADD CONSTRAINT "pages_blocks_content_with_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_dogs_fk" FOREIGN KEY ("dogs_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_ctas" ADD CONSTRAINT "posts_blocks_hero_ctas_intern_id_pages_id_fk" FOREIGN KEY ("intern_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_ctas" ADD CONSTRAINT "posts_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content" ADD CONSTRAINT "posts_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_accordion_accordions" ADD CONSTRAINT "posts_blocks_accordion_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_accordion" ADD CONSTRAINT "posts_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_sources" ADD CONSTRAINT "posts_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "coat_colors_texts" ADD CONSTRAINT "coat_colors_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."coat_colors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "coat_colors_rels" ADD CONSTRAINT "coat_colors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."coat_colors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "coat_colors_rels" ADD CONSTRAINT "coat_colors_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "coat_types_rels" ADD CONSTRAINT "coat_types_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."coat_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "coat_types_rels" ADD CONSTRAINT "coat_types_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roles_training_requirements" ADD CONSTRAINT "roles_training_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roles_rels" ADD CONSTRAINT "roles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roles_rels" ADD CONSTRAINT "roles_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fci_sections" ADD CONSTRAINT "fci_sections_group_id_fci_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."fci_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dogs_fk" FOREIGN KEY ("dogs_id") REFERENCES "public"."dogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dogbreeds_fk" FOREIGN KEY ("dogbreeds_id") REFERENCES "public"."dogbreeds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_coat_colors_fk" FOREIGN KEY ("coat_colors_id") REFERENCES "public"."coat_colors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_coat_types_fk" FOREIGN KEY ("coat_types_id") REFERENCES "public"."coat_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fci_groups_fk" FOREIGN KEY ("fci_groups_id") REFERENCES "public"."fci_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fci_sections_fk" FOREIGN KEY ("fci_sections_id") REFERENCES "public"."fci_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_light_mode_icon_id_media_id_fk" FOREIGN KEY ("light_mode_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_light_mode_logo_id_media_id_fk" FOREIGN KEY ("light_mode_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_dark_mode_icon_id_media_id_fk" FOREIGN KEY ("dark_mode_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_dark_mode_logo_id_media_id_fk" FOREIGN KEY ("dark_mode_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_dogbreeds_id_idx" ON "media_rels" USING btree ("dogbreeds_id");
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
  CREATE INDEX "dogbreeds_images_order_idx" ON "dogbreeds_images" USING btree ("_order");
  CREATE INDEX "dogbreeds_images_parent_id_idx" ON "dogbreeds_images" USING btree ("_parent_id");
  CREATE INDEX "dogbreeds_images_media_idx" ON "dogbreeds_images" USING btree ("media_id");
  CREATE INDEX "dogbreeds_descriptions_order_idx" ON "dogbreeds_descriptions" USING btree ("_order");
  CREATE INDEX "dogbreeds_descriptions_parent_id_idx" ON "dogbreeds_descriptions" USING btree ("_parent_id");
  CREATE INDEX "dogbreeds_breeders_order_idx" ON "dogbreeds_breeders" USING btree ("_order");
  CREATE INDEX "dogbreeds_breeders_parent_id_idx" ON "dogbreeds_breeders" USING btree ("_parent_id");
  CREATE INDEX "dogbreeds_influencers_order_idx" ON "dogbreeds_influencers" USING btree ("_order");
  CREATE INDEX "dogbreeds_influencers_parent_id_idx" ON "dogbreeds_influencers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "dogbreeds_breed_idx" ON "dogbreeds" USING btree ("breed");
  CREATE INDEX "dogbreeds_general_general_main_breeds_idx" ON "dogbreeds" USING btree ("general_main_breeds_id");
  CREATE INDEX "dogbreeds_fci_fci_fci_group_idx" ON "dogbreeds" USING btree ("fci_fci_group_id");
  CREATE INDEX "dogbreeds_fci_fci_fci_section_idx" ON "dogbreeds" USING btree ("fci_fci_section_id");
  CREATE INDEX "dogbreeds_details_details_origin_idx" ON "dogbreeds" USING btree ("details_origin_id");
  CREATE INDEX "dogbreeds_meta_meta_image_idx" ON "dogbreeds" USING btree ("meta_image_id");
  CREATE INDEX "dogbreeds_updated_at_idx" ON "dogbreeds" USING btree ("updated_at");
  CREATE INDEX "dogbreeds_created_at_idx" ON "dogbreeds" USING btree ("created_at");
  CREATE INDEX "dogbreeds_texts_order_parent_idx" ON "dogbreeds_texts" USING btree ("order","parent_id");
  CREATE INDEX "dogbreeds_rels_order_idx" ON "dogbreeds_rels" USING btree ("order");
  CREATE INDEX "dogbreeds_rels_parent_idx" ON "dogbreeds_rels" USING btree ("parent_id");
  CREATE INDEX "dogbreeds_rels_path_idx" ON "dogbreeds_rels" USING btree ("path");
  CREATE INDEX "dogbreeds_rels_tags_id_idx" ON "dogbreeds_rels" USING btree ("tags_id");
  CREATE INDEX "dogbreeds_rels_dogbreeds_id_idx" ON "dogbreeds_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "dogbreeds_rels_coat_colors_id_idx" ON "dogbreeds_rels" USING btree ("coat_colors_id");
  CREATE INDEX "dogbreeds_rels_coat_types_id_idx" ON "dogbreeds_rels" USING btree ("coat_types_id");
  CREATE INDEX "dogbreeds_rels_roles_id_idx" ON "dogbreeds_rels" USING btree ("roles_id");
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
  CREATE UNIQUE INDEX "pages_title_idx" ON "pages" USING btree ("title");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_dogbreeds_id_idx" ON "pages_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "pages_rels_dogs_id_idx" ON "pages_rels" USING btree ("dogs_id");
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
  CREATE INDEX "posts_blocks_accordion_accordions_order_idx" ON "posts_blocks_accordion_accordions" USING btree ("_order");
  CREATE INDEX "posts_blocks_accordion_accordions_parent_id_idx" ON "posts_blocks_accordion_accordions" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_accordion_order_idx" ON "posts_blocks_accordion" USING btree ("_order");
  CREATE INDEX "posts_blocks_accordion_parent_id_idx" ON "posts_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_accordion_path_idx" ON "posts_blocks_accordion" USING btree ("_path");
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
  CREATE INDEX "coat_colors_updated_at_idx" ON "coat_colors" USING btree ("updated_at");
  CREATE INDEX "coat_colors_created_at_idx" ON "coat_colors" USING btree ("created_at");
  CREATE INDEX "coat_colors_texts_order_parent_idx" ON "coat_colors_texts" USING btree ("order","parent_id");
  CREATE INDEX "coat_colors_rels_order_idx" ON "coat_colors_rels" USING btree ("order");
  CREATE INDEX "coat_colors_rels_parent_idx" ON "coat_colors_rels" USING btree ("parent_id");
  CREATE INDEX "coat_colors_rels_path_idx" ON "coat_colors_rels" USING btree ("path");
  CREATE INDEX "coat_colors_rels_dogbreeds_id_idx" ON "coat_colors_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "coat_types_updated_at_idx" ON "coat_types" USING btree ("updated_at");
  CREATE INDEX "coat_types_created_at_idx" ON "coat_types" USING btree ("created_at");
  CREATE INDEX "coat_types_rels_order_idx" ON "coat_types_rels" USING btree ("order");
  CREATE INDEX "coat_types_rels_parent_idx" ON "coat_types_rels" USING btree ("parent_id");
  CREATE INDEX "coat_types_rels_path_idx" ON "coat_types_rels" USING btree ("path");
  CREATE INDEX "coat_types_rels_dogbreeds_id_idx" ON "coat_types_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "tags_rels_order_idx" ON "tags_rels" USING btree ("order");
  CREATE INDEX "tags_rels_parent_idx" ON "tags_rels" USING btree ("parent_id");
  CREATE INDEX "tags_rels_path_idx" ON "tags_rels" USING btree ("path");
  CREATE INDEX "tags_rels_dogbreeds_id_idx" ON "tags_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "countries_rels_order_idx" ON "countries_rels" USING btree ("order");
  CREATE INDEX "countries_rels_parent_idx" ON "countries_rels" USING btree ("parent_id");
  CREATE INDEX "countries_rels_path_idx" ON "countries_rels" USING btree ("path");
  CREATE INDEX "countries_rels_dogbreeds_id_idx" ON "countries_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "roles_training_requirements_order_idx" ON "roles_training_requirements" USING btree ("_order");
  CREATE INDEX "roles_training_requirements_parent_id_idx" ON "roles_training_requirements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "roles_value_idx" ON "roles" USING btree ("value");
  CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");
  CREATE INDEX "roles_rels_order_idx" ON "roles_rels" USING btree ("order");
  CREATE INDEX "roles_rels_parent_idx" ON "roles_rels" USING btree ("parent_id");
  CREATE INDEX "roles_rels_path_idx" ON "roles_rels" USING btree ("path");
  CREATE INDEX "roles_rels_dogbreeds_id_idx" ON "roles_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "fci_groups_updated_at_idx" ON "fci_groups" USING btree ("updated_at");
  CREATE INDEX "fci_groups_created_at_idx" ON "fci_groups" USING btree ("created_at");
  CREATE INDEX "fci_sections_group_idx" ON "fci_sections" USING btree ("group_id");
  CREATE INDEX "fci_sections_updated_at_idx" ON "fci_sections" USING btree ("updated_at");
  CREATE INDEX "fci_sections_created_at_idx" ON "fci_sections" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_dogs_id_idx" ON "payload_locked_documents_rels" USING btree ("dogs_id");
  CREATE INDEX "payload_locked_documents_rels_dogbreeds_id_idx" ON "payload_locked_documents_rels" USING btree ("dogbreeds_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_coat_colors_id_idx" ON "payload_locked_documents_rels" USING btree ("coat_colors_id");
  CREATE INDEX "payload_locked_documents_rels_coat_types_id_idx" ON "payload_locked_documents_rels" USING btree ("coat_types_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");
  CREATE INDEX "payload_locked_documents_rels_fci_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("fci_groups_id");
  CREATE INDEX "payload_locked_documents_rels_fci_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("fci_sections_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "settings_light_mode_icon_idx" ON "settings" USING btree ("light_mode_icon_id");
  CREATE INDEX "settings_light_mode_logo_idx" ON "settings" USING btree ("light_mode_logo_id");
  CREATE INDEX "settings_dark_mode_icon_idx" ON "settings" USING btree ("dark_mode_icon_id");
  CREATE INDEX "settings_dark_mode_logo_idx" ON "settings" USING btree ("dark_mode_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "dogs_images" CASCADE;
  DROP TABLE "dogs_blocks_content" CASCADE;
  DROP TABLE "dogs" CASCADE;
  DROP TABLE "dogs_rels" CASCADE;
  DROP TABLE "dogbreeds_images" CASCADE;
  DROP TABLE "dogbreeds_descriptions" CASCADE;
  DROP TABLE "dogbreeds_breeders" CASCADE;
  DROP TABLE "dogbreeds_influencers" CASCADE;
  DROP TABLE "dogbreeds" CASCADE;
  DROP TABLE "dogbreeds_texts" CASCADE;
  DROP TABLE "dogbreeds_rels" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_accordion_accordions" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_featured_list" CASCADE;
  DROP TABLE "pages_blocks_content_with_media" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "posts_blocks_hero_ctas" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_content" CASCADE;
  DROP TABLE "posts_blocks_accordion_accordions" CASCADE;
  DROP TABLE "posts_blocks_accordion" CASCADE;
  DROP TABLE "posts_sources" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "coat_colors" CASCADE;
  DROP TABLE "coat_colors_texts" CASCADE;
  DROP TABLE "coat_colors_rels" CASCADE;
  DROP TABLE "coat_types" CASCADE;
  DROP TABLE "coat_types_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_rels" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "countries_rels" CASCADE;
  DROP TABLE "roles_training_requirements" CASCADE;
  DROP TABLE "roles" CASCADE;
  DROP TABLE "roles_rels" CASCADE;
  DROP TABLE "fci_groups" CASCADE;
  DROP TABLE "fci_sections" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TYPE "public"."enum_dogs_images_type";
  DROP TYPE "public"."enum_dogs_gender";
  DROP TYPE "public"."enum_dogs_castration";
  DROP TYPE "public"."enum_dogs_adoption_status";
  DROP TYPE "public"."enum_dogs_location_type";
  DROP TYPE "public"."enum_dogs_earliest_arrival_type";
  DROP TYPE "public"."enum_dogs_birth_date_type";
  DROP TYPE "public"."enum_dogs_breed_type";
  DROP TYPE "public"."enum_dogbreeds_images_type";
  DROP TYPE "public"."enum_dogbreeds_influencers_platform";
  DROP TYPE "public"."enum_dogbreeds_status";
  DROP TYPE "public"."enum_dogbreeds_fci_fci_status";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_type";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_style";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_background_color";
  DROP TYPE "public"."enum_pages_blocks_hero_text_position";
  DROP TYPE "public"."enum_pages_blocks_featured_list_type";
  DROP TYPE "public"."enum_pages_blocks_content_with_media_headline_level";
  DROP TYPE "public"."enum_pages_blocks_content_with_media_background_color";
  DROP TYPE "public"."enum_pages_blocks_content_with_media_text_position";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_type";
  DROP TYPE "public"."enum_posts_blocks_hero_ctas_style";
  DROP TYPE "public"."enum_posts_blocks_hero_variant";
  DROP TYPE "public"."enum_posts_blocks_hero_background_color";
  DROP TYPE "public"."enum_posts_blocks_hero_text_position";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_coat_colors_group";
  DROP TYPE "public"."enum_tags_category";
  DROP TYPE "public"."enum_countries_continent";
  DROP TYPE "public"."enum_roles_training_requirements_importance";`)
}
