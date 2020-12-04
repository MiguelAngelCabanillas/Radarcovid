<?php
    $conexion = mysqli_connect("localhost", "root", "root");
    mysqli_select_db($conexion,"radarcovid");
    $sql = "SELECT * FROM people";
    $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());

    function updAmigos($id){
        $sqlAmigos = "SELECT * 
        FROM friends a JOIN people p ON a.id2 = p.id 
        WHERE a.id1 = $id 
        UNION SELECT * 
        FROM friends a JOIN people p ON a.id1 = p.id 
        WHERE a.id2 = $id";

        $resultadoAmigos = mysqli_query($conexion, $sql) or die(mysqli_error());
        //return $resultadoAmigos;

        /*echo "<select name="amigos" id="amigos" multiple>";
    while ($row = mysql_fetch_row($resultadoAmigos))
    {
        echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
    }
        echo "</select>";*/
    }

    function updDisponibles($id){
        $sqlDisp = 
        "SELECT *
        FROM people
        MINUS   
        (SELECT * 
        FROM friends a JOIN people p ON a.id2 = p.id 
        WHERE a.id1 = $id 
        UNION SELECT * 
        FROM friends a JOIN people p ON a.id1 = p.id 
        WHERE a.id2 = $id";

        $resultadoDisponibles = mysqli_query($conexion, $sql) or die(mysqli_error());
        return $resultadoDisponibles;
    }

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
    <form action="indexddd.php" method="post">
        <table class="blueTable">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Seleccionar</th>
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
                        $id = $row["id"];
                        $fn = $row["firstname"];
                        $ln = $row["lastname"];
                        printf('
                            <tr>
                                <td>%s</td>
                                <td>%s</td>
                                <td>%s</td>
                                <td>%s</td>
                            </tr>', $id, $fn, $ln, sprintf('<input type="submit" value="" name="%s">', $id));
                    }
                    if(isset($_POST[$id])){
                        $sql = updAmigos($id);
                        
                    }
                ?>
            </tbody>
        </table>
    </form>
        <!--Seleccion Multiple de Amigos-->
        <div class="selectAmigos">
            <form action="indexddd.php" method="post">
                <label for="amigos">Amigos</label>
                <select name="amigos" id="amigos" multiple>
                    <!--Habria que generar el codigo dinamicamente, pongo algunos ejemplos-->
                    <!--<option value="mcrg">Manuel Cristobal Roldan Gomez</option>
                    <option value="dmg">Daniel Melero Garcia</option>
                    <option value="fmbn">Francisco Maria Bono Navarro</option>
                    <option value="magm">Manuel Antonio Gomez Merino</option><-->
                    <?php
                    //$resultado = mysqli_query($conexion, $sql) or die(mysqli_error());
                    while($row = mysqli_fetch_array($resultado)) {
                       echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
                    }
                    ?>
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
                    $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());
                    while($row = mysqli_fetch_array($resultado)) {
                       echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
                    }
                    ?>
                </select>
                <br><br>
                <input type="submit" value="" name="boton2" class="boton2">
            </form>
        </div>

    </body>
</html>