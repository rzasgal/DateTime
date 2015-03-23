<%--
  Created by IntelliJ IDEA.
  User: pc
  Date: 23.03.2015
  Time: 01:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html ng-app="testModule">
<head>
    <title></title>
    <link type="text/css" rel="stylesheet" href="../resources/css/bootstrap.css"/>
    <link type="text/css" rel="stylesheet" href="../resources/css/bootstrap-theme.css"/>
    <link type="text/css" rel="stylesheet" href="../resources/css/datetime.css"/>
    <script src="../resources/js/jquery-2.1.1.js"></script>
    <script src="../resources/js/datetime.js"></script>
    <script src="../resources/js/angular.js"></script>
    <script src="../resources/js/datetime_angular.js"></script>
    <script src="../resources/js/testModule.js"></script>
</head>
<body ng-controller="testController">
<div ng-datetime="person.birthdate">

</div>
<input type="text" ng-model="person.birthdate"/>
</body>
</html>
