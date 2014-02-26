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
    key character varying,
    demo boolean DEFAULT false,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
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
-- Name: moments; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE moments (
    id integer NOT NULL,
    title character varying,
    description text,
    date timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    place_id integer,
    pictures_set_id integer
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
-- Name: pictures; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE pictures (
    id integer NOT NULL,
    description text,
    image_uid character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    image_width integer,
    image_height integer,
    account_id integer
);


--
-- Name: pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pictures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pictures_id_seq OWNED BY pictures.id;


--
-- Name: pictures_set_pictures; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE pictures_set_pictures (
    id integer NOT NULL,
    picture_id integer,
    pictures_set_id integer,
    th_width integer,
    th_height integer,
    th_left integer,
    th_top integer,
    c_left integer,
    c_top integer,
    pos integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: pictures_set_pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pictures_set_pictures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pictures_set_pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pictures_set_pictures_id_seq OWNED BY pictures_set_pictures.id;


--
-- Name: pictures_sets; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE pictures_sets (
    id integer NOT NULL,
    owner_id integer,
    owner_type character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    account_id integer,
    key character varying
);


--
-- Name: pictures_sets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pictures_sets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pictures_sets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pictures_sets_id_seq OWNED BY pictures_sets.id;


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
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    account_id integer
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
    admin boolean DEFAULT false,
    avatar_uid character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
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

ALTER TABLE ONLY moments ALTER COLUMN id SET DEFAULT nextval('moments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pictures ALTER COLUMN id SET DEFAULT nextval('pictures_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pictures_set_pictures ALTER COLUMN id SET DEFAULT nextval('pictures_set_pictures_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pictures_sets ALTER COLUMN id SET DEFAULT nextval('pictures_sets_id_seq'::regclass);


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
-- Name: moments_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY moments
    ADD CONSTRAINT moments_pkey PRIMARY KEY (id);


--
-- Name: pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY pictures
    ADD CONSTRAINT pictures_pkey PRIMARY KEY (id);


--
-- Name: pictures_set_pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY pictures_set_pictures
    ADD CONSTRAINT pictures_set_pictures_pkey PRIMARY KEY (id);


--
-- Name: pictures_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY pictures_sets
    ADD CONSTRAINT pictures_sets_pkey PRIMARY KEY (id);


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
-- Name: index_accounts_on_key; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX index_accounts_on_key ON accounts USING btree (key);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user",public;

INSERT INTO schema_migrations (version) VALUES ('20131127184607');

INSERT INTO schema_migrations (version) VALUES ('20131201110952');

INSERT INTO schema_migrations (version) VALUES ('20131202102455');

INSERT INTO schema_migrations (version) VALUES ('20131206152235');

INSERT INTO schema_migrations (version) VALUES ('20131214185527');

INSERT INTO schema_migrations (version) VALUES ('20131215074322');

INSERT INTO schema_migrations (version) VALUES ('20131215074841');

INSERT INTO schema_migrations (version) VALUES ('20131215083917');

INSERT INTO schema_migrations (version) VALUES ('20131219083515');

INSERT INTO schema_migrations (version) VALUES ('20140114192130');

INSERT INTO schema_migrations (version) VALUES ('20140118153508');

INSERT INTO schema_migrations (version) VALUES ('20140118154252');

INSERT INTO schema_migrations (version) VALUES ('20140125162031');

INSERT INTO schema_migrations (version) VALUES ('20140125204811');

INSERT INTO schema_migrations (version) VALUES ('20140126132936');

INSERT INTO schema_migrations (version) VALUES ('20140208055151');

INSERT INTO schema_migrations (version) VALUES ('20140209120153');

