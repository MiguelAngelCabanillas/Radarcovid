<?php
    include 'db.php';
    include 'display1.php';
    $conexion = mysqli_connect("localhost", "root", "root");
    mysqli_select_db($conexion,"radarcovid");
    $sql = "SELECT * FROM people";
    $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());

//    while($row = mysqli_fetch_array($resultado)) {
  //      echo $row [ "id" ]." -> ".$row [ "lastname" ].", ".$row [ "firstname" ]."<br />";
    //}
    
    mysqli_close($conexion);
?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>RastreoCovid19</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <!--GridView en html-->
        <div class="gridview">
            <form action="">
                <label for="persona">Personas</label>
                <!--Fila 1-->
                <div class="row">
                    <!--Columna 1-->
                    <div class="column" style="background-color: #aaa;">
                        <h2>Column1</h2>
                        <p>Some text...</p>
                    </div>
                    <!--Columna 2-->
                    <div class="column" style="background-color: #bbb;">
                        <h2>Column2</h2>
                        <p>Some text...</p>
                    </div>
                </div>
                <!--Fila 2-->
                <div class="row">
                    <!--Columna 3-->
                    <div class="column" style="background-color: #ccc;">
                        <h2>Column3</h2>
                        <p>Some text...</p>
                    </div>
                    <!--Columna 4-->
                    <div class="column" style="background-color: #ddd;">
                        <h2>Column4</h2>
                        <p>Some text...</p>
                    </div>
                </div>
            </form>
        </div>

        <!--Seleccion Multiple de Amigos-->
        <div class="selectAmigos">
            <form action="">
                <label for="amigos">Amigos</label>
                <select name="amigos" id="amigos" multiple>
                    <!--Habria que generar el codigo dinamicamente, pongo algunos ejemplos-->
                    <option value="mcrg">Manuel Cristobal Roldan Gomez</option>
                    <option value="dmg">Daniel Melero Garcia</option>
                    <option value="fmbn">Francisco Maria Bono Navarro</option>
                    <option value="magm">Manuel Antonio Gomez Merino</option>
                </select>
                <br><br>
                <input type="submit" value="Submit">
            </form>
        </div>

        <!--Seleccion Multiple de Disponibles-->
        <div class="selectDisponibles">
            <form action="">
                <label for="disponibles">Disponibles</label>
                <select name="disponibles" id="disponibles" multiple>
                    <!--Habria que generar el codigo dinamicamente, pongo algunos ejemplos-->
                    <?php
                    while($row = mysqli_fetch_array($resultado)) {
                       echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
                    }
                    ?>

                    <!--<option value="mcrg">Tu Prima</option>-->
                </select>
                <br><br>
                <input type="submit" value="Submit">
            </form>
        </div>

        <!--Botones-->
        <div class="botones">
            <form action="">
                <input type="image" name="envioADisponibles" src="images/fder.jpg" alt="flecha_der"> <!--NO VAN LAS PUTAS IMAGENES-->
                <input type="image" name="envioAAmigoss" src="images/fizq.png" alt="flecha_izq"> <!--NO VAN LAS PUTAS IMAGENES-->
            </form>
        </div>
        
    </body>
</html>