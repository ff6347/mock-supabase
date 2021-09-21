
-- cat
DROP TABLE IF EXISTS "public"."cat";
CREATE TABLE "public"."cat" (
    "id" uuid NOT NULL,
    "name" varchar(20) NOT NULL
    constraint name_unique UNIQUE,

    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);