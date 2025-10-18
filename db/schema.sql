-- PostgreSQL schema for dynamic website content
-- Compatible with PostgreSQL and Supabase Postgres

-- Enable useful extensions
create extension if not exists pgcrypto; -- gen_random_uuid()

-- Physicians
create table if not exists public.physicians (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text,
  bio text,
  avatar_url text,
  qualifications text[],
  affiliations text[],
  email text,
  phone text,
  location text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Presentations
create table if not exists public.presentations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event text,
  location text,
  presented_at date,
  description text,
  slides_url text,
  video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Certificates
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  issue_date date,
  certificate_url text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contributions
create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  link_url text,
  contributed_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_title text,
  rating int check (rating between 1 and 5),
  content text not null,
  is_approved boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Publications
create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text,
  journal text,
  year int check (year >= 1800 and year <= extract(year from now())::int + 1),
  doi text,
  url text,
  abstract text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- News
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  published_at timestamptz,
  author_physician_id uuid references public.physicians(id) on delete set null,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Appointments
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  preferred_date date,
  preferred_time time,
  service_id uuid references public.services(id) on delete set null,
  message text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  created_at timestamptz not null default now()
);

-- Contact messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new','in_progress','resolved','archived')),
  created_at timestamptz not null default now()
);

-- Media assets
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt_text text,
  width int,
  height int,
  content_type text,
  created_at timestamptz not null default now()
);

-- Site settings
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists idx_presentations_date on public.presentations (presented_at desc);
create index if not exists idx_certificates_issue_date on public.certificates (issue_date desc);
create index if not exists idx_contributions_date on public.contributions (contributed_at desc);
create index if not exists idx_testimonials_published on public.testimonials (is_approved, published_at desc);
create index if not exists idx_publications_year on public.publications (year desc);
create index if not exists idx_news_published on public.news (is_published, published_at desc);
create index if not exists idx_appointments_status_date on public.appointments (status, created_at desc);


