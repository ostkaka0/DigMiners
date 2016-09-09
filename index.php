<html>
    <head>
    <title>DigMiners</title>
    <link rel="stylesheet" type="text/css" href="style.css" media="screen" />
    </head>
    <body>
        <canvas class="canvas" id="canvas"></canvas>
        <script type = "text/javascript">
            var isServer = false;
        </script>        
        <?php
            function addScript($path) {
                echo "\n\t\t" . '<script type="text/javascript" src="' . $path . '"></script>';
            }

            function addScriptsRecursive($path) {
                $it = new RecursiveDirectoryIterator($path);
                $extensions = [".js"];
                foreach(new RecursiveIteratorIterator($it) as $file) {
                    if (in_array(substr($file, strrpos($file, '.')), $extensions))
                        addScript($file, $type);
                }
            }

            addScriptsRecursive("lib");
            addScriptsRecursive("lib_front_end");
            addScriptsRecursive("src");

            // Run game/test
            if (isset($_GET["test"]) && preg_match("/^[a-zA-Z0-9_]*$/i", $_GET["test"]))
                addScript("tests/" . $_GET["test"] . ".js", "text/javascript");
            else
                addScript("DigMiners.js");
        ?>
    </body>
</html>
