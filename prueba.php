<?php
    $conexion = abrirConexion();
    $sql = "SELECT * FROM people";
    $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());
    mysqli_close($conexion);
    $sqlDisp = NULL;
    $sqlAmigos = NULL;
    $seleccionado = "";

    function abrirConexion(){
        $conn= mysqli_connect("localhost", "root", "root");
        mysqli_select_db($conn,"radarcovid");  
        return $conn;
    }

    function updAmigos($id){
        global $sqlAmigos;
        $sqlAmigos= "SELECT * 
        FROM friends a JOIN people p ON a.id2 = p.id 
        WHERE a.id1 = $id 
        UNION SELECT * 
        FROM friends a JOIN people p ON a.id1 = p.id 
        WHERE a.id2 = $id";
    }

    function updDisponibles($id){
        global $sqlDisp;
        $sqlDisp= "SELECT id, firstname, lastname
        FROM people 
        WHERE id NOT IN(SELECT id
        FROM friends a1 JOIN people p1 ON a1.id2 = p1.id 
        WHERE a1.id1 = $id) AND id NOT IN (SELECT id FROM friends a2 JOIN people p2 on a2.id1 = p2.id WHERE a2.id2 = $id) AND id <> $id";
    }


    function anyadirAmigo($id1, $id2){
        $conexion = abrirConexion();
        $query = "INSERT INTO friends values ($id1, $id2)";
        $aux = mysqli_query($conexion, $query);
        mysqli_close($conexion);
    }

    function eliminarAmigo($id1, $id2){
        $conexion = abrirConexion();
        $query = "DELETE from friends where (id1 = $id1 and id2 = $id2) or (id1 = $id2 and id2 = $id1)";
        $aux = mysqli_query($conexion, $query);
        mysqli_close($conexion);
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>RadarCovid19</title>
        <link rel="stylesheet" href="style2.css">
    </head>
    <body>
        <div id="personContainer">
            <div class="labelDiv" id="labelPerson">
                <span id="personLabel">Personas</span>
            </div>
            <div id="personTable">
                <form action="prueba.php" method="post">
                <table class="blueTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Seleccionar</th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php
                             $conexion = abrirConexion();
                             $resultado = mysqli_query($conexion, $sql) or die(mysqli_error());
                             mysqli_close($conexion);
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
                                        $seleccionado = $id;
                                        updAmigos($id);
                                        updDisponibles($id);
                                    }
                            }
                            if(isset($_POST['idEliminarAmigo'])){
                                $seleccionado .= $_POST['idEliminarAmigo'];
                                if(isset($_POST['amigos'])){
                                    $idEliminar = $_POST['amigos'];
        
                                    for ($i=0;$i<count($idEliminar);$i++) 
                                    { 
                                        eliminarAmigo($seleccionado,$idEliminar[$i]);
                                    }
        
                                    updAmigos($seleccionado);
                                    updDisponibles($seleccionado);
                                } else if ($seleccionado != "") {
                                    updAmigos($seleccionado);
                                    updDisponibles($seleccionado);
                                }
                            } else if (isset($_POST['idInsertarAmigo'])){
                                $seleccionado .= $_POST['idInsertarAmigo'];
                                if(isset($_POST['disponibles'])){
                                    $idInsertar = $_POST['disponibles'];
        
                                    for ($i=0;$i<count($idInsertar);$i++) 
                                    { 
                                        anyadirAmigo($seleccionado,$idInsertar[$i]);
                                    }
        
                                    updAmigos($seleccionado);
                                    updDisponibles($seleccionado);
                                } else if ($seleccionado != "") {
                                    updAmigos($seleccionado);
                                    updDisponibles($seleccionado); 
                                }    
                            } 
                        ?>
                    </tbody>
                </table>
            </form>
            </div>
        </div>

        <div id="friendsContainer">
            <div class="labelDiv" id="labelFriends">
                <span id="friendsLabel">Amigos</span>
            </div>
            <div class="selectFriends">
                <form action="prueba.php" method="post" id="formFriends">
                    <select name="amigos[]" id="amigos" multiple>
                        <?php
                        if(!is_null($sqlAmigos)){
                            $conexion = abrirConexion();
                            $consultaA = mysqli_query($conexion, $sqlAmigos) or die(mysqli_error());
                            mysqli_close($conexion);
                            while($row = mysqli_fetch_array($consultaA)) {
                                printf('<option value="%d" > %d:  %s %s </option>', $row["id"], $row["id"], $row["firstname"], $row["lastname"]);
                            }
                        }
                        ?>
                    </select>
                    <br><br>
                    <?php 
                        printf('<input type="hidden" value="%s" name="idEliminarAmigo">', $seleccionado);
                    ?>
                   <input type="submit" value="" name="boton2" class="boton2"> 
                </form>
            </div>
        </div>
        <div class="buttonsContainer">
           <!-- <input type="submit" value="" name="boton1" class="boton1">
            <input type="submit" value="" name="boton2" class="boton2"> -->
        </div>
        <div id="availablesContainer">
            <div class="labelDiv" id="labelAvailables">
                <span id="availablesLabel">Disponibles</span>
            </div>
            <div class="selectAvailables">
                <form action="prueba.php" method="post" id="formAvailables">
                    <select name="disponibles[]" id="disponibles" multiple>
                        <?php
                        if(!is_null($sqlDisp)){
                            $conexion = abrirConexion();
                            $consultaD = mysqli_query($conexion, $sqlDisp) or die(mysqli_error());
                            mysqli_close($conexion);
                            while($row = mysqli_fetch_array($consultaD)) {
                                printf('<option value="%d" > %d:  %s %s </option>', $row["id"], $row["id"], $row["firstname"], $row["lastname"]);
                            }
                        } 
                        ?>
                    </select>
                    <br><br>
                    <?php 
                        printf('<input type="hidden" value="%s" name="idInsertarAmigo">', $seleccionado);
                    ?>
                    <input type="submit" value="" name="boton1" class="boton1">
                </form>
            </div>
        </div>
    </body>
</html>