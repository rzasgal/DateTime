<html>
<head>
    <link href="../resources/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="../resources/css/bootstrap-theme.css" rel="stylesheet" type="text/css"/>
    <link href="../resources/css/datetime.css" rel="stylesheet" type="text/css"/>
    <script src="../resources/js/jquery-2.1.1.js" type="text/javascript"></script>

    <script type="text/javascript" src="../resources/js/datetime.js"></script>
    <script type="text/javascript">
        //<![CDATA[

        $(document).ready(function () {
            $('#datetimeComponent').datetime();
            $('#datetimeComponent').on('datetimechanged', function(e){
               alert(e.datetime);
            });
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