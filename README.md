# Hobby Connection

## デプロイ先

## 概要

自分の趣味をみんなに共有するブログサイトです。

本アプリは共通の趣味を持ったユーザ同士で盛り上がったり、新しい趣味を見つけられるようにすることで人生をより楽しくすること目指しています。

特に、記事を投稿したユーザ自身に興味を持ち、そのユーザの別の趣味に触れることで、新たな趣味をつくるというプロセスを作りたいです。

## 開発人数

1 人

## 使用技術

### 開発環境

-   WSL2（Ubuntu 22.04 LTS）
-   Docker
-   Visual Studio Code

### 開発言語

-   TypeScript
-   PHP

### フレームワーク

-   Laravel10
-   React
-   Inertia
-   Tailwind CSS

### データベース

-   MySQL

### インフラ

-   heloku
-   AWS？

### 画像ファイル管理

-   AWS S3

## 機能一覧

### 現在搭載されている機能

-   ログイン機能
-   ユーザ新規登録機能
-   プロフィール設定機能
-   記事閲覧機能
-   記事投稿機能
-   記事編集機能
-   投稿追加機能（画像・見出し・コメント）
-   記事 TOP 設定機能（記事タイトル・期間・画像・概要）
-   タグ機能
-   いいね機能

### 今後搭載予定の機能

-   ユーザフォロー機能
-   閲覧した記事にコメントする機能
-   記事検索機能（タグ）
-   ユーザ検索機能（ユーザ名）
-   検索したユーザのプロフィール・記事を閲覧できる機能（タグをクリックすると、そのタグを設定した記事が一覧表示されるようにする）

## 何故開発しようと思ったか

開発しようと思った理由は以下の３つです。

1. 実際に趣味を体験できない人でも体験した気分を味わえるようなものを作ってみたいと思ったから
2. 楽しい体験を伝えることで人を楽しませるものを作ってみたいと思ったから
3. 今まで触れてこなかった趣味を体験することで、プラスの感情を作ってみたいと思ったから

以下でそれぞれの理由について説明します。

#### 1. 実際に趣味を体験できない人でも体験した気分を味わえるようなものを作ってみたいと思ったから

私は Vtuber が好きで、以前この動画([https://www.youtube.com/watch?v=iA8zNXWO2iI](https://www.youtube.com/watch?v=iA8zNXWO2iI))を観ていた際に、一度くらい自分のお金で旅行に行ってみたいと思いました。しかし、私には旅行に行けるほどのお金や時間はありません。その時にふと私は、私以外にもお金や時間がない人や、怪我や病気等で行くことが出来ない人もいると気付きました。つまり、趣味を体験したくても体験できないという人がこの世界には沢山いると気付いたのです。そこで、そういった人達が趣味を体験した気分を味わえるようなものがあれば良いと思いました。

#### 2. 楽しい体験を伝えることで人を楽しませるものを作ってみたいと思ったから

先程の動画を観たことで、楽しい体験を伝えることで人を楽しませるものを作ってみたいと思いました。私は実際にその場にいませんでしたが、移動中の雑談や、グランピング、トランプを楽しんでいる様子を観ていて、楽しいと感じました。これにより、私は実際に体験できなくてもその場の楽しさを伝えることが出来ると実感し、体験の楽しさを伝えるものを作ってみたいと思いました。

#### 3. 今まで触れてこなかった趣味を体験することで、プラスの感情を作ってみたいと思ったから

先程の動画は、Vtuber というコンテンツを起点として、視聴者を旅行というコンテンツにつなげるものだと考えております。また、私は新たな趣味を見つけると、人生が豊かになると考えています。例えば、私は Vtuber というコンテンツに初めて触れたとき、「かわいい」「面白い」「一緒にいて楽しい」といった感情が湧き上がって幸せになりました。ご自身の経験に照らし合わせて想像して下さい。新たな趣味を見つけたときの気持ちはどのようなものでしたか？「楽しい」「面白い」「好き」等プラスの感情が湧き上がってきませんでしたか？私は先程の動画を見て、このような感情を作ってみたいと思いました。

以上の理由から、私は趣味を共有できる Web アプリを作ってみたいと思いました。Hobby Connection を使用することで、趣味を体験して楽しみ、新たな趣味を見つけて、人生が今よりも豊かになれば嬉しいです。

## [サイトストラクチャ](https://drive.google.com/file/d/1r9j9nggoobS2rChpoOU6z4YkgNXmqe_z/view?usp=sharing)

## [ワイヤフレーム](https://app.diagrams.net/#G1rMCmTkB2WtT4swPb3ieEt_686NVUhFAk)

## [ER 図](https://drive.google.com/file/d/1r8Pw335I2oew5LOtUtZQcrVuXPY7uuU8/view?usp=sharing)

## 今後の改善案

-   コンポーネントや関数のメモ化を試みたが、ナビゲーションバーぐらいしか上手くいかなかった。具体的には、以下の点が上手くいかなかった。

    -   サブフォームがレンダリングされると親コンポーネントのメインフォームとページ（create.tsx、edit.tsx）が再レンダリングされてしまう。
    -   メインフォームが入力されると子コンポーネントのサブフォームと親コンポーネントのページ（create.tsx、edit.tsx）が再レンダリングされてしまう。しかし、サブフォームをメモ化するとサブフォームをループでレンダリングするメインフォームがレンダリングされないので、サブフォームで入力・削除するとそのサブフォーム以降のサブフォームが消滅する。
    -   React Dev Tools の Profiler でパフォーマンスを計測しようとしたが、「Profiling not supported. Profiling support requires either a development or profiling build of React v16.5+.」と表示され、使用できない。開発環境の React は v18.2.0 であり、条件を満たしているのにも関わらず、サポート対象外となってしまう。

    序盤からメモ化することを想定してコンポーネントを設計しないとパフォーマンス改善に取り組むことすら出来なくなるのだと学んだ。今後はこのようなことがないように、他のエンジニアにコードレビューをしてもらいながら開発するようにしたい。
