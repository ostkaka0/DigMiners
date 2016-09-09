<html>
    <head>
    <title>DigMiners</title>
    <link rel="stylesheet" type="text/css" href="style.css" media="screen" />
    </head>
    <body>
        <script id="shader-vert" type="x-shader/x-vertex">
            attribute vec3 aPos;
            
            uniform mat4 uMVMatrix;
            uniform mat4 uPMatrix;

            void main(void) {
                gl_Position = vec4(0.5*aPos, 1.0);//uPMatrix * uMVMatrix * vec4(aPos, 1.0);            
            }
        </script>
        <script id="shader-frag" type="x-shader/x-fragment">
            void main(void) {
                gl_FragColor = vec4(1.0);
            }
        </script>

        <canvas class="canvas" id="canvas"></canvas>

        <?php
            function addScript($path) {
                echo '<script type="text/javascript" src="' . $path . '"></script>';
            }

            function addScriptDirectory($path) {
                $it = new RecursiveDirectoryIterator($path);
                $extensions = Array("js");
                foreach(new RecursiveIteratorIterator($it) as $file) {
                    if (in_array(substr($file, strrpos($file, '.') + 1), $extensions))
                        addScript($file);
                }
            }

            addScriptDirectory("lib");
            addScriptDirectory("src");

            // Run game/test
            if (isset($_GET["test"]) && preg_match("/^[a-zA-Z0-9_]*$/i", $_GET["test"]))
                addScript("tests/" . $_GET["test"] . ".js");
            else
                addScript("DigMiners.js");
            
        ?>
    </body>
</html>
