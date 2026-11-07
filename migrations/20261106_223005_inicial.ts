import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // esquema próprio do site (ver payload.config.ts)
  await db.execute(sql`DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'site') THEN CREATE SCHEMA "site"; END IF;
  END $$;`)
  await db.execute(sql`
   CREATE TYPE "site"."enum_anunciantes_secao" AS ENUM('destaque', 'ofertas');
  CREATE TABLE "site"."banners" (
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
  
  CREATE TABLE "site"."anunciantes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"categoria" varchar NOT NULL,
  	"descricao" varchar NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"link" varchar NOT NULL,
  	"secao" "site"."enum_anunciantes_secao" DEFAULT 'ofertas' NOT NULL,
  	"ativo" boolean DEFAULT true,
  	"ordem" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
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
  
  CREATE TABLE "site"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "site"."users" (
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
  
  CREATE TABLE "site"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "site"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"banners_id" integer,
  	"anunciantes_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "site"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "site"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site"."home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"titulo_principal" varchar NOT NULL,
  	"imagem_beneficios_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."sobre_blocos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "site"."sobre" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"banner_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."anuncie" (
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
  
  CREATE TABLE "site"."contato" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"banner_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."cadastro" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"banner_id" integer NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."privacidade" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."termos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_titulo" varchar NOT NULL,
  	"seo_descricao" varchar,
  	"titulo" varchar NOT NULL,
  	"texto" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."cabecalho_menu_desktop" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site"."cabecalho_menu_celular" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site"."cabecalho_botoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site"."cabecalho" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."rodape_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site"."rodape" (
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
  
  CREATE TABLE "site"."apoio_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"link" varchar,
  	"nova_aba" boolean DEFAULT true
  );
  
  CREATE TABLE "site"."apoio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."vitrine" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo_destaque" varchar NOT NULL,
  	"titulo_ofertas" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site"."beneficios" (
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
  
  CREATE TABLE "site"."formularios_assuntos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opcao" varchar NOT NULL
  );
  
  CREATE TABLE "site"."formularios" (
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
  
  ALTER TABLE "site"."banners" ADD CONSTRAINT "banners_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."anunciantes" ADD CONSTRAINT "anunciantes_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "site"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_banners_fk" FOREIGN KEY ("banners_id") REFERENCES "site"."banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_anunciantes_fk" FOREIGN KEY ("anunciantes_id") REFERENCES "site"."anunciantes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "site"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "site"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "site"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "site"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."home" ADD CONSTRAINT "home_imagem_beneficios_id_media_id_fk" FOREIGN KEY ("imagem_beneficios_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."sobre_blocos" ADD CONSTRAINT "sobre_blocos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."sobre"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."sobre" ADD CONSTRAINT "sobre_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."anuncie" ADD CONSTRAINT "anuncie_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."contato" ADD CONSTRAINT "contato_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."cadastro" ADD CONSTRAINT "cadastro_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."cabecalho_menu_desktop" ADD CONSTRAINT "cabecalho_menu_desktop_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."cabecalho"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."cabecalho_menu_celular" ADD CONSTRAINT "cabecalho_menu_celular_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."cabecalho"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."cabecalho_botoes" ADD CONSTRAINT "cabecalho_botoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."cabecalho"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."cabecalho" ADD CONSTRAINT "cabecalho_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."rodape_menu" ADD CONSTRAINT "rodape_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."rodape"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."rodape" ADD CONSTRAINT "rodape_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."rodape" ADD CONSTRAINT "rodape_logo_celular_id_media_id_fk" FOREIGN KEY ("logo_celular_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."rodape" ADD CONSTRAINT "rodape_qr_code_id_media_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."apoio_banners" ADD CONSTRAINT "apoio_banners_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "site"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site"."apoio_banners" ADD CONSTRAINT "apoio_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."apoio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site"."formularios_assuntos" ADD CONSTRAINT "formularios_assuntos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"."formularios"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "banners_imagem_idx" ON "site"."banners" USING btree ("imagem_id");
  CREATE INDEX "banners_updated_at_idx" ON "site"."banners" USING btree ("updated_at");
  CREATE INDEX "banners_created_at_idx" ON "site"."banners" USING btree ("created_at");
  CREATE INDEX "anunciantes_imagem_idx" ON "site"."anunciantes" USING btree ("imagem_id");
  CREATE INDEX "anunciantes_updated_at_idx" ON "site"."anunciantes" USING btree ("updated_at");
  CREATE INDEX "anunciantes_created_at_idx" ON "site"."anunciantes" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "site"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "site"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "site"."media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "site"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "site"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "site"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "site"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "site"."users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "site"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "site"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "site"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "site"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "site"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "site"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "site"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_banners_id_idx" ON "site"."payload_locked_documents_rels" USING btree ("banners_id");
  CREATE INDEX "payload_locked_documents_rels_anunciantes_id_idx" ON "site"."payload_locked_documents_rels" USING btree ("anunciantes_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "site"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "site"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "site"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "site"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "site"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "site"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "site"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "site"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "site"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "site"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "site"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_imagem_beneficios_idx" ON "site"."home" USING btree ("imagem_beneficios_id");
  CREATE INDEX "sobre_blocos_order_idx" ON "site"."sobre_blocos" USING btree ("_order");
  CREATE INDEX "sobre_blocos_parent_id_idx" ON "site"."sobre_blocos" USING btree ("_parent_id");
  CREATE INDEX "sobre_banner_idx" ON "site"."sobre" USING btree ("banner_id");
  CREATE INDEX "anuncie_banner_idx" ON "site"."anuncie" USING btree ("banner_id");
  CREATE INDEX "contato_banner_idx" ON "site"."contato" USING btree ("banner_id");
  CREATE INDEX "cadastro_banner_idx" ON "site"."cadastro" USING btree ("banner_id");
  CREATE INDEX "cabecalho_menu_desktop_order_idx" ON "site"."cabecalho_menu_desktop" USING btree ("_order");
  CREATE INDEX "cabecalho_menu_desktop_parent_id_idx" ON "site"."cabecalho_menu_desktop" USING btree ("_parent_id");
  CREATE INDEX "cabecalho_menu_celular_order_idx" ON "site"."cabecalho_menu_celular" USING btree ("_order");
  CREATE INDEX "cabecalho_menu_celular_parent_id_idx" ON "site"."cabecalho_menu_celular" USING btree ("_parent_id");
  CREATE INDEX "cabecalho_botoes_order_idx" ON "site"."cabecalho_botoes" USING btree ("_order");
  CREATE INDEX "cabecalho_botoes_parent_id_idx" ON "site"."cabecalho_botoes" USING btree ("_parent_id");
  CREATE INDEX "cabecalho_logo_idx" ON "site"."cabecalho" USING btree ("logo_id");
  CREATE INDEX "rodape_menu_order_idx" ON "site"."rodape_menu" USING btree ("_order");
  CREATE INDEX "rodape_menu_parent_id_idx" ON "site"."rodape_menu" USING btree ("_parent_id");
  CREATE INDEX "rodape_logo_idx" ON "site"."rodape" USING btree ("logo_id");
  CREATE INDEX "rodape_logo_celular_idx" ON "site"."rodape" USING btree ("logo_celular_id");
  CREATE INDEX "rodape_qr_code_idx" ON "site"."rodape" USING btree ("qr_code_id");
  CREATE INDEX "apoio_banners_order_idx" ON "site"."apoio_banners" USING btree ("_order");
  CREATE INDEX "apoio_banners_parent_id_idx" ON "site"."apoio_banners" USING btree ("_parent_id");
  CREATE INDEX "apoio_banners_imagem_idx" ON "site"."apoio_banners" USING btree ("imagem_id");
  CREATE INDEX "formularios_assuntos_order_idx" ON "site"."formularios_assuntos" USING btree ("_order");
  CREATE INDEX "formularios_assuntos_parent_id_idx" ON "site"."formularios_assuntos" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site"."banners" CASCADE;
  DROP TABLE "site"."anunciantes" CASCADE;
  DROP TABLE "site"."media" CASCADE;
  DROP TABLE "site"."users_sessions" CASCADE;
  DROP TABLE "site"."users" CASCADE;
  DROP TABLE "site"."payload_kv" CASCADE;
  DROP TABLE "site"."payload_locked_documents" CASCADE;
  DROP TABLE "site"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "site"."payload_preferences" CASCADE;
  DROP TABLE "site"."payload_preferences_rels" CASCADE;
  DROP TABLE "site"."payload_migrations" CASCADE;
  DROP TABLE "site"."home" CASCADE;
  DROP TABLE "site"."sobre_blocos" CASCADE;
  DROP TABLE "site"."sobre" CASCADE;
  DROP TABLE "site"."anuncie" CASCADE;
  DROP TABLE "site"."contato" CASCADE;
  DROP TABLE "site"."cadastro" CASCADE;
  DROP TABLE "site"."privacidade" CASCADE;
  DROP TABLE "site"."termos" CASCADE;
  DROP TABLE "site"."cabecalho_menu_desktop" CASCADE;
  DROP TABLE "site"."cabecalho_menu_celular" CASCADE;
  DROP TABLE "site"."cabecalho_botoes" CASCADE;
  DROP TABLE "site"."cabecalho" CASCADE;
  DROP TABLE "site"."rodape_menu" CASCADE;
  DROP TABLE "site"."rodape" CASCADE;
  DROP TABLE "site"."apoio_banners" CASCADE;
  DROP TABLE "site"."apoio" CASCADE;
  DROP TABLE "site"."vitrine" CASCADE;
  DROP TABLE "site"."beneficios" CASCADE;
  DROP TABLE "site"."formularios_assuntos" CASCADE;
  DROP TABLE "site"."formularios" CASCADE;
  DROP TYPE "site"."enum_anunciantes_secao";`)
}
