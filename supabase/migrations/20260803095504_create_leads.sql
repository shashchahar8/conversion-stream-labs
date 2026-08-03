create table public.leads (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'started',
  campaign_id text,
  industry_id text,
  session_id uuid not null unique,
  first_name text not null,
  organisation_name text not null,
  email text not null,
  phone text not null,
  first_landing_page text,
  current_landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  cta_location text,
  privacy_consent boolean not null,
  privacy_consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint leads_status_check check (status in ('started')),
  constraint leads_campaign_id_length check (campaign_id is null or char_length(campaign_id) <= 100),
  constraint leads_industry_id_length check (industry_id is null or char_length(industry_id) <= 100),
  constraint leads_first_name_length check (char_length(first_name) between 1 and 100),
  constraint leads_organisation_name_length check (char_length(organisation_name) between 1 and 200),
  constraint leads_email_length check (char_length(email) between 3 and 254),
  constraint leads_phone_length check (char_length(phone) between 8 and 50),
  constraint leads_phone_digits check (
    char_length(regexp_replace(phone, '[^0-9]', '', 'g')) between 8 and 15
  ),
  constraint leads_first_landing_page_length check (
    first_landing_page is null or char_length(first_landing_page) <= 2048
  ),
  constraint leads_current_landing_page_length check (
    current_landing_page is null or char_length(current_landing_page) <= 2048
  ),
  constraint leads_referrer_length check (referrer is null or char_length(referrer) <= 2048),
  constraint leads_utm_source_length check (utm_source is null or char_length(utm_source) <= 255),
  constraint leads_utm_medium_length check (utm_medium is null or char_length(utm_medium) <= 255),
  constraint leads_utm_campaign_length check (utm_campaign is null or char_length(utm_campaign) <= 255),
  constraint leads_utm_content_length check (utm_content is null or char_length(utm_content) <= 255),
  constraint leads_utm_term_length check (utm_term is null or char_length(utm_term) <= 255),
  constraint leads_fbclid_length check (fbclid is null or char_length(fbclid) <= 512),
  constraint leads_cta_location_length check (cta_location is null or char_length(cta_location) <= 100),
  constraint leads_privacy_consent_consistency check (
    (privacy_consent and privacy_consent_at is not null)
    or (not privacy_consent and privacy_consent_at is null)
  )
);

create function public.set_leads_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_leads_updated_at
before update on public.leads
for each row
execute function public.set_leads_updated_at();

alter table public.leads enable row level security;

revoke all on table public.leads from public, anon, authenticated;
grant select, insert on table public.leads to service_role;
revoke all on function public.set_leads_updated_at() from public, anon, authenticated;
