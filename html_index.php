<html>
    <head>
    <meta name="description" content="This .io-game is a combination of action and creativity. Dig tunnels, build bunkers, place turrets, heal friends, kill zombies and shoot enemies.">
    <meta name="keywords" content="digwar, io, digwario, dig, build, defend, zombie, html5, iogame, iogames, game, games">
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-90947459-1', 'auto');
        ga('send', 'pageview');
    </script>
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
            var global = window;
            window.vars = {
            <?php
                $ip = (isset($_GET["ip"]) ? '"' . $_GET["ip"] . '"' : '"digwar.io"');
                if(empty($ip))
                    $ip = '"digwar.io"';
                echo ("ip: " . $ip);
            ?>
        };
        </script>
        <div class="hud" id="hud"></div>
        <?php
            function scriptVersion($fileName){
                return $fileName . "?" . filemtime($fileName);
            }
        ?>
        <script type="text/javascript" src="lib/jquery-3.1.1.min.js"></script>
        <script type="text/javascript" src="lib/bootstrap.min.js"></script>
        <script type="text/javascript" src="lib/pixi.min.js"></script>
        <script type="text/javascript" src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
        <script> window.socket = io(); </script>
        <script type="text/javascript" src="<?php echo scriptVersion("src.js")?>"></script>
    </body>
</html>
