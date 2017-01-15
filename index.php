<html>
    <head>
    <title>DigMiners</title>
    <link rel="stylesheet" type="text/css" href="tether.min.css"/>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="style.css"/>
    </head>
    <body>
        <canvas class="canvas" id="canvas"></canvas>
        <div id ="eventdiv" style = "position: absolute; width: 100%; height: 100%; background-color: transparent;"></div>
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
        </div>
        <?php
            $includedScripts = array();
            function addScript($path) {
                global $includedScripts;
                if (isset($includedScripts[$path]))
                    return;
                $includedScripts[$path] = true;
                echo "\n\t\t" . '<script type="text/javascript" src="' . $path . '"></script>';
            }

            function addScriptsRecursive($path) {
                $it = new RecursiveDirectoryIterator($path);
                $extensions = [".js"];
                foreach(new RecursiveIteratorIterator($it) as $file => $other) {
                    if (in_array(substr($file, strrpos($file, '.')), $extensions))
                        addScript($file);
                }
            }

            addScriptsRecursive("lib");
            addScript("lib_front_end/apixi.js");
            addScript("lib_front_end/bpixi-particles.min.js");
            addScript("lib_front_end/ajquery-3.1.1.min.js");
            addScript("lib_front_end/atether.min.js");
            addScript("lib_front_end/bootstrap.min.js");
            addScriptsRecursive("lib_front_end");
            addScriptsRecursive("engine");
            addScriptsRecursive("game");

            // Run unit tests:
            addScript("UnitTest.js");
            addScriptsRecursive("unit_tests");
            echo '<script type="text/javascript"> runUnitTests(); </script>';

            // Run game/test
            if (isset($_GET["test"]) && preg_match("/^[a-zA-Z0-9_]*$/i", $_GET["test"]))
                addScript("tests/" . $_GET["test"] . ".js", "text/javascript");
            else
                addScript("DigMiners.js");
        ?>
    </body>
</html>
