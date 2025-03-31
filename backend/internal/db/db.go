package db

import (
	"context"
	_ "embed"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type (
	StarBattle struct {
		pool *pgxpool.Pool
	}
)

func NewStarBattleDB(ctx context.Context) (*StarBattle, error) {
	poolConfig, err := pgxpool.ParseConfig(os.Getenv("DATABASE_URL"))
	if err != nil {
		return &StarBattle{}, err
	}
	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		return &StarBattle{}, err
	}
	return &StarBattle{pool: pool}, nil
}

func (db *StarBattle) Close() {
	db.pool.Close()
}
