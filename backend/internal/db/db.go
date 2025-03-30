package db

import (
	"context"
	_ "embed"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type (
	WebAppTemplateDB struct {
		pool *pgxpool.Pool
	}
)

func NewWebAppTemplateDB(ctx context.Context) (*WebAppTemplateDB, error) {
	poolConfig, err := pgxpool.ParseConfig(os.Getenv("DATABASE_URL"))
	if err != nil {
		return &WebAppTemplateDB{}, err
	}
	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		return &WebAppTemplateDB{}, err
	}
	return &WebAppTemplateDB{pool: pool}, nil
}

func (db *WebAppTemplateDB) Close() {
	db.pool.Close()
}
