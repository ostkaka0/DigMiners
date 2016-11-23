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
        <?php
            $includedScripts = array();
            function addScript($path) {
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
