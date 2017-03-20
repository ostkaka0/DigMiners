<html>
    <head>
    <title>DigMiners</title>
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
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
        </script>
        <div class="hud" id="hud">
            <div class="crafting" id="crafting"></div>
        </div>
        <?php
            error_reporting(E_ALL);
            ini_set('display_errors', TRUE);
            ini_set('display_startup_errors', TRUE);
            $includedScripts = array();
            function addScript($path) {
                global $includedScripts;
                $path = realpath($path);
                $path = substr($path, strlen(realpath("./")) + 1);
                if (substr($path, -3) != ".js") return;
                if (isset($includedScripts[$path])) return;
                $includedScripts[$path] = true;
                echo "\n\t\t" . '<script type="text/javascript" src="' . $path . '?' . time() . '"></script>';
            }

            function loadModule($path) {
                global $includedScripts;
                $path = realpath($path) . "/";
                if (isset($includedScripts[$path])) return;
                $includedScripts[$path] = true;

                $moduleFilePath = $path . "jsmodule";
                if (file_exists($moduleFilePath)) {
                    $depsCode = file_get_contents($moduleFilePath);
                    $lines = explode("\n", $depsCode);
                    foreach($lines as $line) {
                        $filePath = $path . explode("//", $line, 1)[0];
                        if (is_dir($filePath))
                            loadModule($filePath);
                        else
                            addScript($filePath);
                    }
                }
                $dirs = array();
                $files = array();
                $filePaths = scandir($path);
                foreach($filePaths as $filePath) {
                    if ($filePath == "..") continue;
                    $filePath = $path . $filePath;
                    if (is_dir($filePath))
                        array_push($dirs, $filePath);
                    else
                        array_push($files, $filePath);
                }
                foreach($files as $file)
                    addScript($file);
                foreach($dirs as $dir)
                    loadModule($dir);
            }

            loadModule("./lib_front_end/");
            loadModule("./Game/");
            /*
            function addScriptsRecursive($path) {
                $it = new RecursiveDirectoryIterator($path);
                $extensions = [".js")];
                foreach(new RecursiveIteratorIterator($it) as $file => $other) {
                    if (in_array(substr($file, strrpos($file, '.')), $extensions))
                        addScript($file);
                }
            }

            addScriptsRecursive("lib");
            addScript("lib_front_end/apixi.js"));
            addScript("lib_front_end/ajquery-3.1.1.min.js"));
            addScript("lib_front_end/atether.min.js"));
            addScript("lib_front_end/bootstrap.min.js"));
            addScriptsRecursive("lib_front_end");
            addScriptsRecursive("engine");
            addScriptsRecursive("game");

            // Run unit tests:
            addScript("UnitTest.js"));
            addScriptsRecursive("unit_tests");
            echo '<script type="text/javascript"> runUnitTests(); </script>';
            */
            // Run Game/test
            addScript("DigMiners.js");

        ?>
    </body>
</html>
