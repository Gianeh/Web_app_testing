<?php
    //this file implements the event classes for both upgrades and training or movements
    // the idea of buffer_file is not needed anymore, the frontend will account on the countdown of remaining time seconds and will send a request to backend when the countdown reaches 0
    // the backend will update the cache data  (unset + db retrieval) and will send back the new data to the frontend, the whole update is handled by Time_Daemon for both online and offline players

    class Event{
        public $event_id;
        public $event_type;
        public $event_completion;
        public $finished;
        public $remaining_time;
        function __construct($event_id, $event_type, $event_completion, $finished){
            $this->event_id = $event_id;
            $this->event_type = $event_type;
            $this->event_completion = $event_completion;
            $this->finished = $finished;
            $this->remaining_time = $event_completion - time();
        }
    }

    class Upgrade extends Event{
        public $level;
        function __construct($event_id, $event_type, $event_completion, $finished, $level){
            parent::__construct($event_id, $event_type, $event_completion, $finished);
            $this->level = $level;
        }
    }

    class Training extends Event{
        public $troop_type;
        public $quantity;
        function __construct($event_id, $event_type, $event_completion, $finished, $troop_type, $quantity){
            parent::__construct($event_id, $event_type, $event_completion, $finished);
            $this->troop_type = $troop_type;
            $this->quantity = $quantity;
        }
    }