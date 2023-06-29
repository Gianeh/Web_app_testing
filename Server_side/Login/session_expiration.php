<?php
    class MySessionHandler extends SessionHandler {
        public function gc($maxLifetime) {
          // call the parent gc() method to perform the default garbage collection
          parent::gc($maxLifetime);
      
          // add your custom logic for handling session expiration here
          // for example, you could check the session expiration time and perform some action if the session is about to expire
          if ($_SESSION['expiry'] - time() < 60) {
            // session is about to expire, do something
          }
        }
      }

?>