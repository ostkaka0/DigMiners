<html>
    <head>
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
                $ip = (isset($_GET["ip"]) ? '"' . $_GET["ip"] . '"' : '"127.0.0.1"');
                if(empty($ip))
                    $ip = '"127.0.0.1"';
                echo ("ip: " . $ip);
            ?>
        };
        // jQuery-getter used by bootstrap
        //window.jQuery = { get: function() { return window.$; } };//Object.defineProperty(window, "jQuery", { get: function() { return window.$; } });
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
