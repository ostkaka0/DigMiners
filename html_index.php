<html>
    <head>
    <title>DigMiners</title>
    <link rel="stylesheet" type="text/css" href="style.css" media="screen" />
    </head>
    <body>
        <canvas class="canvas" id="canvas"></canvas>
        <script type = "text/javascript">
            var isServer = false;
            window.vars = { 
            <?php
                $ip = (isset($_GET["ip"]) ? '"' . $_GET["ip"] . '"' : '"127.0.0.1"');
                if(empty($ip))
                    $ip = '"127.0.0.1"';
                echo ("ip: " . $ip);
            ?>
        };
        </script>
        <div class="hud" id="hud">
            <div class="dugItems" id="dugItems"></div>
            <div class="inventory" id="inventory"></div>
            <div class="crafting" id="crafting"></div>
            <!--<div class="chat" id="chat">chat</div>-->
        </div>
        <script type="text/javascript" src="src.js"></script>
    </body>
</html>
