# Supporting Our Future

##Overview

###What is the website for?

- Website to display information about volunteer organizations supporting young people in England.

###What does it do?

- The site will interact with a Database and display the data in the form of multiple charts.

###How does it work?

- The site uses Flask framework and Python to interact with a Mongo database. The site is styled with Bootstrap.

##Features

###Existing Features

- E-mail link to submit queries
- Pie chart to display voluntary income
- Line chart to display income, expenses and end of year totals
- Interaction with database information

###features left to implement

##Tech Used

###Some the tech used includes:

- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give our project a simple, responsive layout
- [flask]
    - We use flask to handle page routine
- [crossfilter]
    - We use crossfilter to sort the data from the database into various charts
- [mongoDB]
    - We interact with a Mongo Database to obtain data to be displayed on the web site
- [Python]
    - We use python to interact with our database and load the data to be displayed

##Contributing

###Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. After load the project into pycharm and install the dependencies from the requirements file.
3. Run mongoDB and import the JSON file into a database.
4. Run the program to load in the database and explore the website.