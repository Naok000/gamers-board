## Gamers Board

ゲーマーがお互いの保有する知識や情報を共有して技術を高めあったり、  
コミュニケーションを行うことを目的とした掲示板アプリ

https://github.com/Naok000/gamers-board/assets/46452998/929984ad-758e-45d2-91a9-8a5401c17a2b

## 機能

- 認証機能
  - JWT 認証
  - role-based authentication
- 投稿機能
- フィルタリング機能
- コメント機能
- 退会機能
- アバター画像の設定

## 使用技術

### フロントエンド

- Javascript
- Next.js
- TypeScript
- Chakra UI
- TanStack Query
- firebase storage

### バックエンド

- Nest.js - code: https://github.com/Naok000/gamers-restapi
- Prisma
- PostgreSQL

### インフラ

- Docker(開発環境)

## ER 図

![gamersBoard_relationships real large](https://github.com/Naok000/gamers-board/assets/46452998/4523dfdd-58c3-4ae7-a34c-c58980720e24)

## 実装予定機能及び行いたいこと

- アバター画像の変更
- google 認証
- like 機能
- ブックマーク機能
- 通報機能
- コメント時に画像投稿ができる機能
- リフレッシュトークンの実装
