-- create a transaction

BEGIN TRANSACTION;

-- start by deleting all the tables if they exist already
DROP TABLE IF EXISTS "member" CASCADE;
DROP TABLE IF EXISTS "category" CASCADE;
DROP TABLE IF EXISTS "post" CASCADE;
DROP TABLE IF EXISTS "post_has_category" CASCADE;
DROP TABLE IF EXISTS "rating" CASCADE;

-- table member
CREATE TABLE IF NOT EXISTS "member" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "isAdmin" BOOLEAN DEFAULT(FALSE),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- table category
CREATE TABLE IF NOT EXISTS "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- table post
CREATE TABLE IF NOT EXISTS "post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "picture_url" TEXT,
    "likes" INTEGER DEFAULT(0),
    "member_id" INT NOT NULL REFERENCES "member"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ,
    CHECK ("likes">=0)
);

-- table member_likes_post
CREATE TABLE IF NOT EXISTS "member_likes_post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "post_id" INT REFERENCES "post"("id") ON DELETE CASCADE,
    "member_id" INT REFERENCES "member"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- table member_favorites_post
CREATE TABLE IF NOT EXISTS "member_favorites_post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "member_id" INT REFERENCES "member"("id") ON DELETE CASCADE,
    "post_id" INT REFERENCES "post"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- table post_has_category
CREATE TABLE IF NOT EXISTS "post_has_category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
    "category_id" INT NOT NULL REFERENCES "category"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- -- ===============================================================

INSERT INTO "category" ("name") VALUES
('Resto/Bars'),
('Art/Culture'),
('Shopping'),
('Plein-Air'),
('Nightlife'),
('Bien-être');

COMMIT TRANSACTION;