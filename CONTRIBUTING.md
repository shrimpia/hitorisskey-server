# バックエンドのデザインパターン

## Controller

Web APIを実装する。

Controllerに実装できるのは、Serviceへの呼び出しおよび、軽微な処理のみである。

Prisma Clientに直接アクセスしたり、複雑なビジネスロジックを実装してはいけない。そういった処理は全てServiceに実装する。

## Service

ビジネスロジックを実装する。

Serviceは、他のServiceを呼び出すことができる。
