---
title: タイピングルーム実践開発日誌
description: Claude Codeでタイピングルームプロジェクトを開発しながら経験した実践事例。問題解決のプロセスと学んだことの記録。
---

# 実践開発事例

このドキュメントでは、カスタムキーボードタイピング音・背景設定Webサービスである**「タイピングルーム（Typing Room）」**を開発しながら、Claude Codeをどのように実践に活用したかを記録します。

## 🎯 プロジェクト環境
* **フレームワーク:** Next.js (App Router), React, TypeScript
* **アーキテクチャ:** FSD（Feature-Sliced Design）およびDDD-lite
* **状態管理:** Zustand, TanStack Query
* **インフラ:** ローカルMacBook内Docker環境、Supabase（手動クライアント実装）

## 🛠️ 実践トラブルシューティングおよびプロンプト事例

### 1. FSDアーキテクチャファイルの自動配置
Next.js App RouterとFSD構造を組み合わせる際、AIがファイルを見当違いのフォルダに生成してしまう問題がありました。
* **解決策:** `CLAUDE.md`にFSDの階層構造（app, pages, widgets, features, entities, shared）の明確な定義と、Importの依存関係ルール（下位レイヤーのみ参照可能）を追加しました。
* **結果:** 「キーボードサウンド再生ボタンのコンポーネントを作って」と指示すると、自動的に`features/keyboard-sound/ui/`のパスに正しくファイルを生成するようになりました。

### 2. 音源再生（Audio API）ロジックの最適化
Web環境でカスタムタイピング音を遅延なく再生するためにWeb Audio APIを扱う過程で、Claude Codeの**Plan Mode**が真価を発揮しました。
* **適用:** むやみにコードを修正させず、`Shift + Tab`でプランモードに入ってから「オーディオバッファリングの最適化と、同時打鍵時のオーバーラップ処理戦略をまず提示して」と指示しました。
* AIが提案したAudioContextプリロード構造をレビューした後、エディットモードに切り替えてクリーンにモジュール化を完了しました。