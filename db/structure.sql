--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE accounts (
    id integer NOT NULL,
    key character varying
);


--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE accounts_id_seq OWNED BY accounts.id;


--
-- Name: criterias; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE criterias (
    id integer NOT NULL,
    attrs json,
    type character varying,
    account_id integer,
    owner_type character varying,
    owner_id integer
);


--
-- Name: criterias_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE criterias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: criterias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE criterias_id_seq OWNED BY criterias.id;


--
-- Name: moments; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE moments (
    id integer NOT NULL,
    account_id integer,
    description text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    author_id integer,
    date timestamp without time zone,
    parent_id integer,
    place_id integer
);


--
-- Name: moments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE moments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: moments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE moments_id_seq OWNED BY moments.id;


--
-- Name: photo_sets; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE photo_sets (
    id integer NOT NULL,
    owner_id integer,
    owner_type character varying,
    account_id integer,
    key character varying
);


--
-- Name: photo_sets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE photo_sets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: photo_sets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE photo_sets_id_seq OWNED BY photo_sets.id;


--
-- Name: photos; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE photos (
    id integer NOT NULL,
    description text,
    image_uid character varying,
    width integer,
    height integer,
    account_id integer,
    exposure_time character varying,
    aperture_value double precision,
    iso integer,
    focal_length integer,
    moment_id integer,
    date timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    views_count integer DEFAULT 0,
    "position" integer
);


--
-- Name: photos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE photos_id_seq OWNED BY photos.id;


--
-- Name: places; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE places (
    id integer NOT NULL,
    name character varying,
    lat double precision,
    lng double precision,
    country character varying,
    administrative_area_level_2 character varying,
    administrative_area_level_1 character varying,
    locality character varying,
    route character varying,
    street_number character varying,
    postal_code character varying,
    account_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: places_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE places_id_seq OWNED BY places.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    password_hash character varying,
    password_salt character varying,
    name character varying,
    avatar_uid character varying,
    account_id integer,
    email character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY accounts ALTER COLUMN id SET DEFAULT nextval('accounts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY criterias ALTER COLUMN id SET DEFAULT nextval('criterias_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY moments ALTER COLUMN id SET DEFAULT nextval('moments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY photo_sets ALTER COLUMN id SET DEFAULT nextval('photo_sets_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY photos ALTER COLUMN id SET DEFAULT nextval('photos_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY places ALTER COLUMN id SET DEFAULT nextval('places_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: criterias_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY criterias
    ADD CONSTRAINT criterias_pkey PRIMARY KEY (id);


--
-- Name: moments_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY moments
    ADD CONSTRAINT moments_pkey PRIMARY KEY (id);


--
-- Name: photo_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY photo_sets
    ADD CONSTRAINT photo_sets_pkey PRIMARY KEY (id);


--
-- Name: photos_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- Name: places_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY places
    ADD CONSTRAINT places_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user",public;

INSERT INTO schema_migrations (version) VALUES ('20140407152007');

INSERT INTO schema_migrations (version) VALUES ('20140407152031');

INSERT INTO schema_migrations (version) VALUES ('20140407152143');

INSERT INTO schema_migrations (version) VALUES ('20140407152348');

INSERT INTO schema_migrations (version) VALUES ('20140407152437');

INSERT INTO schema_migrations (version) VALUES ('20140409143446');

INSERT INTO schema_migrations (version) VALUES ('20140608124426');

INSERT INTO schema_migrations (version) VALUES ('20140608150745');

INSERT INTO schema_migrations (version) VALUES ('20140608154517');

INSERT INTO schema_migrations (version) VALUES ('20140612163256');

INSERT INTO schema_migrations (version) VALUES ('20140620213841');

INSERT INTO schema_migrations (version) VALUES ('20140626185918');

INSERT INTO schema_migrations (version) VALUES ('20140627200114');

INSERT INTO schema_migrations (version) VALUES ('20140629183359');

