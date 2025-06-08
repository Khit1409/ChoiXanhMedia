<?php
$serverName = "127.0.0.1"; // hoặc IP của SQL Server, ví dụ: 127.0.0.1, hoặc tên instance: localhost\SQLEXPRESS
$connectionOptions = [
    "Database" => "kidnine",
    "Uid" => "sa",
    "PWD" => "14092005@kidnine"
];

// Kết nối
$conn = sqlsrv_connect($serverName, $connectionOptions);

// Kiểm tra
if ($conn) {
    echo "✅ Kết nối SQL Server thành công!";
    sqlsrv_close($conn);
} else {
    echo "❌ Kết nối thất bại.<br>";
    die(print_r(sqlsrv_errors(), true));
}