create table customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text
);
create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  total_cents int not null,
  stripe_payment_intent text,
  created_at timestamptz default now()
);
