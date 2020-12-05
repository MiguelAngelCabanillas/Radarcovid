<?php
    include 'bd.php';
    //$conexion = mysqli_connect("localhost", "root", "root");
    //mysqli_select_db($conexion,"radarcovid");
    $sql = "SELECT * FROM people";
    $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());
    $sqlDisp = NULL;
    $sqlAmigos = NULL;

    if (isset($_GET['pageno'])) {
        $pageno = $_GET['pageno'];
    } else {
        $pageno = 1;
    }
    function updAmigos($id){
        global $sqlAmigos;
        $sqlAmigos= "SELECT * 
        FROM friends a JOIN people p ON a.id2 = p.id 
        WHERE a.id1 = $id 
        UNION SELECT * 
        FROM friends a JOIN people p ON a.id1 = p.id 
        WHERE a.id2 = $id";
        

        /*echo "<select name="amigos" id="amigos" multiple>";
    while ($row = mysql_fetch_row($resultadoAmigos))
    {
        echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
    }
        echo "</select>";*/
    }

    function updDisponibles($id){
       global $sqlDisp;
       $sqlDisp= "SELECT firstname, lastname
       FROM people 
       WHERE id NOT IN(SELECT id
       FROM friends a1 JOIN people p1 ON a1.id2 = p1.id 
       WHERE a1.id1 = $id) AND id NOT IN (SELECT id FROM friends a2 JOIN people p2 on a2.id1 = p2.id WHERE a2.id2 = $id) AND id <> $id";
    }


    function anyadirAmigo($id1, $id2){
        $query = "INSERT INTO friends values ($id1, $id2)";
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
    <ul class="pagination">
    <li><a href="?pageno=1">First</a></li>
    <li class="<?php if($pageno <= 1){ echo 'disabled'; } ?>">
        <a href="<?php if($pageno <= 1){ echo '#'; } else { echo "?pageno=".($pageno - 1); } ?>">Prev</a>
    </li>
    <li class="<?php if($pageno >= $total_pages){ echo 'disabled'; } ?>">
        <a href="<?php if($pageno >= $total_pages){ echo '#'; } else { echo "?pageno=".($pageno + 1); } ?>">Next</a>
    </li>
    <li><a href="?pageno=<?php echo $total_pages; ?>">Last</a></li>
</ul>
    <form action="indexddd.php" method="post">
    <div id="tabla">
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
                            if(isset($_POST[$id])){
                                updAmigos($id);
                                updDisponibles($id);
                            }
                    }

                ?>
            </tbody>
        </table>
        </div>
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
                    if(!is_null($sqlAmigos)){
                        $consultaA = mysqli_query($conexion, $sqlAmigos) or die(mysqli_error());
                        while($row = mysqli_fetch_array($consultaA)) {
                           echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
                        }
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
                    <?php
                    if(!is_null($sqlDisp)){
                        $consultaD = mysqli_query($conexion, $sqlDisp) or die(mysqli_error());
                        while($row = mysqli_fetch_array($consultaD)) {
                           echo "<option value=\"".$row [ "id" ]."\">".$row [ "lastname" ].", ".$row [ "firstname" ]."</option>";
                        }
                    } 
                    ?>
                </select>
                <br><br>
                <input type="submit" value="" name="boton2" class="boton2">
            </form>
        </div>

    </body>
</html>