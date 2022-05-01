# IGN Code Foo 2022 Project

For the Code Foo Internship engineering application I decided to pick option 2 : Back End. 
I created a simple UI with an image web scraper, IGN review article access, and genre / media type filters
that utilizes the given CSV and API endpoints using axios.

# Run it!

Step 1. Simply Fork & Clone

Step 2. port is 3004 for server but should connect w/ npm start
```bash
cd server
npm install
npm start
```
Step 3. Repeat for client, port is 3000
```bash
cd client
npm install
npm start
```
Step 4. Make sure both client and server are running : 
*Please be patient for images to load and wait before you switch genres or media types (especially on the all media filter)
*If you run into a long load wait simply soft refresh
**this will be discussed in the Thoughts section


# Break Down & Thoughts
## Data
Storing - Data was stored using MySQL in a backend database
Sanitizing - Repetitive strings were sanitized as in long description, brackets were removed,
some categories were not included in the front end due to their lack of information or repetitiveness
Normalizing - Based off of 1NF & 2NF 
Indexing - The data was indexed based off of the primary key ID

Due to time constraints there were a few data changes that if I had more time I would have normalized more
these include: 

1. Further normalizing the original CSV, the data in the table is all relevant but very large and could be broken 
   down further this includes:
   
   - Splitting up the genres column into a new table due to data members with multiple values e.g. {Drama,Action} 1NF
   - Creating a separate table with the unused values that currently have no API calls 2NF

2. Sanitizing by removing brackets and columns that had little to no entries i.e franchises, regions
   - I decided to keep these in case I wanted to add new information and research further down the line for scalibility

## Decisions & Implementation (Changes)

1. A decision I very much struggled with was how to use the API call that utilized the metadata webcrawler for review article images.
   I went back and forth between utilizing a cache and a database as a cache seemed more dynamic with the current time restraints compared 
   to creating a new data table.
   
   - Nevertheless moving forward I feel a database is the way to go as the image load time can be frustrating.

2. Pagination is another implementation I feel would include many benefits in comparison to the current display which includes almost 
   every database item both in terms of load time and useability

3. Error handling for API calls on the client side. As the only real error handling in the program is console logging. I would implement
   error handling elements that could display on the user side when a call goes wrong, especially in regards to the image calling.
   
4. Utilizing filters on all the media was initially handled by API calls but later changed by mapping and filtering the data. 
   This ended up being much more efficient but at the cost of a few API calls. Moving forward I would like to utilize a few more API
   calls more specific to certain data that isn't displayed on the cards...
   
   - Perhaps adding a button element within my display cards for more information

# Closing Thoughts

This project was a huge learning experience. Despite the difficulties of being a student and time management I felt I put in work that I am
content with and yet still excited to learn from and improve on. Having an open mindset helped me to learn React features I had never before implemented
and reinforced in me the value of modularity and planning. I was able to learn from user input given by friends and family and be dynamic - sometimes its scary 
scrapping whole sections of code but knowing when to try a new direction proved to be incredinly valuable. I hope you can appreciate the work I put in and I would absolutely love feedback and am more than willing to answer any questions. Thank you for the time and consideration!

~ Alex

P.S. checkout this Pokemon night out web app its and C and uses Visual Studio but
if you have the time take a look and run it https://github.com/avanbussum/Visual-Studio-Pokemon-Night-Out
