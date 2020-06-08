<?php
include "conn.php";
$sql = "select * from indexgoods";
$res = $conn->query($sql);
$arr = array();
$sql1 = "select * from taobaogoods limit 0,8";
$res1 = $conn->query($sql1);
$arr1 = array();
$sql2 = "select * from taobaogoods limit 7,8";
$res2 = $conn->query($sql2);
$arr2 = array();
$sql3 = "select * from taobaogoods limit 8,8";
$res3 = $conn->query($sql3);
$arr3 = array();
for ($i = 0; $i < $res->num_rows; $i++) {
  $arr[$i] = $res->fetch_assoc();
};
for ($i = 0; $i < $res1->num_rows; $i++) {
  $arr1[$i] = $res1->fetch_assoc();
};
for ($i = 0; $i < $res2->num_rows; $i++) {
  $arr2[$i] = $res2->fetch_assoc();
};
for ($i = 0; $i < $res3->num_rows; $i++) {
  $arr3[$i] = $res3->fetch_assoc();
};
class data{
};
$echong = new data;
$echong->data1 = $arr;
$echong->data2 = $arr1;
$echong->data3 = $arr2;
$echong->data4 = $arr3;

echo json_encode($echong);//输出接口
