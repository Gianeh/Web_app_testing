It's finally time to write a README.md file for the project, this will help keeping track of progress and current needs!

# Age of Stronghold
The clear inspiration for the name is **Age of Empires**, the concept is mainly inspired to the static online game **Tribals Wars**. The whole code base serves as a **University project**.
We are an unexperienced team of 2 and the concepts applied in the game are not intended to be the best possible, but rather the ones we are able to implement in the given time trying not to use already existing solutions.
Game is currently hosted at [AOS](https://aos-web-testing.azurewebsites.net/) on an **Azure** instance.
Requirements for the project are pretty simple:
- implement a **web application** using raw **html + css**, serve the frontend using **javascript** and the backend using **PHP**.
- implement a **database** using a solution of our choice, **MSSQL** is standard on Azure and we'll stick with that.
- implement a **login** system, **registration** and user manipulation using **$_SESSION** and **Database**.

We just wanted to do more and we ended up with a **game**. Some difficulties rose from this choice and we'll try to explain them in the following sections.

# The concept
**AGE of Stronghold** is a static web game that can handle a limited number of players allocated on finite map, every new user is given a village and a global position with few resources to start with. Specific structures produce ammounts of goods needed to upgrade themselves and produce new population and units, the production rate is based on the level of the structure and the total ammount of villagers inhabiting the settlement.
The map section is where real strategy comes in, other players are visualized here and every square on the grid has a certain physical distance from the others, battles happen when a player decides to send a certain ammount of troops towards another player's village, a **war algorithm** is used to determine the outcome of the battle and the winner is rewarded with a certain ammount of resources.
For sake of simplicity the number of types of resources and units is now limited and could be upgraded in the future depending on the balance of the game.

# The code
 As a **University project** the code is the most important part and it's organization is crucial in order for us two to be able to work on it at the same time. We decided to use **Visual Studio Code** as our IDE and **GitHub** as our version control system, deployment is done using **Azure**'s standard integration with GitHub repositories. As mentioned above, the frontend is nothing more than a plain set of html files styled with some old and clunky css, the backend is where the whole magic happens and it's written in **PHP**. The database is a **MSSQL** instance hosted on Azure and it's accessed using **PDO** objects trough PHP, the middle layer of the memory is then **Cached** on another remote machine using **Redis** framework. Memory handling and efficiency is a crucial feature for online games and a specific section will be dedicated to the complicated solutions we adopted. As last part a **Python Daemon** named Time_Daemon runs on the Web APP instance to update events and upgrades in real time.

## Frontend
 for the frontend features and the actual browser visualization the code is pretty simple, few html files are generated and filled on load and on deamnd of the user through some javascript handlers linked to pages, buttons and text inputs. To prevent from easy hacking on the client side the informations about players and their resource base is handled by a backend PHP wall that is addressed by Ajax POST requests. This last solution does obviously not prevent from HTTP trickery but securing the backend is not the main focus of this project. Every action that offer a light verification on the client side is then checked again on the server to prevent data inconsistency.

## Backend
 As mentioned the backend features are mostly served by a set of PHP files that handle all the data manipulation and the database access. The code is organized in a way that every file is responsible for a specific task and the code is then reused in other files to prevent code duplication. Following the POST request paradigm, some dedicated files are invoked by Ajax calls and decide to take actions based on the content of the global $_POST variable. Conncetions to Redis cache and Database instances is served by dedicated classes. PHP also implements a set of objects to make the manipulation of player's variables easier such as classes for the structures, units, and players themselves.
 A smaller but crucial part is then played by the Python Daemon, this process is launched on startup on the server machine and periodically follows a schedule to update the 2 main memory layers granting consistency between the database and the cache.
