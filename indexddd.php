<?php
    
    $conexion = mysqli_connect("localhost", "root", "root");
    mysqli_select_db($conexion,"radarcovid");
    $sql = "SELECT * FROM people";
    $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());

    //while($row = mysqli_fetch_array($resultado)) {
      //  echo $row [ "id" ]." -> ".$row [ "lastname" ].", ".$row [ "firstname" ]."<br />";
    //}
    
?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>RastreoCovid19</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <table class="blueTable">
        <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>head4</th>
        </tr>
        </thead>
        <tfoot>
            <tr>
                <td colspan="4">
                    <div class="links"><a href="#">&laquo;</a> <a class="active" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
                </td>
            </tr>
        </tfoot>
        <tbody>
            <?php
                $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());
                while($row = mysqli_fetch_array($resultado)) {
                    printf('
                        <tr>
                            <td>%s</td>
                            <td>%s</td>
                            <td>%s</td>
                            <td>%s</td>
                        </tr>', $row["id"], $row["firstname"], $row["lastname"], "");
                }
            ?>
        </tbody>
    </table>
        <!--Seleccion Multiple de Amigos-->
        <div class="selectAmigos">
            <form action="indexddd.php" method="post">
                <label for="amigos">Amigos</label>
                <select name="amigos" id="amigos" multiple>
                    <!--Habria que generar el codigo dinamicamente, pongo algunos ejemplos-->
                    <option value="mcrg">Manuel Cristobal Roldan Gomez</option>
                    <option value="dmg">Daniel Melero Garcia</option>
                    <option value="fmbn">Francisco Maria Bono Navarro</option>
                    <option value="magm">Manuel Antonio Gomez Merino</option>
                </select>
                <br><br>
                <input type="submit" value="" name="boton1" class="boton1">
            </form>
        </div>

        <!--Seleccion Multiple de Disponibles-->
        <div class="selectDisponibles">
            <form action="indexddd.php" method="post">
                <label for="disponibles">Disponibles</label>
                <select name="disponibles" id="disponibles" multiple>
                    <!--Habria que generar el codigo dinamicamente, pongo algunos ejemplos-->
                    <?php
                    if(isset($_POST["boton1"])){
                        echo "<script type='text/javascript'>alert('Boton 1 pulsado');</script>";
                    }
                    $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());
                    while($row = mysqli_fetch_array($resultado)) {
                       echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
                    }
                    ?>

                    <!--<option value="mcrg">Tu Prima</option>-->
                </select>
                <br><br>
                <input type="submit" value="" name="boton2" class="boton2">
            </form>
        </div>

    </body>
</html>