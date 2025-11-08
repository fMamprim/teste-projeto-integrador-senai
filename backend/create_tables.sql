-- Habilita a geração de UUIDs se não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criação dos ENUMs (Tipos customizados)
CREATE TYPE user_role AS ENUM ('WAITER', 'KITCHEN', 'CASHIER', 'ADMIN');
CREATE TYPE table_status AS ENUM ('FREE', 'OCCUPIED', 'PAYING');
CREATE TYPE order_status AS ENUM ('OPEN', 'CLOSED');
CREATE TYPE kitchen_status AS ENUM ('PENDING', 'IN_PROGRESS', 'READY');

-- Criação da Tabela "users"
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da Tabela "tables"
CREATE TABLE tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "number" INT NOT NULL UNIQUE,
    status table_status DEFAULT 'FREE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da Tabela "categories"
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da Tabela "products"
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da Tabela "orders"
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status order_status DEFAULT 'OPEN',
    table_id UUID NOT NULL REFERENCES tables(id),
    user_id UUID NOT NULL REFERENCES users(id), -- O garçom que abriu
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP
);

-- Criação da Tabela "order_items"
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quantity INT NOT NULL,
    observation TEXT,
    kitchen_status kitchen_status DEFAULT 'PENDING',
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--usuario teste: username garcom e senha 123456
INSERT INTO users (name, username, password_hash, role) 
VALUES ('Garçom Teste', 'garcom', '$2b$10$C590BvCltfeiDD1AeLT5f.HrgcIAROgLzNWqe91IvXtJp7ErNZtLe', 'WAITER');