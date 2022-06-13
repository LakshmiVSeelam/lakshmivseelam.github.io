
<?php
    if(isset($_POST["submit"])){
        $to_email = "lakshmivseelam@gmail.com";
        $subject = "New message from website";
        
        $headers = "From: sender@example.com";

        $name = $_POST["name"];
        $email = $_POST["email"];
        $message = $_POST["message"];

        $body = `User Details \n Name : ` + $name + "\n Contact : " + $email + "\n Message : " + $message;
        
        if ( mail($to_email, $subject, $body, $headers)) {
            echo("Email successfully sent to $to_email...");
        } else {
            echo("Email sending failed...");
        }
    }
?>