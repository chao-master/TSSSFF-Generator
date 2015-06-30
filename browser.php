<?php
    $filter = $_GET["filter"] or "";
    $sFilter = addslashes($filter);
?>

<html>
    <head>
        <title>TSSSFF Card Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/ripples.min.css" rel="stylesheet">
        <link href="css/material-wfont.min.css" rel="stylesheet">
        <link href="css/font-awesome.min.css" rel="stylesheet">

        <link href="cardStyling.css" rel="stylesheet">
        <style>
            .icons {
                text-align:center;
            }
            .icons img{
                max-height:22px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
                        <div class="panel-body">
                            <form>
                                <input class="form-control floating-label" type="text" id="filter" name="filter" placeholder="Filter" value="<?=$sFilter?>"/>
                                <button class="btn btn-primary" type="submit">Filter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
                        <div class="panel-body">
                            <table id="viewTable" class="table table-hover" style="margin: 30px 0;">
                                <tr>
                                    <th>Name</th>
                                    <th class="icons">Kinds</th>
                                    <th>Attributes</th>
                                    <th>Copyright</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    </tr>
                            </table>
                            <button class="btn" id="more">Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/ripples.min.js"></script>
        <script src="js/material.min.js"></script>
        <script src="viewer.js"></script>
        <script>
            $(document).ready(function() {
                $.material.init();
                FILTER = "<?=$sFilter?>"
                loadMoreCards()
                $("#more").click(loadMoreCards)
            });
        </script>
    </body>
</html>