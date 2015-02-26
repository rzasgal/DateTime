<html>
<head>
    <link href="../resources/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="../resources/css/bootstrap-theme.css" rel="stylesheet" type="text/css"/>
    <script src="../resources/js/jquery-2.1.1.js" type="text/javascript"></script>
    <style type="text/css">
        .datetime
        {
            position: relative;
        }
        .datetime-div {
            z-index: 10;
            box-shadow: 2px 2px 2px gray;
            display: none;
            padding-top: 10px;
            border-radius: 3px;
            border: 1px solid gray;
            padding: 10px;
            position: absolute;
            background-color: #ffffff;
            font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        }

        .datetime-time {
            display: none;
            width: 400px;
        }

        .day-selected {
            background-image: linear-gradient(to bottom, #08c, #04c);
            background-repeat: repeat-x;
            color: #ffffff !important;
        }

        .years {
            display: none;
        }

        .datetime-row {
            line-height: 30px;
        }

        .datetime-cell {
            border: 1px #ffffff solid;
            border-radius: 4px;
            margin: 2px;
            display: inline-block;
            border-radius: 4px;
            text-align: center;
            height: 30px;
            vertical-align: middle;
        }
        .day-label{
            width: 30px;
            border: 1px #ffffff solid;
            border-radius: 4px;
            margin: 2px;
            display: inline-block;
            font-weight: bold;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }

        .datetime-cell:hover {
            background-color: #adadad;
            cursor: pointer;
        }

        .years-header {
            height: 40px;
            text-align: center;
        }

        .year {

        }

        .day {
            font: "Courier New", Courier, monospace;
            font-size: 12px;
            color: gray;
            width: 30px;
        }

        .days-header {
            height: 40px;
            text-align: center;
        }

        .months-header {
            height: 40px;
            text-align: center;
        }

        .current-month-day {
            color: black;
        }

        .month {
            width: 80px;
        }

        .weekday {

        }

        .weekend {

        }

        .datetime-time input {
            font-size: 15px;
            font-weight: bold;
        }
    </style>
    <script type="text/javascript" src="../resources/js/datetime.js"></script>
    <script type="text/javascript">
        //<![CDATA[

        $(document).ready(function () {
            $('#datetimeComponent').datetime();
        });
        //]]>
    </script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-8 col-lg-8" style="height:200px">
            <form>
                <div class="form-group">
                    <label for="name" class="control-label col-md-3">Name</label>

                    <div class="col-md-9">
                        <input type="text" class="form-control" id="name" name="name"/>
                        <input type="datetime-local" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="birthday" class="control-label col-md-3">Birthday</label>

                    <div class="col-md-9 datetime"  id="datetimeComponent">

                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-9"></div>
                    <input type="submit" class="btn btn-primary" value="ok"/>
                </div>
            </form>
        </div>
        <div class="col-md-4 col-lg-4" style="height:200px"></div>
    </div>

</div>
</body>
</html>