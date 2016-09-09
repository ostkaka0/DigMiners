<html>
    <head>
    <title>DigMiners</title>
    <link rel="stylesheet" type="text/css" href="style.css" media="screen" />
    </head>
    <body>
        <canvas class="canvas" id="canvas"></canvas>

        <?php
            function addScript($path, $type) {
                echo "\n\t\t" . '<script id="' . $path . '" type="' . $type . '" src="' . $path . '"></script>';
            }

            function addScriptsRecursive($path, $type, $extensions) {
                $it = new RecursiveDirectoryIterator($path);
                foreach(new RecursiveIteratorIterator($it) as $file) {

                    if (in_array(substr($file, strrpos($file, '.')), $extensions))
                        addScript($file, $type);
                }
            }

            // Add shaders:
            addScriptsRecursive("data/shaders", "glsl", [".glsl"]);

            // Add source
            addScriptsRecursive("lib", "text/javascript", [".js"]);
            addScriptsRecursive("src", "text/javascript", [".js"]);

            // Run game/test
            if (isset($_GET["test"]) && preg_match("/^[a-zA-Z0-9_]*$/i", $_GET["test"]))
                addScript("tests/" . $_GET["test"] . ".js", "text/javascript");
            else
                addScript("DigMiners.js", "text/javascript");
            
        ?>
    </body>
</html>
