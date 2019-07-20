<?php

  header('Content-Type: application/json; charset=utf-8');

  $dataString = file_get_contents('php://input');

  $data = json_decode($dataString);

  $name = strip_tags(trim($_POST['username']));

  $email = strip_tags(trim($_POST['email']));

  $phone = strip_tags(trim($_POST['phone']));

  $realEstate = strip_tags(trim($_POST['realEstate']));

  require_once('PHPMailer/PHPMailerAutoload.php');

  $mail = new PHPMailer();

  // Add your settings ...
  // See more at: https://github.com/PHPMailer/PHPMailer

  if($mail->Send()) {

      $response['result'] = 'success';

      echo json_encode($response);

   } else {

      $response['result'] = 'error';

      echo json_encode($response);

   }

?>
