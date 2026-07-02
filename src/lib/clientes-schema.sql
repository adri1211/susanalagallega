-- Tabla de clientes / leads para CRM
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_persona TEXT NOT NULL,
  nombre_comercio TEXT,
  correo TEXT,
  telefono TEXT,
  localidad TEXT,
  notas TEXT,
  estado TEXT NOT NULL DEFAULT 'pendiente'
    CHECK (estado IN ('pendiente','contactado','interesado','contratado','rechazado','no_contesta')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Solo usuarios autenticados pueden leer y escribir
CREATE POLICY "Authenticated users can manage clientes"
  ON clientes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
