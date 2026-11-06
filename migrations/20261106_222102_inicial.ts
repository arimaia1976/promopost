import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_anunciantes_secao" AS ENUM('destaque', 'ofertas');
  CREATE TABLE "banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"link" varchar,
  	"nova_aba" boolean DEFAULT true,
  	"ativo" boolean DEFAULT true,
  	"inicio" timestamp(3) with time zone,
  	"fim" timestamp(3) with time zone,
  	"ordem" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "anunciantes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"categoria" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"link" varchar NOT NULL,
  	"secao" "enum_anunciantes_secao" DEFAULT 'ofertas' NOT NULL,
  	"ativo" boolean DEFAULT true,
  	"ordem" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
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
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
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
  	"banners_id" integer,
  	"anunciantes_id" integer,
  	"media_id" integer,
  	"users_id" integer
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
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"titulo_principal" varchar NOT NULL,
  	"imagem_beneficios_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sobre_blocos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "sobre" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"banner_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "anuncie" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"banner_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"subtitulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"botao_label" varchar NOT NULL,
  	"botao_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contato" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"banner_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cadastro" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"banner_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacidade" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "termos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cabecalho_menu_desktop" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "cabecalho_menu_celular" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "cabecalho_botoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "cabecalho" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "rodape_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "rodape" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"logo_celular_id" integer NOT NULL,
  	"instagram" varchar NOT NULL,
  	"qr_code_id" integer NOT NULL,
  	"chamada_instagram" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "apoio_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"link" varchar,
  	"nova_aba" boolean DEFAULT true
  );
  
  CREATE TABLE "apoio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "vitrine" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo_destaque" varchar NOT NULL,
  	"titulo_ofertas" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "beneficios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fortaleca_titulo" varchar NOT NULL,
  	"fortaleca_texto" varchar NOT NULL,
  	"venda_titulo" varchar NOT NULL,
  	"venda_texto" varchar NOT NULL,
  	"alcance_titulo" varchar NOT NULL,
  	"alcance_texto" varchar NOT NULL,
  	"redes_titulo" varchar NOT NULL,
  	"redes_texto" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "formularios_assuntos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opcao" varchar NOT NULL
  );
  
  CREATE TABLE "formularios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contato_email_destino" varchar,
  	"contato_assunto" varchar NOT NULL,
  	"contato_botao" varchar NOT NULL,
  	"contato_sucesso" varchar NOT NULL,
  	"contato_erro" varchar NOT NULL,
  	"cadastro_email_destino" varchar,
  	"cadastro_assunto" varchar NOT NULL,
  	"cadastro_botao" varchar NOT NULL,
  	"cadastro_sucesso" varchar NOT NULL,
  	"cadastro_erro" varchar NOT NULL,
  	"texto_novidades" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "banners" ADD CONSTRAINT "banners_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "anunciantes" ADD CONSTRAINT "anunciantes_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_banners_fk" FOREIGN KEY ("banners_id") REFERENCES "public"."banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_anunciantes_fk" FOREIGN KEY ("anunciantes_id") REFERENCES "public"."anunciantes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_imagem_beneficios_id_media_id_fk" FOREIGN KEY ("imagem_beneficios_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sobre_blocos" ADD CONSTRAINT "sobre_blocos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sobre"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sobre" ADD CONSTRAINT "sobre_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "anuncie" ADD CONSTRAINT "anuncie_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contato" ADD CONSTRAINT "contato_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cadastro" ADD CONSTRAINT "cadastro_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cabecalho_menu_desktop" ADD CONSTRAINT "cabecalho_menu_desktop_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cabecalho"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cabecalho_menu_celular" ADD CONSTRAINT "cabecalho_menu_celular_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cabecalho"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cabecalho_botoes" ADD CONSTRAINT "cabecalho_botoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cabecalho"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cabecalho" ADD CONSTRAINT "cabecalho_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rodape_menu" ADD CONSTRAINT "rodape_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rodape"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rodape" ADD CONSTRAINT "rodape_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rodape" ADD CONSTRAINT "rodape_logo_celular_id_media_id_fk" FOREIGN KEY ("logo_celular_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rodape" ADD CONSTRAINT "rodape_qr_code_id_media_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "apoio_banners" ADD CONSTRAINT "apoio_banners_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "apoio_banners" ADD CONSTRAINT "apoio_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."apoio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "formularios_assuntos" ADD CONSTRAINT "formularios_assuntos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."formularios"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "banners_imagem_idx" ON "banners" USING btree ("imagem_id");
  CREATE INDEX "banners_updated_at_idx" ON "banners" USING btree ("updated_at");
  CREATE INDEX "banners_created_at_idx" ON "banners" USING btree ("created_at");
  CREATE INDEX "anunciantes_imagem_idx" ON "anunciantes" USING btree ("imagem_id");
  CREATE INDEX "anunciantes_updated_at_idx" ON "anunciantes" USING btree ("updated_at");
  CREATE INDEX "anunciantes_created_at_idx" ON "anunciantes" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("banners_id");
  CREATE INDEX "payload_locked_documents_rels_anunciantes_id_idx" ON "payload_locked_documents_rels" USING btree ("anunciantes_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_imagem_beneficios_idx" ON "home" USING btree ("imagem_beneficios_id");
  CREATE INDEX "sobre_blocos_order_idx" ON "sobre_blocos" USING btree ("_order");
  CREATE INDEX "sobre_blocos_parent_id_idx" ON "sobre_blocos" USING btree ("_parent_id");
  CREATE INDEX "sobre_banner_idx" ON "sobre" USING btree ("banner_id");
  CREATE INDEX "anuncie_banner_idx" ON "anuncie" USING btree ("banner_id");
  CREATE INDEX "contato_banner_idx" ON "contato" USING btree ("banner_id");
  CREATE INDEX "cadastro_banner_idx" ON "cadastro" USING btree ("banner_id");
  CREATE INDEX "cabecalho_menu_desktop_order_idx" ON "cabecalho_menu_desktop" USING btree ("_order");
  CREATE INDEX "cabecalho_menu_desktop_parent_id_idx" ON "cabecalho_menu_desktop" USING btree ("_parent_id");
  CREATE INDEX "cabecalho_menu_celular_order_idx" ON "cabecalho_menu_celular" USING btree ("_order");
  CREATE INDEX "cabecalho_menu_celular_parent_id_idx" ON "cabecalho_menu_celular" USING btree ("_parent_id");
  CREATE INDEX "cabecalho_botoes_order_idx" ON "cabecalho_botoes" USING btree ("_order");
  CREATE INDEX "cabecalho_botoes_parent_id_idx" ON "cabecalho_botoes" USING btree ("_parent_id");
  CREATE INDEX "cabecalho_logo_idx" ON "cabecalho" USING btree ("logo_id");
  CREATE INDEX "rodape_menu_order_idx" ON "rodape_menu" USING btree ("_order");
  CREATE INDEX "rodape_menu_parent_id_idx" ON "rodape_menu" USING btree ("_parent_id");
  CREATE INDEX "rodape_logo_idx" ON "rodape" USING btree ("logo_id");
  CREATE INDEX "rodape_logo_celular_idx" ON "rodape" USING btree ("logo_celular_id");
  CREATE INDEX "rodape_qr_code_idx" ON "rodape" USING btree ("qr_code_id");
  CREATE INDEX "apoio_banners_order_idx" ON "apoio_banners" USING btree ("_order");
  CREATE INDEX "apoio_banners_parent_id_idx" ON "apoio_banners" USING btree ("_parent_id");
  CREATE INDEX "apoio_banners_imagem_idx" ON "apoio_banners" USING btree ("imagem_id");
  CREATE INDEX "formularios_assuntos_order_idx" ON "formularios_assuntos" USING btree ("_order");
  CREATE INDEX "formularios_assuntos_parent_id_idx" ON "formularios_assuntos" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "banners" CASCADE;
  DROP TABLE "anunciantes" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "sobre_blocos" CASCADE;
  DROP TABLE "sobre" CASCADE;
  DROP TABLE "anuncie" CASCADE;
  DROP TABLE "contato" CASCADE;
  DROP TABLE "cadastro" CASCADE;
  DROP TABLE "privacidade" CASCADE;
  DROP TABLE "termos" CASCADE;
  DROP TABLE "cabecalho_menu_desktop" CASCADE;
  DROP TABLE "cabecalho_menu_celular" CASCADE;
  DROP TABLE "cabecalho_botoes" CASCADE;
  DROP TABLE "cabecalho" CASCADE;
  DROP TABLE "rodape_menu" CASCADE;
  DROP TABLE "rodape" CASCADE;
  DROP TABLE "apoio_banners" CASCADE;
  DROP TABLE "apoio" CASCADE;
  DROP TABLE "vitrine" CASCADE;
  DROP TABLE "beneficios" CASCADE;
  DROP TABLE "formularios_assuntos" CASCADE;
  DROP TABLE "formularios" CASCADE;
  DROP TYPE "public"."enum_anunciantes_secao";`)
}
