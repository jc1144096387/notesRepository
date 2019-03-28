## 数据库管理
### 收缩数据库
DBCC SHRINKDATBASE命令
DBCC SHRINKDATABASE (数据库名 [, 目标百分比]
    [, {NOTRUNCATE | TRUNCATEONLY}]) 
以下示例将减小 UserDB 用户数据库中数据文件和日志文件的大小，以便在数据库中  留出 10% 的可用空间  。
DBCC SHRINKDATABASE (UserDB, 10);  
GO




### 收缩数据文件
DBCC SHRINKFILE命令
DBCC SHRINKFILE ({文件名 | 文件id} [, 目标大小]
    [, { EMPTYFILE | NOTRUNCATE | TRUNCATEONLY}])
以下示例将 UserDB 用户数据库中名为 DataFile1 的数据文件的大小收缩到 7 MB。
USE UserDB;  
GO  
DBCC SHRINKFILE (DataFile1, 7);  
GO