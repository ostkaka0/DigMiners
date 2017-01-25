<html>
    <head>
    <title>DigMiners</title>
    <link rel="stylesheet" type="text/css" href="tether.min.css"/>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="style.css"/>
    </head>
    <body>
        <canvas class="canvas" id="canvas"></canvas>
        <canvas class="canvas" id="spriteCanvas"></canvas>
        <div id ="eventdiv" style = "position: absolute; width: 100%; height: 100%; background-color: transparent;"></div>
        <script type = "text/javascript">
            var isServer = false;
            window.vars = { 
            <?php
                $ip = (isset($_GET["ip"]) ? '"' . $_GET["ip"] . '"' : '"digwar.io"');
                if(empty($ip))
                    $ip = '"digwar.io"';
                echo ("ip: " . $ip);
            ?>
        };
        </script>
        <div class="hud" id="hud">
            <div class="crafting" id="crafting"></div>
        </div>
        <?php
            function scriptVersion($fileName){
                return $fileName . "?" . filemtime($fileName);
            }
        ?>
        <script type="text/javascript" src="<?php echo scriptVersion("src.js")?>"></script>
    </body>
</html>
