<?php
    $filter = $_GET["filter"] or "";
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
            .setOnly{
                display:none;
            }
            .setAddMode .setOnly{
                display:table-cell;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="panel">
                        <div class="panel-heading">
                            Filter Cards
                        </div>
                        <div class="panel-body">
                            <form>
                                <input class="form-control floating-label" type="text" id="filter" name="filter" placeholder="Filter" value="<?=htmlspecialchars($filter)?>"/>
                                <button class="btn btn-primary" type="submit">Filter</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel">
                        <div class="panel-heading">
                            Card Sets.
                        </div>
                        <div class="panel-body">
                            <button class="btn">New set</button>
                            <div class="togglebutton">
                                <label>Input mode
                                    <input type="checkbox"/>
                                </label>
                            </div>
                            <div class="form-group">
                                <input class="form-control floating-label" type="text" id="editUrl" placeholder="Edit link: (lets you add and remove cards from the set, keep secret)" readonly/>
                            </div>
                            <div class="form-group">
                                <input class="form-control floating-label" type="text" id="shareUrl" placeholder="Sharing Link:" readonly/>
                            </div>
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
                                    <th class="setOnly">&nbsp;</th>
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
                FILTER = "<?=addslashes($filter)?>"
                loadMoreCards()
                $("#more").click(loadMoreCards)
            });
        </script>
    </body>
</html>
