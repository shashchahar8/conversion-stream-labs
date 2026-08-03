alter table public.leads
  add column trello_card_id text,
  add column trello_card_url text,
  add column trello_sync_status text not null default 'pending',
  add column trello_sync_error_code text,
  add column trello_sync_attempted_at timestamptz,
  add column trello_synced_at timestamptz,
  add constraint leads_trello_sync_status_check
    check (trello_sync_status in ('pending', 'synced', 'failed')),
  add constraint leads_trello_card_id_length
    check (trello_card_id is null or char_length(trello_card_id) <= 100),
  add constraint leads_trello_card_url_length
    check (trello_card_url is null or char_length(trello_card_url) <= 2048),
  add constraint leads_trello_sync_error_code_length
    check (trello_sync_error_code is null or char_length(trello_sync_error_code) <= 100);

create unique index leads_trello_card_id_unique
  on public.leads (trello_card_id)
  where trello_card_id is not null;

grant update (
  trello_card_id,
  trello_card_url,
  trello_sync_status,
  trello_sync_error_code,
  trello_sync_attempted_at,
  trello_synced_at
) on table public.leads to service_role;
