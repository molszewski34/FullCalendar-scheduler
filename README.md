<h1 align='center'>FullCalendar Scheduler</h1>

<p align='center'>
<b >An easy-to-understand calendar with full room management system and the events taking place in them.</b>
</p>

## Table of contents

- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [How to install](#how-to-install)
- [Technologies and Tools](#technologies-and-tools)
  - [Client](#client)
  - [Server](#server)
- [Functionality Description](#functionality-description)
  - [Calendar](#calendar)
  - [Search panel](#search-panel)
  - [Filtering panel](#filtering-panel)
  - [Room management panel](#room-management-panel)
    - [List of rooms](#list-of-rooms)
    - [Add room panel](#add-room-panel)
    - [Edit room panel](#edit-room-panel)
    - [Delete room panel](#delete-room-panel)
    - [Room equipment panel](#room-equipment-panel)
  - [Event managment panels](#event-managment-panels)
    - [Select date panel](#select-date-panel)
    - [Room selection panel](#room-selection-panel)
    - [Individual guest price and discounts panel](#individual-guest-price-and-discounts-panel)
    - [Price and total price](#price-and-total-price)
    - [Delete event](#delete-event)
- [What i learned](#what-i-learned)
- [Continues integration](#continues-integration)

## Introduction

FullCalendar Scheduler was created with the needs of guesthouses and small hotels in mind. Its main goal is ease of use and clarity for older or non-technical individuals. The application is equipped with features for managing events and rooms. Additionally, it allows for guest search and room filtering.

The main components of FullCalendar Scheduler are: React, FullCalendar, Node, MongoDB, and MUI. FullCalendar was chosen as the environment to display user operations on events. MongoDB offers a straightforward database management model. MUI is used to save production time for individual functionalities.

## How to install

Clone the repository and use npm run install or yarn install in both the client and server folders.The application requires two separate environments to function: MongoDB and MongoDB Authorization. For a precise understanding of how to connect MongoDB with React, please visit https://www.mongodb.com/languages/mern-stack-tutorial. To see how to add authentication, check https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/. Remember to name env names exactly like in axiosConfig.js and server.js.

## Technologies and Tools

### Client

react 18.2.0, fullcalendar 6.1.8, react-query 3.39.3, react-datetime, react-hook-form, react-tooltip, axios, mui 5.14.14, jest 5.17.0, react-color 2.19.3, dotenv: 16.3.1

### Server

node 20.10.0, cors 2.8.5, express 4.18.2, mongoose 7.4.4, nodemon 3.0.1, vercel 32.4.1, dotenv: 16.3.1

## Functionality Description

The Portfolio Application consists of several sections, including:

### Calendar

The main view of the application allows for navigating between months and to the current day. In the main view navigation bar, there are additional components such as room filtering, room management, and person search.

![Imgur](https://i.imgur.com/50At5RE.png)

### Search panel

![Imgur](https://i.imgur.com/Sjppvog.jpg)
The search panel accepts letters and numbers to search for who arrived at the headquarters and when. This is intended to help in quickly identifying whether a particular client has ever visited the premises and for any potential marketing calls.

![Imgur](https://i.imgur.com/MP0GDgU.png)

### Filtering panel

The filtering panel is a dropdown list containing each room. Its purpose is to highlight a particular room in situations where there is a large number of events in the view, which may lead to reduced readability of the application.

![Imgur](https://i.imgur.com/G4NB4da.jpg)

### Room management panel

The room management panel allows for adding, editing, and deleting rooms. Before adding events, you must create at least one room.
![Imgur](https://i.imgur.com/lEnd0Ej.jpg)

#### List of rooms

The room list displays and categorizes rooms based on the maximum number of people available for each room. After adding a room for the first time with the designated number, the list automatically adds a category and then assigns the room to that category. To reduce the initial length of the list, only the 3 most popular options are displayed: 1 bed, 2 beds, 3 beds. The categories have dynamically assigned word endings for numbers.

#### Add room panel

The functionalities of this part do not require extensive translation. Each room does not have to have equipment.

#### Edit room panel

![Imgur](https://i.imgur.com/Mj5TCrI.jpg)

#### Delete room panel

![Imgur](https://i.imgur.com/f7xhQAG.jpg)

#### Room equipment panel

![Imgur](https://i.imgur.com/JEE4vBM.jpg)

### Event managment panels

The panels has several fields. Some of them are locked until a room is selected from the room selection panel.

![Imgur](https://i.imgur.com/D7zizYq.jpg)

#### Select date panel

The end date field must contain a time several hours higher than the default. Otherwise, the Fullcalendar library may behave unexpectedly, setting the event field in calendar to 1 field less than it should.

![Imgur](https://i.imgur.com/Sf2UNjB.jpg)

#### Room selection panel

![Imgur](https://i.imgur.com/jEh7B7d.png)

The panel is used to display a list of rooms. Each button has a border assigned by <code> roomColor</code> and labels corresponding to:

- the number of people
- the price per seat
- the room name
- location
- list of equipment

The list of equipment has a tooltip.

**The tooltip function is currently supported only in the desktop version.**

#### Individual guest price and discounts panel

![Imgur](https://i.imgur.com/Of5TtZ9.png)
This view is only available after selecting a room. Upon selecting a room, a number of sections responsible for determining the price are generated.
The price can be reduced by: 10%, 25%, or 50% **compared to the initial price provided by input field**.

![Imgur](https://i.imgur.com/VwlShYj.png)

#### Price and total price

![Imgur](https://i.imgur.com/BTkghdz.png)

The "Za dzień" price is calculated upon selecting the room. The final price "Do zapłaty" is calculated after selecting the number of days of stay.

#### Delete event

![Imgur](https://i.imgur.com/Ce2wqGz.png)

The removal of the event is performed by pressing the "USUŃ" button in the edit event modal.

## What i learned

To be honest, this project has taught me how to program. Before starting this project, I had zero knowledge of handling APIs, HTTPS, and generally had a poor understanding of how to write functionalities that interact with them. To better illustrate what I've learned, I divided this report into points:

**React:**
The primary challenge in building an application that manages a large number of state changes is how to manage them so that everything works smoothly without causing headaches. Initially, I used props, but it quickly became apparent that states used in the main component could spread across many individual components and even helper functions. I thought about using Redux, but at that point, I was already dealing with several technologies that I didn't fully understand. Would it be beneficial to know Redux at this point? Absolutely! Is it worth adding extra complexity during such a significant workload? Not really...

Ultimately, I opted to use useContext. The result was that state operations turned out to be trivial, but the downside was the size of the context. The context is enormous, and I'm considering integrating it with one of the existing state management libraries to make this file more readable for other users.

Next were the functions. The application uses many methods for data manipulation, from date format changes, data filtering, slicing to create new ranges based on state values. Some of them were written by AI, but all functions required editing to work properly. Despite using artificial intelligence, none of the functions work as intended, even with a properly executed query. The most challenging functionality was definitely the function responsible for generating guest inputs. The functionality works in relation to the number held in the Room object. The function reads this value and then generates the appropriate number of ranges based on the price per room. Additionally, each of the generated ranges had to have functions to change it depending on whether you wanted to change it by the passed percentage or by entering it manually. Moreover, each change in the range was summed up to the price value calculated from the range and the total price counted from the state value counting the number of days. Furthermore, the states responsible for the operation of this function are spread across several components.

This taught me to think comprehensively about functions and their dependencies.

**Node:**
Node was completely new to me. In the initial phase of my programming learning, I focused mainly on frontend development, so I treated backend handling as an addition. I chose MongoDB because this model allowed me to skip learning SQL databases and schema saving, as if I were still working in JS. Additionally, Node is based on JavaScript, so I didn't have to learn any backend technologies to be successful.

**CRUD:**
The first operations were made to add, edit, delete, and retrieve data from the server.

**MUI:**
As I progressed, I realized that much of the frontend functionality doesn't have to be written from scratch, and I can simply save time by using one of the libraries. I wanted to use Tailwind, but the libraries available at that time either had poor documentation, mixed up scripts in the implementation, or even worse, didn't have a specific element that would solve the problem. I chose MUI for the reasons mentioned above.

**Data Cache:**
I used the react-query library to save data locally. The library served not only for cache but also improved the dynamic UI change when displayed.

**Testing:**
The first unit tests were conducted on the client side using Jest and react-testing-library.

## Continues integration

There are plans to implement more FullCalendar functionalities such as setting the date by selecting an area. The modal responsible for adding would retrieve the time range from this operation.

I also plan to use some managing state library like Redux.
